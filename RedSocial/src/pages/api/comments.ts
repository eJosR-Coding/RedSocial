import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import Comment from '../models/comment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId, body } = req.body;

  if (!postId || !userId || !body) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  try {
    await dbConnect();

    const newComment = new Comment({ post: postId, user: userId, body });
    await newComment.save();

    res.status(200).json({ success: true, data: newComment });
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
}
