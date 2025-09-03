import { CommentService } from '../services/comment-service.js';
import { StatusCodes } from "http-status-codes";
import SuccessResponse from '../utils/common/success-response.js';
import ErrorResponse from '../utils/common/error-response.js';

async function createComment(req, res) {
    try {
        const comment = await CommentService.createComment({
            content: req.body.content,
            user: req.user._id, // assuming authentication middleware sets req.user
            onModel: req.body.onModel,
            commentable: req.body.commentable
        });
        SuccessResponse.data = comment;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCommentsForModel(req, res) {
    try {
        const comments = await CommentService.getCommentsForModel({
            onModel: req.query.onModel,
            commentable: req.query.commentable
        });
        SuccessResponse.data = comments;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getComment(req, res) {
    try {
        const comment = await CommentService.getComment(req.params.id);
        SuccessResponse.data = comment;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await CommentService.deleteComment(req.params.id);
        SuccessResponse.data = comment;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export const CommentController = {
    createComment,
    getCommentsForModel,
    getComment,
    deleteComment
};
