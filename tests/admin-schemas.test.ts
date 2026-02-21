import test from "node:test";
import assert from "node:assert";
import { productSchema } from "../src/lib/schemas/product";
import { categorySchema } from "../src/lib/schemas/category";
import { normalizeProduct } from "../src/lib/normalizers/product";
import { normalizeCategory } from "../src/lib/normalizers/category";

test("Product schema validation", async (t) => {
    await t.test("accepts valid product with local upload path", () => {
        const validData = {
            title: "Test Burger",
            price: 15.99,
            categoryId: "cat-123",
            image: "/uploads/images/burger.webp"
        };

        const result = productSchema.safeParse(validData);
        assert.strictEqual(result.success, true);
    });

    await t.test("rejects invalid image path (prevents Cloudinary etc)", () => {
        const invalidData = {
            title: "Test Burger",
            price: 15.99,
            categoryId: "cat-123",
            image: "https://res.cloudinary.com/foo/image.jpg"
        };

        const result = productSchema.safeParse(invalidData);
        assert.strictEqual(result.success, false);
        if (!result.success) {
            assert.match(result.error.issues[0].message, /must start with \/uploads\//);
        }
    });
});

test("Category schema validation", async (t) => {
    await t.test("accepts valid category", () => {
        const validData = {
            title: "Main Dishes",
            iconName: "utensils",
            order: 1
        };

        const result = categorySchema.safeParse(validData);
        assert.strictEqual(result.success, true);
    });
});

test("Normalizers safe defaults", async (t) => {
    await t.test("product normalizer provides fallbacks for missing title and image", () => {
        // Missing title, missing image, missing price
        const fakeDoc = {
            description: "Legacy product"
        };

        const product = normalizeProduct("doc-1", fakeDoc);
        assert.strictEqual(product.title, "Untitled Item");
        assert.strictEqual(product.image, "/uploads/images/placeholder.webp");
        assert.strictEqual(product.price, 0);
    });

    await t.test("category normalizer provides fallbacks", () => {
        const fakeDoc = {
            isActive: false
        };

        const category = normalizeCategory("cat-1", fakeDoc);
        assert.strictEqual(category.title, "Untitled Category");
        assert.strictEqual(category.iconName, "LayoutGrid");
        assert.strictEqual(category.order, 999);
    });
});
