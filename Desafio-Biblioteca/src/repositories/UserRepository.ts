import type IUserRepository from "./interfaces/IUserRepository.ts";
import User from "../entities/User.ts";

export default class UserRepository implements IUserRepository {

    private users = new Map<number, User>();
    
    save(user: User): boolean {

        if(this.users.has(user.id)){
            throw new Error(`Um usuário com o ID ${user.id} já está cadastrado no sistema.`);
        }

        this.users.set(user.id, user);
        return true;
    }

    findById(id: number) {

        const user = this.users.get(id);

        if(!user){
            throw new Error(`Usuário com o ID ${id} não encontrado.`)
        }

        return user;
    }

    findAll(): User[] {
        return Array.from(this.users.values());
    }

}