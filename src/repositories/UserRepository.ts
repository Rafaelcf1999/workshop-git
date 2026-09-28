import type { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository {
  private users = new Map<number, User>();

  public save(user: User): void {
    if (this.users.has(user.id)) {
      throw new Error("User already exists");
    }

    this.users.set(user.id, user);
  }

  public findById(id: number): User {
    const user = this.users.get(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public findAll(): User[] {
    if (this.users.size === 0) {
      throw new Error("No users registered");
    }

    return [...this.users.values()];
  }
}
