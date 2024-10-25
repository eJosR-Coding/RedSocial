import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../libs/dbConnect';
import Room from '../models/Room';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect(); // Conectar a la base de datos

  switch (method) {
    case 'GET':
      try {
        //MONGO DB QUERYING: 
        // Usamos `aggregate` para buscar usuarios con estado "waiting" y seleccionar uno aleatoriamente
        const rooms = await Room.aggregate([
          { $match: { status: "waiting" } }, // Buscar usuarios con el estado "waiting"
          { $sample: { size: 2 } }            // Tomar aleatoriamente 2 usuarios
        ]);

        res.status(200).json({ success: true, data: rooms });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as any).message });
      }
      break;

    case 'POST':
      try {
        // Extraemos 'name' y 'description' de req.body
        const { name, description } = req.body;

        // Validamos que 'name' y 'description' estén presentes
        if (!name || !description) {
          return res.status(400).json({ success: false, message: 'Name and description are required.' });
        }

        // Crear un nuevo registro de room
        const room = await Room.create({ name, description });
        res.status(201).json({ success: true, data: room });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as any).message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "No method for this endpoint" });
      break;
  }
}
