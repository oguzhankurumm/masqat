export const resolveImageUrl = (path: string | undefined | null): string => {
  if (!path) return "/images/placeholder-dish.svg";
  
  // Handle absolute URLs (e.g. Firebase Storage, external images)
  if (path.startsWith("http")) {
    return path;
  }

  // Handle local uploads (e.g. /uploads/images/...)
  // These are expected to be in public/uploads/images
  if (path.startsWith("/uploads/")) {
    return path;
  }

  // Handle relative paths (e.g. "images/foo.jpg" -> "/images/foo.jpg")
  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
};
