import { User } from "../../entities/User.ts";

export interface IUserRepository{
    save(user: User): void;
    findById(id: number): User | undefined;
    findAll(): User[];
}