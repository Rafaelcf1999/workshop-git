import User from "../entities/User.ts";
import type  IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository{
    private users: Map<number, User> = new Map<number, User>(); 

    save(user: User): void {
        if(this.users.has(user.id)){
            throw new Error("User already exists");
        }
        this.users.set(user.id, user);
    }

    findById(id: number): User {
        const user = this.users.get(id);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }

    findAll(): User[] {
        if(this.users.size === 0){
            throw new Error("No users found");
        }
        return Array.from(this.users.values());
    }

}
