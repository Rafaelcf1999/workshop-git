import type { IUserRepository } from "./interfaces/IUserRepository.ts";
import { User } from "../entities/User.ts";

export class UserRepository implements IUserRepository{
    private users = new Map<number, User>();

    save(user: User): void {
        if(this.users.has(user.id)){
            throw new Error(`The ID: "${user.id}" already exists`);
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
            throw new Error("Users not found");
        }
        return Array.from(this.users.values());
    }
}