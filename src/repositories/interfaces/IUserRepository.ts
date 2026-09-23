import { User } from "../../entities/User.ts";

export interface IUserRepository {
  save(user: User): void;
  findById(id: number): Readonly<User>;
  findAll(): Readonly<User[]>;
}
