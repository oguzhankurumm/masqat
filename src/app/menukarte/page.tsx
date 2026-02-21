"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { CategoryCard } from "@/components/ui/category-card";
import { StickySearchBar } from "@/components/ui/sticky-search-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { PageContainer } from "@/components/ui/page-container";
import { useProductsByCategory } from "@/hooks/use-products-by-category";
import { useCategories } from "@/hooks/use-categories";
import { useProduct } from "@/hooks/use-products";
import { ProductDetailSheet } from "@/components/menukarte/product-detail-sheet";
import { Loader2, ChevronLeft } from "lucide-react";
import { de } from "@/content/de";

function MenuKarteContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const categoryId = searchParams.get("category");
  const productId = searchParams.get("product");

  // Local State
  const [searchQuery, setSearchQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Data Fetching
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError, refetch: refetchCategories } = useCategories(true);
  const { data: products, isLoading: isProductsLoading, isError: isProductsError, refetch: refetchProducts } = useProductsByCategory(categoryId);
  // We fetch product detail only if productId exists
  const { data: productDetail } = useProduct(productId || "");

  // Scroll restoration on category change
  useEffect(() => {
    if (categoryId && !productId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [categoryId, productId]);

  // Derived State: Filtered Products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const searchLower = (searchQuery || "").toLowerCase();
      const productTitle = (product.title || "").toLowerCase();
      const productDesc = (product.description || "").toLowerCase();

      const matchesSearch = productTitle.includes(searchLower) || productDesc.includes(searchLower);
      const matchesAvailability = showAvailableOnly ? product.isAvailable : true;

      return matchesSearch && matchesAvailability;
    });
  }, [products, searchQuery, showAvailableOnly]);

  // Handlers
  const handleCategoryClick = (id: string) => {
    const params = new URLSearchParams();
    params.set("category", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleBackToCategories = () => {
    router.push(pathname);
  };

  const handleProductClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCloseSheet = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // --- LAYER A: CATEGORY GALLERY ---
  if (!categoryId) {
    return (
      <div className="min-h-screen pb-32">
        <PageContainer className="pt-8 space-y-8">
          <div className="text-center space-y-2 mb-8 mt-4">
            <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">{de.nav.menu}</h2>
            <p className="text-muted-foreground/80 font-light">Wählen Sie eine Kategorie</p>
          </div>

          {isCategoriesLoading ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(140px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-40 rounded-3xl bg-surface-1 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : isCategoriesError ? (
            <ErrorState title={de.common.error} onRetry={() => refetchCategories()} />
          ) : !categories?.length ? (
            <EmptyState title="Keine Kategorien gefunden" />
          ) : (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  title={cat.title}
                  iconName={cat.iconName}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="h-full min-h-[160px]" // Ensures nice sizing
                />
              ))}
            </div>
          )}
        </PageContainer>
      </div>
    );
  }

  // --- LAYER B: PRODUCT BROWSER ---
  const currentCategory = categories?.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen pb-32">
      {/* Sticky Top Nav */}
      <div className="sticky top-[72px] md:top-[88px] z-30 flex flex-col gap-4 border-b border-white/5 bg-[#0E0F12]/95 px-4 py-4 backdrop-blur-xl sm:px-8 shadow-sm">
        <button
          onClick={handleBackToCategories}
          className="flex items-center gap-2 self-start rounded-full bg-surface-1 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-md transition-all hover:bg-surface-2 hover:text-white border border-white/5 shadow-sm active:scale-95"
        >
          <ChevronLeft className="h-4 w-4 shrink-0" />
          {de.common.back}
        </button>

        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm flex items-center gap-3">
            {currentCategory?.title || "Produkte"}
          </h2>
        </div>

        <StickySearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={de.menu.searchPlaceholder}
          className="bg-transparent py-0 border-none static px-0 w-full"
        />

        {/* Quick Filters */}
        <div className="flex gap-2 items-center pt-1 scrollbar-hide overflow-x-auto">
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-[10px] sm:text-xs font-semibold tracking-wide transition-all uppercase ${showAvailableOnly ? 'bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/30 shadow-[0_0_15px_rgba(201,162,39,0.15)]' : 'bg-surface-1 text-white/50 border border-white/5 hover:bg-surface-2 hover:text-white'}`}
          >
            {de.menu.available}
          </button>
        </div>
      </div>

      {/* Main Content (Products) */}
      <PageContainer className="pt-6 sm:pt-8 w-full max-w-7xl mx-auto px-4 sm:px-8">
        {isProductsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-32 sm:h-80 rounded-3xl bg-surface-1 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : isProductsError ? (
          <ErrorState
            title={de.common.error}
            onRetry={() => refetchProducts()}
          />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title={de.menu.emptyCategory}
            description={searchQuery ? de.menu.emptySearch : ""}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        )}
      </PageContainer>

      {/* --- LAYER C: PRODUCT DETAIL SHEET --- */}
      <ProductDetailSheet
        product={productDetail || products?.find(p => p.id === productId)}
        isOpen={!!productId}
        onClose={handleCloseSheet}
      />
    </div>
  );
}

export default function MenuKarte() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-background"><Loader2 className="h-8 w-8 animate-spin text-[#C9A227]" /></div>}>
      <MenuKarteContent />
    </Suspense>
  );
}
