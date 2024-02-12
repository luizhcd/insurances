import User from "../models/user";
import BaseRepository from "./baseRepository";

export default class userRepository extends BaseRepository<User> {
    constructor() {
        super(User)
    }

    findByUsername(username): Promise<User | null> {
        return this.modelClass.findOne({
            where: { username }
        })
    }
}
