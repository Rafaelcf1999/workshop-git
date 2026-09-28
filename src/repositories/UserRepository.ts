import type { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository {
  private readonly users: Map<number, User> = new Map();

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
    const users = Array.from(this.users.values());

    if (users.length === 0) {
      throw new Error("No users registered");
    }

    return users;
  }
}
