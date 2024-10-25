import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';  // Ajusta la ruta si es necesario
import User from '../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos.' });
      }

      try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ success: false, message: 'El usuario ya existe.' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ success: true, data: { username: user.username, email: user.email } });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Método no permitido" });
      break;
  }
}
