import CrudRespository from "./crud-repository.js";
import Like from "../models/like.js";

class LikeRepository extends CrudRespository {
    constructor(){
        super(Like);
    }
}

export default LikeRepository;