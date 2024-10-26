import mongoose, { Schema, Document } from 'mongoose';

export interface IPost {
  _id: string; // Cambiar a solo `string`
  title: string;
  body: string;
  user: string;
  createdAt: string;
}



const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }); // timestamps automatically adds createdAt and updatedAt

export default mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
