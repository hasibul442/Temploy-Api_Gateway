import fs from "fs";
import path from "path";


const fsPromises = fs.promises;

export const saveBase64Image = async (dataUrl, folderName = "default", prefix = "image", hostUrl) => {
    try {
        if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return null;

        const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!matches) throw new Error('Invalid base64 image data');

        const mime = matches[1];
        const base64Data = matches[2];
        const ext = mime.split('/')[1] || 'png';

        const buffer = Buffer.from(base64Data, 'base64');

        const uploadsDir = path.join(process.cwd(), 'uploads', folderName);
        await fsPromises.mkdir(uploadsDir, { recursive: true });

        const filename = `${prefix}-${Date.now()}.${ext}`;
        const filePath = path.join(uploadsDir, filename);
        await fsPromises.writeFile(filePath, buffer);

        const url = `${hostUrl.replace(/\/$/, '')}/uploads/${folderName}/${filename}`;
        return { filePath, url };
    } catch (err) {
        console.error("❌ Error saving base64 image:", err);
        return null;
    }
}

export async function deleteFile(imageUrl, folderName = "default") {
    try {
        if (!imageUrl || !imageUrl.includes(`/uploads/${folderName}/`)) return;

        const filename = imageUrl.split(`/uploads/${folderName}/`)[1];
        if (!filename) return;

        const filePath = path.join(process.cwd(), 'uploads', folderName, filename);
        if (fs.existsSync(filePath)) {
            await fsPromises.unlink(filePath);
        }
    } catch (err) {
        console.error("❌ Error deleting file:", err);
    }
}