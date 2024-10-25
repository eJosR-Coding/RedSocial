import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import User from '../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'Falta el userId' });
  }

  try {
    await dbConnect();
    const user = await User.findById(userId).select('username email'); // No necesitamos la contraseña aquí

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
}
