import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: ''
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    tweets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tweet',
        default: []
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;