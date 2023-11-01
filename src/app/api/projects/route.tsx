import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { projects } from '@/db/database'
import { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { ObjectId } from 'mongodb';

const region = process.env.AWS_Region;
const accessKey = process.env.Access_key;
const secretKey = process.env.Secret_access_key;

const s3Client = new S3Client({
    region: region!,
    credentials: {
        accessKeyId: accessKey!,
        secretAccessKey: secretKey!,
    },
});

export async function POST(request: NextRequest) {

    try {
        const data = await request.formData();
        // console.log(data)

        const file: File | null = data.get('file') as unknown as File
        const thumbnail: File | null = data.get('thumbnail') as unknown as File

        const title: File | null = data.get('title') as unknown as File
        const description: File | null = data.get('description') as unknown as File
        const price: File | null = data.get('price') as unknown as File
        const downloads: File | null = data.get('downloads') as unknown as File
        const likes: File | null = data.get('likes') as unknown as File

        if (!file) {
            return NextResponse.json({ msg: 'Project file is empty' })
        }
        if (!thumbnail) {
            return NextResponse.json({ msg: 'Project Thumbnail is empty' })
        }
        // files
        const bytes = await file.arrayBuffer();
        const bufferFile = Buffer.from(bytes);

        // const path = `./public/uploads/${file.name}`
        // await writeFile(path, bufferFile)
        // console.log(`open ${path} to see the uploaded file`);

        // thumbnail
        const bytesThumbnail = await thumbnail.arrayBuffer();
        const bufferThumbnail = Buffer.from(bytesThumbnail);

        // const path2 = `./public/uploads/${thumbnail.name}`
        // await writeFile(path2, bufferThumbnail)
        // console.log(`open ${path2} to see the uploaded file`)

        const newFilename = file.name;

        const fileExtension2 = '.' + thumbnail.name.split('.').pop();
        const newthumbnailName = 'thumbnail' + Date.now() + fileExtension2;

        const params = {
            Bucket: process.env.Buket_Name,
            Key: 'projects/' + newFilename,
            Body: bufferFile,
        };
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const params2 = {
            Bucket: process.env.Buket_Name,
            Key: 'thumbnails/' + newthumbnailName,
            Body: bufferThumbnail,
        };
        const command2 = new PutObjectCommand(params2);
        await s3Client.send(command2);
        const insertData = await projects.insertOne({
            title: String(title),
            description: String(description),
            file: String(newFilename),
            thumbnail: String(newthumbnailName),
            price: Number(price),
            likes: Number(likes),
            downloads: Number(downloads),
            details: []
        })

        return NextResponse.json({ msg: 'project successfully published' }, { status: 201 })
    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}


export async function GET() {
    try {
        const data = await projects
            .find({})
            .project({ details: 0 })
            .limit(50)
            .toArray();
        //   console.log(data);

        return NextResponse.json({ msg: 'successfully fetched data', projects: data }, { status: 201 })
    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}


export async function PATCH(request: NextRequest) {
    try {
        const data = await request.formData();

        const image: File | null = data.get('image') as unknown as File
        const title: File | null = data.get('title') as unknown as File
        const projectId: string | null = data.get('projectId') as unknown as string;

        if (!image) {
            return NextResponse.json({ msg: 'Project file is empty' })
        }

        // files
        const bytes = await image.arrayBuffer();
        const bufferFile = Buffer.from(bytes);

        const fileExtension2 = '.' + image.name.split('.').pop();
        const newthumbnailName = 'thumbnail' + Date.now() + fileExtension2;

        const params2 = {
            Bucket: process.env.Buket_Name,
            Key: 'thumbnails/' + newthumbnailName,
            Body: bufferFile,
        };
        const command2 = new PutObjectCommand(params2);
        await s3Client.send(command2);

        const updatedData = await projects.updateOne({ _id:new ObjectId(projectId) }, {
            $push: {
                details: {
                    id: new ObjectId().toString(),
                    title: title,
                    image: newthumbnailName,
                }
            }
        })
        // console.log(updatedData);

        return NextResponse.json({ msg: 'Data successfully Added.' }, { status: 201 })
    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}
