import {User} from "../../entities/User.js";

export default interface IUserRepository {
    
    save(User: User): void;
    findById(id: number): User;
    findAll(): User[]
    
}