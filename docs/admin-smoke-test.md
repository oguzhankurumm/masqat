# Admin Panel Manual Smoke Test
*Status: PASSED*

Run through these flows to verify the admin panel is 100% production-ready. 

## 1. Auth
- [X] Go to `/admin/dashboard` while logged out → redirected to `/admin/login`.
- [X] Login works with valid credentials (Firebase).
- [X] Logout works from the Sidebar and redirects to `/admin/login`.

## 2. Products
- [X] List page loads products properly.
- [X] Create a product requires `title`, `price`, `categoryId`, and `image`.
- [X] Create a product with `image: "/uploads/images/test.webp"` and check if it succeeds.
- [X] Editing a product dynamically updates the `updatedAt` field.
- [X] Disabling a product (Availability switch) updates immediately without page refresh (TanStack Query invalidation works).
- [X] Deleting a product triggers the AlertDialog and works accurately.

## 3. Categories
- [X] Categories list loads correctly ordered by `order` then `title`.
- [X] Creating a category with basic info works.
- [X] Attempting to delete a category that contains products blocks deletion and shows the "Reassign & Delete" dialog.
- [X] Reassigning works (or blocks if no other categories exist) via Toast errors.
- [X] Deleting an empty category works and updates the list.

## 4. Dashboard
- [X] Metric cards show Total Products, Available, Unavailable, and Categories correctly.
- [X] No mention of "Orders" anywhere on the dashboard.
- [X] "Recently Updated" products list correctly formats timestamps.

## 5. Resilience
- [X] Legacy documents without `title` or `image` display default text and placeholder images instead of crashing the UI.
- [X] Disconnecting the network locally simulating Firestore errors triggers a clean error state with "try again" rather than a white screen of death.
