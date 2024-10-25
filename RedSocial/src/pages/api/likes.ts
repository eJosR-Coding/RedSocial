import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import Like from '../models/likes';
import Post from '../models/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ success: false, message: 'Falta el postId o userId' });
  }

  try {
    await dbConnect();

    // Buscar si el usuario ya ha dado like al post
    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      // Si ya dio like, eliminar el like
      await Like.deleteOne({ _id: existingLike._id });
      const post = await Post.findById(postId);
      post.likes -= 1;
      await post.save();
      return res.status(200).json({ success: true, liked: false });
    }

    // Si no ha dado like, agregar el like
    const newLike = new Like({ post: postId, user: userId });
    await newLike.save();

    const post = await Post.findById(postId);
    post.likes += 1;
    await post.save();

    res.status(200).json({ success: true, liked: true });
  } catch (error) {
    console.error('Error al manejar los likes:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
}
