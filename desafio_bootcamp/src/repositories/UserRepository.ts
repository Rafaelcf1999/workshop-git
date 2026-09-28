import { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository {
    public users: Map<number, User> = new Map<number, User>();
    
    public save(user: User): void {
        if (this.users.has(user.id)) {
             throw new Error("O usuário já existe");
        }
        this.users.set(user.id, user);
    }
    public findById(userId: number): User {
        if (!this.users.has(userId)) {
             throw new Error("Usuário não encontrado");
        }
        return this.users.get(userId)!;
    }
    public findAll(): User[] {
        if (this.users.size === 0) {
             throw new Error("Nenhum usuário cadastrado");
        }
        return Array.from(this.users.values());
    }


}