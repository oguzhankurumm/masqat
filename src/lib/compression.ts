
/**
 * Compresses an image file using the Canvas API.
 * Resizes the image to fit within maxWidth/maxHeight while maintaining aspect ratio.
 * Reduces quality to achieve smaller file size.
 */
export async function compressImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    type?: string;
  } = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    type = "image/jpeg",
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"));
              return;
            }

            // Fix extension based on type
            const extensionMap: Record<string, string> = {
              "image/jpeg": ".jpg",
              "image/png": ".png",
              "image/webp": ".webp",
            };
            const ext = extensionMap[type] || "";
            let newName = file.name;
            if (ext) {
              const lastDotIndex = newName.lastIndexOf(".");
              if (lastDotIndex !== -1) {
                newName = newName.substring(0, lastDotIndex) + ext;
              } else {
                newName = newName + ext;
              }
            }

            const newFile = new File([blob], newName, {
              type: type,
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          type,
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
