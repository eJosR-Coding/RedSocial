import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import User from '../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();  // Conectar a la base de datos

  switch (method) {
    case 'POST':
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos.' });
      }

      try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          return res.status(400).json({ success: false, message: 'Credenciales inválidas.' });
        }

        // Respuesta exitosa (agregamos el user._id para pasarlo al frontend)
        res.status(200).json({ success: true, data: { userId: user._id, username: user.username, email: user.email } });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error al autenticar el usuario.' });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Método no permitido" });
      break;
  }
}
