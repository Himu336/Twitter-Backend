import CrudRespository from "./crud-repository.js";
import Hashtag from "../models/hashtag.js";

class HashtagRepository extends CrudRespository {
    constructor(){
        super(Hashtag);
    }

    async bulkCreate(data) {
        const tags = await Hashtag.insertMany(data);
        return tags;
    }

    async getHashtagByName(text) {
        const hashtag = await Hashtag.find({
            text:text
        });
        return hashtag;
    }
}

export default HashtagRepository;