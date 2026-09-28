import { User } from "../../entities/user";

export interface IUserRepository {
    save(user: User): void;
    findById(id: number): User;
    findAll(): User[];
}