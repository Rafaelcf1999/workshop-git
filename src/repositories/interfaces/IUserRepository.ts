import { User } from "../../entities/User";

export interface IUserRepository {
  save(user: User): void;
  findById(id: number): User;
  findAll(): User[];
}
