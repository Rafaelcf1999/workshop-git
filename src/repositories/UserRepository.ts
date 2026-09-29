import { User } from '../entities/User.ts';
import type { IUserRepository } from './interfaces/IUserRepository.ts';

export class UserRepository implements IUserRepository {
  private users: Map<number, User> = new Map();

  //lança erro se já existir usuário com mesmo id.
  save(user: User): void {
    if (this.users.has(user.id)) {
      throw new Error(`Já existe um usuário com o id ${user.id}`);
    }
    this.users.set(user.id, user);
  }

  //lança erro se o usuário não for encontrado.
  findById(id: number): User {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`Usuário com o id ${id} não encontrado.`);
    }
    return user;
  }

  //lança erro se não houver usuários cadastrados.
  findAll(): User[] {
    if (this.users.size === 0) {
      throw new Error('Não há usuários cadastrados.');
    }
    return Array.from(this.users.values());
  }
}
