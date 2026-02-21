"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/utils/resolveImageUrl";

interface SmartImageProps {
  path: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function SmartImage({
  path,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fill = true,
  width,
  height,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasError(false);
    setIsLoading(true);
  }, [path]);

  const resolvedSrc = resolveImageUrl(path);
  const isLocalUpload = resolvedSrc?.startsWith("/uploads/");
  const finalSrc = hasError ? "/images/placeholder-dish.svg" : resolvedSrc;

  // Use standard <img> for local uploads to bypass Next.js Image Optimization
  // which often fails for local files in production/Vercel or if config is missing.
  if (isLocalUpload && !hasError) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-surface-2",
          fill ? "h-full w-full" : "",
          className
        )}
        style={!fill && width && height ? { width, height } : undefined}
      >
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-white/5 z-10" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={finalSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            "object-cover transition-opacity duration-300",
            fill ? "h-full w-full" : "",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          style={{
            objectFit: "cover", // Ensure consistent behavior with fill
            ...(fill ? { position: "absolute", height: "100%", width: "100%", inset: "0px" } : {})
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      </div>
    );
  }

  // Fallback to Next/Image for remote images or placeholders
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-2",
        fill ? "h-full w-full" : "",
        className
      )}
      style={!fill && width && height ? { width, height } : undefined}
    >
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-white/5 z-10" />
      )}
      <Image
        src={finalSrc || "/images/placeholder-dish.svg"}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
