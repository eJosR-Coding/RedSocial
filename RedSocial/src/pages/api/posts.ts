import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import Post from '../models/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const posts = await Post.find({});
                res.status(200).json({ success: true, data: posts });
            } catch (error) {
                res.status(400).json({ success: false, error: (error as any).message });
            }
            break;

        case 'POST':
            try {
                const { title, body, userId } = req.body;

                if (!title || !body || !userId) {
                    return res.status(400).json({ success: false, message: 'Title, body, and userId are required.' });
                }

                const post = await Post.create({ title, body, user: userId });
                res.status(201).json({ success: true, data: post });
            } catch (error) {
                res.status(400).json({ success: false, error: (error as any).message });
            }
            break;

        default:
            res.status(400).json({ success: false, message: "No method for this endpoint" });
            break;
    }
}
