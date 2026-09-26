import { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository{
    private users: Map<number, User> = new Map();

    public save(user: User): void{
        if(this.users.has(user.id)){
            throw new Error(`User with id ${user.id} already exists`);
        }
        this.users.set(user.id, user);
    }

    public findById(id: number): User{
        const user = this.users.get(id);
        if(!user){
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    public findAll(): User[]{
        if(this.users.size === 0){
            throw new Error("No users registered");
        }
        return Array.from(this.users.values());
    }
}