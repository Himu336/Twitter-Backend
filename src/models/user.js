import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/server-config.js";

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

userSchema.pre('save', function(next) {
    const user = this;
    const salt = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
};

userSchema.methods.genJWT = function genJWT() {
    const user = this;
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};
        
const User = mongoose.model('User', userSchema);
export default User;