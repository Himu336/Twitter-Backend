import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    author: {
        type: String, // This should ideally be a mongoose.Schema.Types.ObjectId and ref: 'User'
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    retweets: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ],
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ],
    image: {
        type: String
    }
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;