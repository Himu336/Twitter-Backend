import CrudRespository from "./crud-repository.js";
import Comment from "../models/comment.js";

class CommentRepository extends CrudRespository {
    constructor(){
        super(Comment);
    }
}

export default CommentRepository;