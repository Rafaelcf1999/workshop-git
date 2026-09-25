import {User} from "../entities/User.js";
import type {IUserRepository} from "./interfaces/IUserRepository.js";

export class UserRepository implements IUserRepository {
    private users: Map<number, User> = new Map();

    save(user: User): void {
        if (this.users.has(user.id)) { // verifica o map, caso o usuário já exista, lança um erro
            throw new Error(`User with id ${user.id} already exists.`);
        }
        this.users.set(user.id, user); // caso não exista, adiciona o usuário ao map
    }

    findById(id: number): User {
        const user = this.users.get(id);
        if (!user) { // verifica se o usuário existe pelo id, caso não exista, lança um erro
            throw new Error(`User with id ${id} not found.`);
        }
        return user;
    }

    findAll(): User[] {
        if (this.users.size === 0) { // verifica se o map está vazio, caso esteja, lança um erro
            throw new Error("No users found.");
        }
        return Array.from(this.users.values()); // caso não esteja vazio, retorna todos os usuários do map
    }
}