import { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository {
  private userRepository = new Map<number, User>();

  save(user: User): void {
    if (this.userRepository.has(user.id)) {
      throw new Error(
        `Usuário de ID número ${user.id} já existe no repositório.`,
      );
    }

    this.userRepository.set(user.id, user);
  }

  findById(id: number): Readonly<User> {
    const userId = this.userRepository.get(id);

    if (!userId) {
      throw new Error(
        `Usuário de ID número ${id} não encontrado no repositório.`,
      );
    }

    return userId;
  }

  findAll(): Readonly<User[]> {
    if (this.userRepository.size === 0) {
      throw new Error("Não existem usuários cadastrados no repositório.");
    }

    return [...this.userRepository.values()];
  }
}
