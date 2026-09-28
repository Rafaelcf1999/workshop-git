import User from "../../entities/User.ts";

export default interface IUserRepository{
    save(user: User): boolean;
    findById(id: number): User;
    findAll(): User[];
} 