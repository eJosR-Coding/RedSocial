import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IPost } from './post';

export interface IComment extends Document {
    body: string;
    post: IPost['_id'];
    user: IUser['_id'];
    likes: IUser['_id'][];
}

const commentSchema: Schema = new Schema({
    body: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
