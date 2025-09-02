import { UserService } from '../services/user-service.js';
import { StatusCodes } from "http-status-codes";

import SuccessResponse from '../utils/common/success-response.js';
import ErrorResponse from '../utils/common/error-response.js';

async function signUp (req, res) {
    try {
        const user = await UserService.signUp({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

async function signIn (req, res) {
    try {
        const user = await UserService.signIn({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

export const UserController = {
    signUp,
    signIn
};
