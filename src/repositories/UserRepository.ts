/*
Armazene os usuários em um Map<number, User>.
save: lança erro se já existir um livro com o mesmo id.
findById: lança erro se o usuario não for encontrado.
findAll: lança erro se não houver usuarios cadastrados.
*/

import{User} from "../entities/User.ts"
import type {IUserRepository} from "./interfaces/IUserRepository.ts"

export class UserRepository implements IUserRepository {
    private readonly users: Map<number,User> = new Map();

    public save(user: User): void {
        if(this.users.has(user.id)){
            throw new Error(`Usuario com id ${user.id} ja existe`);
        }
        this.users.set(user.id,user);
    }

    public findById(id: number): User {
        const user = this.users.get(id);
        if(!user){
            throw new Error(`Usuario com id ${id} nao encontrado`);
        }
        return user;
    }

    public findAll(): User[] {
        if(this.users.size ===0){
            throw new Error("Sem ususarios cadastrados");
        }
        return Array.from(this.users.values());
    }


}