import type { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository{
    private users = new Map<number, User>()

    save(user: User): void {
        if (this.users.has(user.id)) {
            throw new Error("o usuario ja existe.");
        }
        this.users.set(user.id, user)
    }

    findById(id: number): User {
        const user = this.users.get(id)
        if (!user) {
            throw new Error("livro não existe.");
        }
        return user;
    }

    findAll(): User[] {
        if (this.users.size === 0) {
            throw new Error("sem livros registrados.");
        }
        return Array.from(this.users.values())
    } 

    
}

