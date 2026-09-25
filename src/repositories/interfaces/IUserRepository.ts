import User from "../../entities/User";
export default interface IUserRepository{
    save(user: User): void;
    findById(id: number): User;
    findAll(): User[];
}
