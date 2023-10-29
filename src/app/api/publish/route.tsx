import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import multer from 'multer';


const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads/', // Specify the destination directory for file uploads
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
        },
    }),
});

const uploadMiddleware = upload.single('file'); // 'file' should match the name attribute in your HTML form


export async function POST(request: NextRequest) {

    const data = await request.formData();
    console.log(data)
    
    const file: File | null = data.get('file') as unknown as File
    const thumbnail: File | null = data.get('thumbnail') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }
    if (!thumbnail) {
        return NextResponse.json({ success: false })
    }
    // files
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/uploads/${file.name}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`);

    // thumbnail
    const bytesThumbnail = await thumbnail.arrayBuffer();
    const bufferThumbnail = Buffer.from(bytesThumbnail);

    const path2 = `./public/uploads/${thumbnail.name}`
    await writeFile(path2, bufferThumbnail)
    console.log(`open ${path2} to see the uploaded file`)

    return NextResponse.json({ success: true })
}