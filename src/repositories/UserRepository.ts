import type IUserRepository from "./interfaces/IUserRepository.ts";
import type User from "../entities/User.ts";

export default class UserRepository implements IUserRepository {

    private readonly users = new Map<number, User>();

    save(user: User): void {
        if(this.users.has(user.id)){
            throw new Error ("Já existe um usuário com esse ID")
        }

        this.users.set(user.id, user)
    }

    findById(id: number): User {
        const user = this.users.get(id)

        if(user === undefined) {
            throw new Error(`Não existe ninguem com esse ID: ${id}`)
        }

        return user

    }

    findAll(): Array<User> {
        if(this.users.size === 0){
            throw new Error("Nenhum usuário cadastrado")
        }

        return Array.from(this.users.values())
    }
}