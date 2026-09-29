import User from "../entities/User.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository{

    private users: Map<number, User> = new Map();

    public save(user: User): void {
        this.users.set(user.id, user);
    }

    public findById(id: number): User | undefined {
        return this.users.get(id);
    }
    
    public findAll(): User[] {
        return Array.from(this.users.values());
    }
}