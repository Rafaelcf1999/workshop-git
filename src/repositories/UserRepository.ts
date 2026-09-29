import { User } from "../entities/User";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

    private users: Map<number, User> = new Map();

    save(user: User): void {
        if(this.users.has(user.id)) {
            throw new Error("Usuário já cadastrado.");
        }
        this.users.set(user.id, user);
    }

    findById(id: number): User {
        const user = this.users.get(id);
        if(!user) {
            throw new Error("Usuário não encontrado.");
        }
        return user;
    }
    
    findAll(): User[] {
        if(this.users.size === 0) {
            throw new Error("Nenhum usuário cadastrado.");
        }
        return Array.from(this.users.values());
    }

}