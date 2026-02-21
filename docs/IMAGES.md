# Local Image System & Production Strategy

## Overview
This project uses a hybrid approach for images to ensure stability across local development and Vercel production environments.

1. **Static Assets**: Stored in `public/uploads` and committed to Git.
2. **Dynamic Uploads**: Must use Firebase Storage (or other external storage) in production.

## Implementation Details

### 1. `SmartImage` Component
Located at `src/components/media/SmartImage.tsx`.
- **Automatic Resolution**: Converts relative paths to valid URLs.
- **Loading State**: Displays a skeleton pulse animation while loading.
- **Error Handling**: Automatically falls back to a placeholder if the image fails to load.
- **Performance**: Uses `next/image` for optimization and lazy loading.

### 2. Path Resolution (`lib/utils/resolveImageUrl.ts`)
The utility function `resolveImageUrl` handles various input formats:
- **Absolute URLs** (e.g., `https://firebasestorage...`): Returned as-is.
- **Local Paths** (e.g., `/uploads/...`): Served from the `public/uploads` directory.
- **Relative Paths**: Normalized to start with `/`.
- **Empty/Null**: Returns the default placeholder (`/images/placeholder-dish.svg`).

## Production Guidelines (Vercel)

### Static Images (Recommended for Menu)
For fixed content like menu items that don't change often:
1. Place images in `public/uploads/images/` locally.
2. **Commit them to the repository** (`git add public/uploads`).
3. In Firestore/Database, store the path as `/uploads/images/filename.webp`.
4. Deploy. Vercel will serve these as static assets.

### Dynamic User Uploads (Admin Panel)
**IMPORTANT: Vercel File System is Read-Only at Runtime.**
You cannot upload files to `public/uploads` after deployment.

If you implement an image uploader:
1. Use **Firebase Storage** (already configured in `lib/firebase/client.ts`).
2. Upload the file to a storage bucket.
3. Get the download URL (starts with `https://`).
4. Save this **full URL** in the Firestore `image` field.
5. `SmartImage` will detect the `https` prefix and render it correctly.

### Configuration
`next.config.ts` has been updated to allow images from:
- `firebasestorage.googleapis.com`
- `lh3.googleusercontent.com` (Google Auth profiles)
