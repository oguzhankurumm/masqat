"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { compressImage } from "@/lib/compression";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        // Validate size (e.g., 30MB max)
        const MAX_SIZE = 30 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("File is too large. Maximum size is 30MB");
            return;
        }

        setIsUploading(true);

        try {
            // Compress image before upload (skip SVG)
            let compressedFile = file;
            if (file.type !== "image/svg+xml") {
                const type = file.type === "image/png" || file.type === "image/webp" ? "image/webp" : "image/jpeg";
                compressedFile = await compressImage(file, {
                    maxWidth: 1920,
                    maxHeight: 1080,
                    quality: 0.8,
                    type,
                });
            }

            const formData = new FormData();
            formData.append("file", compressedFile);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();

            if (data.url) {
                onChange(data.url);
                toast.success("Image uploaded successfully");
            } else {
                throw new Error("No URL returned from server");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("There was a problem uploading your image.");
        } finally {
            setIsUploading(false);
            // Reset input value so the same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const triggerSelect = () => {
        if (!disabled && !isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
    };

    return (
        <div className="w-full space-y-4">
            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-surface-2 aspect-video">
                    <SmartImage
                        path={value}
                        alt="Uploaded image preview"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={triggerSelect}
                            className="gap-2"
                            disabled={disabled || isUploading}
                        >
                            <UploadCloud className="w-4 h-4" />
                            Replace
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemove}
                            className="gap-2"
                            disabled={disabled || isUploading}
                        >
                            <X className="w-4 h-4" />
                            Remove
                        </Button>
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                            <span className="text-sm font-medium text-white">Uploading...</span>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={triggerSelect}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "relative cursor-pointer rounded-xl border-2 border-dashed aspect-video flex flex-col items-center justify-center p-6 text-center transition-colors duration-200",
                        isDragging
                            ? "border-primary bg-primary/10"
                            : disabled
                                ? "border-white/5 bg-surface-2/50 cursor-not-allowed"
                                : "border-white/10 bg-surface-2 hover:bg-surface-2/80 hover:border-white/20"
                    )}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <p className="text-sm font-medium text-white">Uploading image...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            <div className="p-4 rounded-full bg-white/5 mx-auto">
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-white">
                                    Click or drag and drop an image
                                </p>
                                <p className="text-xs">
                                    SVG, PNG, JPG or WEBP (max. 30MB)
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                className="hidden"
                disabled={disabled || isUploading}
            />
        </div>
    );
}
