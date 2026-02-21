"use client";

import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { MetricCard } from "@/components/admin/metric-card";
import { Package, CheckCircle, XCircle, Clock, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { SeedData } from "../../_components/seed-data";

export default function AdminDashboard() {
  const { data, isLoading } = useDashboardStats();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (dateVal: any) => {
    if (!dateVal) return "Unknown";
    // Handle Firestore Timestamp
    if (dateVal.seconds) {
      return new Date(dateVal.seconds * 1000).toLocaleDateString();
    }
    // Handle string or Date
    return new Date(dateVal).toLocaleDateString();
  };

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Overview of your lounge performance</p>
         </div>
         <SeedData />
       </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         <MetricCard 
           title="Total Products"
           value={data?.totalProducts || 0}
           icon={Package}
           description="All products in catalog"
           loading={isLoading}
         />
         <MetricCard 
           title="Available"
           value={data?.availableCount || 0}
           icon={CheckCircle}
           description="Currently in stock"
           loading={isLoading}
         />
         <MetricCard 
           title="Unavailable"
           value={data?.unavailableCount || 0}
           icon={XCircle}
           description="Out of stock or disabled"
           loading={isLoading}
         />
          <MetricCard 
           title="Categories"
           value={data?.categoryStats?.length || 0}
           icon={Layers}
           description="Active categories"
           loading={isLoading}
         />
       </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
         <Card className="col-span-4 border-white/5 bg-surface-1 text-card-foreground shadow-lg">
           <CardHeader className="border-b border-white/5 pb-4">
             <CardTitle className="text-white text-lg font-medium">Category Distribution</CardTitle>
             <CardDescription>Products per category</CardDescription>
           </CardHeader>
           <CardContent className="pt-6">
             {isLoading ? (
               <div className="space-y-4">
                 <Skeleton className="h-4 w-full bg-surface-2" />
                 <Skeleton className="h-4 w-3/4 bg-surface-2" />
                 <Skeleton className="h-4 w-1/2 bg-surface-2" />
               </div>
             ) : (
               <div className="space-y-5">
                 {data?.categoryStats?.map((cat) => (
                   <div key={cat.name} className="flex items-center group">
                     <div className="w-32 text-sm font-medium text-zinc-400 truncate group-hover:text-white transition-colors">{cat.name}</div>
                     <div className="flex-1 h-2 bg-surface-2 rounded-full mx-3 overflow-hidden">
                       <div 
                         className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full" 
                         style={{ width: `${Math.min((cat.count / (data.totalProducts || 1)) * 100, 100)}%` }}
                       />
                     </div>
                     <div className="w-8 text-sm text-right font-bold text-white">{cat.count}</div>
                   </div>
                 ))}
                 {(!data?.categoryStats || data.categoryStats.length === 0) && (
                   <p className="text-muted-foreground text-sm italic">No categories found.</p>
                 )}
               </div>
             )}
           </CardContent>
         </Card>

         <Card className="col-span-3 border-white/5 bg-surface-1 text-card-foreground shadow-lg">
           <CardHeader className="border-b border-white/5 pb-4">
             <CardTitle className="text-white text-lg font-medium">Recently Updated</CardTitle>
             <CardDescription>Latest product changes</CardDescription>
           </CardHeader>
           <CardContent className="pt-6">
             <div className="space-y-0">
               {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                       <Skeleton className="h-10 w-10 rounded-full bg-surface-2" />
                       <div className="space-y-2 ml-4 flex-1">
                          <Skeleton className="h-4 w-full bg-surface-2" />
                          <Skeleton className="h-3 w-1/2 bg-surface-2" />
                       </div>
                    </div>
                  ))
               ) : (
                 data?.recentProducts?.map((product) => (
                   <div key={product.id} className="flex items-center py-3 border-b border-white/5 last:border-0 hover:bg-white/5 -mx-6 px-6 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center border border-white/5 shrink-0">
                        <Clock size={18} className="text-violet-400" />
                      </div>
                      <div className="ml-4 space-y-1 min-w-0">
                        <p className="text-sm font-medium leading-none text-white truncate">{product.title}</p>
                        <p className="text-xs text-muted-foreground">
                           {formatDate(product.updatedAt)}
                        </p>
                      </div>
                      <div className="ml-auto font-mono text-sm text-amber-400 font-bold pl-2">
                        {product.price.toFixed(2)}€
                      </div>
                   </div>
                 ))
               )}
             </div>
           </CardContent>
         </Card>
       </div>
    </div>
  );
}
