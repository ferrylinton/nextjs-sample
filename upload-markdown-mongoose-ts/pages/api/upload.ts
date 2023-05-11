import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable";
import fs from "fs";
import connect from '@/utils/mongodb';
import Post from '@/models/Post';
import { render } from '@/utils/markdown';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connect();
    const { method } = req;

    if (method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            data: null,
            error: "Method Not Allowed",
        });
        return;
    }

    try {
        const form = formidable();

        form.parse(req, async (err, fields, files) => {
            console.log('parse.....')
            if (err) {
                console.log(err);
                res.status(200).json({ message: String(err) })
            } else {
                try {
                    console.log(fields);
                    const content = await getContent(files);
                    const createdAt = new Date();
                    const lastUpdatedAt = createdAt;
                    const post = await Post.create({ content, createdAt, lastUpdatedAt, ...fields });

                    return res.status(200).json(post);
                } catch (error) {
                    console.log(error);
                    return res.status(200).send(error);
                }
            }


        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ data: null, error: "Internal Server Error" });
    }


}

const getContent = async (files: formidable.Files) => {
    const file = files.file as formidable.File;

    if (file) {
        try {
            const buffer = fs.readFileSync(file.filepath);
            const content = render(buffer.toString());
            fs.unlinkSync(file.filepath);
            return content;
        } catch (error: any) {
            return `<h1>{error.message}</h1>`;
        }
    }

    return `<h1>File is not found<h1>`;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
