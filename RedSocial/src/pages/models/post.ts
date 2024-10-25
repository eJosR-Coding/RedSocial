import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
  user: string;
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
