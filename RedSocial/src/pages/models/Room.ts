import mongoose, { Schema, model, models } from 'mongoose';

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "waiting", 
    }
});

const Room = models.Room || model('Room', RoomSchema);

export default Room;
