# Firestore Schema Analysis Report

## Collection: categories
- Total Documents: 33

| Field | Type | Presence | Nulls | Example |
|---|---|---|---|---|
| `createdAt` | string | 100% | 0 | "2025-09-16T16:36:13.375Z" |
| `description` | string | 3% | 0 | null |
| `iconName` | string | 100% | 0 | "hamburger" |
| `id` | string | 100% | 0 | "179b14n1fEkh6z8E3jgn" |
| `isActive` | boolean | 100% | 0 | true |
| `isMainCategory` | boolean | 15% | 0 | true |
| `order` | number | 73% | 0 | 5 |
| `parentCategoryId` | string | 85% | 0 | "R54in25sbmkWTJBf3nHC" |
| `title` | string | 100% | 0 | "Apperativ" |
| `updatedAt` | string | 100% | 0 | "2025-09-16T16:36:13.375Z" |

## Collection: products
- Total Documents: 152

| Field | Type | Presence | Nulls | Example |
|---|---|---|---|---|
| `allergens` | array | 99% | 0 | [] |
| `categoryId` | string | 99% | 0 | "ctjXga3C8UD899rk788C" |
| `createdAt` | string | 99% | 0 | "2025-05-25T14:01:42.196Z" |
| `description` | string | 100% | 0 | "." |
| `id` | string | 100% | 0 | "02xwNIWUyMHVbIfvxdok" |
| `image` | string | 99% | 0 | "/uploads/images/1758037659719.webp" |
| `imageMigrated` | boolean | 99% | 0 | true |
| `ingredients` | array | 99% | 0 | [] |
| `isAvailable` | boolean | 99% | 0 | true |
| `lastModifiedBy` | string | 99% | 0 | "system-migration" |
| `migratedAt` | string | 99% | 0 | "2025-09-16T15:56:04.253Z" |
| `originalImageUrl` | string | 99% | 0 | "https://res.cloudinary.com/dwythdnkb/image/upload/..." |
| `parentCategoryId` | string | 99% | 0 | "R54in25sbmkWTJBf3nHC" |
| `preparationTime` | number | 1% | 0 | 15 |
| `price` | number | 99% | 0 | 7.4 |
| `title` | string | 99% | 0 | "VIRGIN HUGO" |
| `updatedAt` | string | 99% | 0 | "2025-09-29T16:04:26.939Z" |
| `version` | number | 99% | 0 | 1 |

