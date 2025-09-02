import CrudRespository from "./crud-repository.js";
import Like from "../models/like.js";

class LikeRepository extends CrudRespository {
    constructor(){
        super(Like);
    }

    async findBy(data) {
        const response = await Like.findOne(data);
        return response;
    };
}

export default LikeRepository;