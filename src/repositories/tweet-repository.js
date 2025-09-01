import CrudRespository from "./crud-repository";
import { Tweet } from "../models";

class TweetRepository extends CrudRespository {
    constructor(){
        super(Tweet);
    }
}

export default TweetRepository;