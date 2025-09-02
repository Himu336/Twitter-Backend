import { LikeService } from '../services/like-service.js';
import { StatusCodes } from "http-status-codes";

import SuccessResponse from '../utils/common/success-response.js';
import ErrorResponse from '../utils/common/error-response.js';

async function toggleLike(req, res) {
    try {
        const data = req.body;
        // console.log(data.modelId, data.modelType, data.userId);
        const response = await LikeService.toggleLike(data.modelId, data.modelType, data.userId);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

export const LikeController = {
    toggleLike
};