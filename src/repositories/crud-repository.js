import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app-error.js";

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.findByIdAndDelete(id);
        if (!response) {
            throw new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id) {
        const response = await this.model.findById(id);
        if (!response) {
            throw new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.find({});
        return response;
    }

    async update(id, data) {
        const response = await this.model.findByIdAndUpdate(id, data, { new: true });
        if (!response) {
            throw new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

export default CrudRepository;