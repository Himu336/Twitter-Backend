import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";

import LikeRepository from "../repositories/like-repository.js";

import TweetRepository from "../repositories/tweet-repository.js";
import CommentRepository from "../repositories/comment-repository.js";

const likeRepository = new LikeRepository();
const tweetRepository = new TweetRepository();
const commentRepository = new CommentRepository();


async function toggleLike(modelId, modelType, userId) {
    try {
        let repository;
        if (modelType === "Tweet") {
            repository = tweetRepository;
        } else if (modelType === "Comment") {
            repository = commentRepository;
        } else {
            throw new AppError('Invalid model type for like', StatusCodes.BAD_REQUEST);
        }

        const model = await repository.get(modelId);
        if (!model) {
            throw new AppError(`The ${modelType.toLowerCase()} you requested is not present`, StatusCodes.NOT_FOUND);
        }

        const existingLike = await likeRepository.findBy({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if (existingLike) {
            await likeRepository.destroy(existingLike.id);
            model.likes = (model.likes > 0 ? model.likes - 1 : 0);
            await repository.update(modelId, model);
            return false;
        }

        await likeRepository.create({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        model.likes = (model.likes || 0) + 1;
        await repository.update(modelId, model);
        return true;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(error.message, error.statusCode);
        }
        throw new AppError('Cannot toggle like', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const LikeService = {
    toggleLike
};