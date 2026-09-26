import type IUserRepository from "./interfaces/IUserRepository.ts";
import User from "../entities/User.ts";

export default class UserRepository implements IUserRepository {

    public users = new Map<number, User>();
    
    save(user: User): void {
        for (let [userid] of this.users) {
            if (userid === user.id) {
                console.error(`Um usuário com o ID ${user.id} já está cadastrado no sistema.`)
            }
        }

        this.users.set(user.id, user);
    }

    findById(id: number) {
        for (let [userid] of this.users) {
            if (userid === id) {
                return this.users.get(id);
            }
        }

        console.error(`Não há um usuário cadastrado com o ID ${id}.`);
    }

    findAll(): void {
        for (let user of this.users) {
            console.log(user)
        }
    }

}