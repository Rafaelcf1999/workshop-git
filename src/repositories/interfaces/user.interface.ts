import { User } from "../../entities/user.entity.ts";

export interface IUserRepository {
  save(user: User): void;
  findById(userId: number): User;
  findAll(): User[]
}
