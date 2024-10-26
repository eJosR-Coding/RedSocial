
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import Comment from '../models/comment';
import Post from '../models/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { postId, userId, body, parentCommentId } = req.body;

        try {
            const newComment = new Comment({
                body,
                user: userId,
                post: postId,
                parentComment: parentCommentId || null, 
            });
            await newComment.save();

            res.status(201).json({ success: true, data: newComment });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al guardar el comentario' });
        }
    }
}
