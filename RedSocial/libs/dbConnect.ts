import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL as string; // Forzar a 'string', ya que nos aseguramos de que no será undefined

if (!MONGODB_URI) {
  throw new Error('Por favor define la variable MONGO_URL en el archivo .env.local');
}

/**
 * Global es necesario para que no se creen múltiples conexiones en desarrollo.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
