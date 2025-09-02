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

export const UserService = {
    signUp
};