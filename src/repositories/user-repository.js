import CrudRespository from "./crud-repository.js";
import User from "../models/user.js";

class UserRepository extends CrudRespository {
    constructor(){
        super(User);
    }
}

export default UserRepository;