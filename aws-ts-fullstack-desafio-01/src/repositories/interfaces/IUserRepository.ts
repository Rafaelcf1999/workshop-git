import type User from "../../entities/User.ts";

export default interface IUserRepository {
    save(user: User): void;
    findById(id: number): User;
    findAll(): User[];
}