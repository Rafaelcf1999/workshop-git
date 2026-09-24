import { User } from "../../entities/User.js";

export interface IUserRepository {
    save(user: User): void;
    findById(id: number): User;
    findAll(): User[];
}