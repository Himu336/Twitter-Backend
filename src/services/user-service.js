import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";

import UserRepository from "../repositories/user-repository.js";

const userRepository = new UserRepository();

async function signUp(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function signIn(data) {
    try {
        const user = await userRepository.findBy({ email: data.email });
        if (!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = user.comparePassword(data.password);
        if (!passwordMatch) {
            throw new AppError('Password is incorrect', StatusCodes.BAD_REQUEST);
        }
        return user;
    } catch (error) {
        console.log(error);
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(error.message, error.statusCode);
        }
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.message, error.statusCode);
        }
        throw new AppError('Cannot signIn a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const UserService = {
    signUp,
    signIn
};