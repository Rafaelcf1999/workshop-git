import { User } from "../entities/User.ts";
import { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository {
  private users: Map<number, User> = new Map();

  public save(user: User): void {
    if (this.users.has(user.id)) {
      throw new Error(`O usuário do Id ${user.id} já existe.`);
    }
    this.users.set(user.id, user);
  }

  public findById(id: number): User {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`O usuário do Id ${id} não encontrado.`);
    }
    return user;
  }

  public findAll(): User[] {
    if (this.users.size === 0) {
      throw new Error("Não há usuários cadastrados.");
    }
    return Array.from(this.users.values());
  }
}