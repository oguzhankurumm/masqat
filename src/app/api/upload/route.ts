import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Create a safe, unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const originalExtension = path.extname(file.name);
        // Sanitize the original name by removing the extension and removing tricky characters
        const safeName = path.basename(file.name, originalExtension).replace(/[^a-z0-9]/gi, "_").toLowerCase();
        const filename = `${safeName}-${uniqueSuffix}${originalExtension}`;

        // Ensure the uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        const filepath = path.join(uploadsDir, filename);

        // Save the file
        await writeFile(filepath, buffer);

        // Return the URL for the client to use
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Internal server error during upload" },
            { status: 500 }
        );
    }
}
