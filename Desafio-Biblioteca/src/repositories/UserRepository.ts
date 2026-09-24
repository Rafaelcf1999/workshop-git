import User from "../entities/User";
import IUserRepository from "./interfaces/IUserRepository";

export default class UserRepository implements IUserRepository{

    save(user: User): void {
        
    } 

    findById(id: number) {
        
    }

    findAll(): void {
        
    }

}