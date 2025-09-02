import CrudRespository from "./crud-repository.js";
import User from "../models/user.js";

class UserRepository extends CrudRespository {
    constructor(){
        super(User);
    }

    async findBy(data) {
        const response = await User.findOne(data);
        return response;
    }
}

export default UserRepository;