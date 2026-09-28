import { User } from "../entities/user.entity.ts";
import type { IUserRepository } from "./interfaces/user.interface.ts";

export class UserRepository implements IUserRepository {
  private saveUser = new Map<number, User>();

  save(user: User): void {
    if (this.saveUser.has(user.id)) throw Error("User with this ID registered");

    this.saveUser.set(user.id, user);
  }

  findById(userId: number): User {
    const user = this.saveUser.get(userId);

    if (!user) throw Error("User not found");

    return user;
  }

  findAll(): User[] {
    if (Array.from(this.saveUser.values()).length === 0)
      throw Error("No users registered");

    return Array.from(this.saveUser.values());
  }
}
