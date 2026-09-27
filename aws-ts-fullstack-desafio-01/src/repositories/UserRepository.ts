import type User from "../entities/User.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository {

    private users: Map<number, User> = new Map<number, User>();

    save(user: User): void {
        if (this.users.has(user.id)) {

            throw new Error(`user with id ${user.id} already exists`);
        }
        this.users.set(user.id, user);
    }

    findById(id: number): User {
        const user = this.users.get(id);
        if (!user) {

            throw new Error(`user with id ${id} not found`);
        }
        return user;
    }
    findAll(): User[] {
        if (this.users.size === 0) {
            throw new Error("No users registered");
        }
        return Array.from(this.users.values());
    }

}