import CrudRespository from "./crud-repository.js";
import Tweet from "../models/tweet.js";

class TweetRepository extends CrudRespository {
    constructor(){
        super(Tweet);
    }
}

export default TweetRepository;