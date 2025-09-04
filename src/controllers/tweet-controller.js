import { TweetService } from '../services/tweet-service.js';
import { StatusCodes } from "http-status-codes";
import upload from "../config/file-upload-s3.js";

import SuccessResponse from '../utils/common/success-response.js';
import ErrorResponse from '../utils/common/error-response.js';

async function createTweet(req, res) {
    const singleUploader = upload.single('image');
    try {
        singleUploader(req, res, async function(err) {
            if(err) {
                console.log(err);
            }
            console.log(req.file);
            const payload = {...req.body};
            payload.image = req.file.location;
            const tweet = await TweetService.create(payload);
            SuccessResponse.data = tweet;
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
        });
    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function getTweets(req, res) {
    try {
        const tweets = await TweetService.getAll();
        SuccessResponse.data = tweets;
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

async function getTweet(req, res) {
    try {
        const tweet = await TweetService.get(req.params.id);
        SuccessResponse.data = tweet;
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

async function destroyTweet(req, res) {
    try {
        const response = await TweetService.destroy(req.params.id);
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

export {
    createTweet,
    getTweets,
    getTweet,
    destroyTweet
}
