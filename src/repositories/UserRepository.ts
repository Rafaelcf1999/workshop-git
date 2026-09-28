import type User from '../entities/User.ts';
import type { IUserRepository } from './interfaces/IUserRepository.ts';

export default class UserRepository implements IUserRepository {
  private readonly users = new Map<number, User>();

  save(user: User): void {
    if (this.users.has(user.id)) {
      throw new Error('A user with this ID already exists.');
    }
    this.users.set(user.id, user);
  }
  findById(id: number): User {
    const user = this.users.get(id);
    if (user !== undefined) {
      return user;
    }
    throw new Error('There is no user with that ID.');
  }
  findAll(): User[] {
    if (this.users.size > 0) {
      return Array.from(this.users.values());
    }
    throw new Error('It has no users.');
  }
}
