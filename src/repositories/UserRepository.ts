import User from "../entities/User.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository {

    private users: Map<number, User> = new Map<number, User>();

    save(objectToSave: User): User {
        const userAlreadyExists = this.users.get(objectToSave.id);
        if (userAlreadyExists) throw new Error("ERRO: Usuário já registrado.");
        this.users.set(objectToSave.id, objectToSave);
        return objectToSave;
    }
    findById(id: number): User | null {
        const user = this.users.get(id);
        if (!user) throw new Error("ERRO: Usuário não encontrado.");
        return user || null;
    }
    findAll(): User[] {
        const allUsers: User[] = Array.from(this.users.values());
        if (allUsers.length === 0) throw new Error("ERRO: Nenhum usuário registrado.");
        return allUsers;
    }

    search(strategy: SearchStrategy<User>, term: string): User[] {
        const allUsers: User[] = Array.from(this.users.values());
        return strategy.search(allUsers, term);
    }

}