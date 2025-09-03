import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";


import CommentRepository from "../repositories/comment-repository.js";
import TweetRepository from "../repositories/tweet-repository.js";

const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();

async function createComment({ content, user, onModel, commentable }) {
    try {
        // Validate onModel
        if (!['Tweet', 'Comment'].includes(onModel)) {
            throw new AppError('Invalid onModel type', StatusCodes.BAD_REQUEST);
        }

        // Check if commentable exists
        let parent;
        if (onModel === 'Tweet') {
            parent = await tweetRepository.get(commentable);
        } else {
            parent = await commentRepository.get(commentable);
        }
        if (!parent) {
            throw new AppError(`${onModel} not found for commenting`, StatusCodes.NOT_FOUND);
        }

        // Create comment
        const comment = await commentRepository.create({
            content,
            user,
            onModel,
            commentable
        });

        // Optionally, add comment reference to parent (for fast lookup)
        parent.comments = parent.comments || [];
        parent.comments.push(comment._id);
        if (onModel === 'Tweet') {
            await tweetRepository.update(commentable, parent);
        } else {
            await commentRepository.update(commentable, parent);
        }

        return comment;
    } catch (error) {
        throw new AppError(error.message || 'Cannot create comment', error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCommentsForModel({ onModel, commentable }) {
    try {
        // Get all comments for a tweet or comment
        const comments = await commentRepository.model.find({
            onModel,
            commentable
        }).populate('user');
        return comments;
    } catch (error) {
        throw new AppError('Cannot fetch comments', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getComment(id) {
    try {
        const comment = await commentRepository.get(id);
        return comment;
    } catch (error) {
        throw new AppError('Cannot fetch comment', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteComment(id) {
    try {
        const comment = await commentRepository.destroy(id);
        return comment;
    } catch (error) {
        throw new AppError('Cannot delete comment', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const CommentService = {
    createComment,
    getCommentsForModel,
    getComment,
    deleteComment
};