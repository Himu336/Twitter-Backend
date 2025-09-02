import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";

import LikeRepository from "../repositories/like-repository.js";
import TweetRepository from "../repositories/tweet-repository.js";

const likeRepository = new LikeRepository();
const tweetRepository = new TweetRepository();

async function toggleLike(modelId, modelType, userId) {
    try {
        const model = await tweetRepository.get(modelId);
        if (!model) {
            throw new AppError('The tweet you requested is not present', StatusCodes.NOT_FOUND);
        }
        const existingLike = await likeRepository.findBy({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        if (existingLike) {
            await likeRepository.destroy(existingLike.id);
            model.likes--;
            await tweetRepository.update(modelId, model);
            return false;
        }
        const like = await likeRepository.create({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        model.likes++;

        await tweetRepository.update(modelId, model);
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