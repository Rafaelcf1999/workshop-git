import type { User } from "../../entities/User.js";

export interface IUserRepository{
    save(user: User): void
    remove(id: number): User
    findAll(): User[];
}

