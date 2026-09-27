import { User } from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository{
    private Users: Map<number, User>= new Map;

    public save(user: User): void{
        if(this.Users.has(user.id)){
            throw new Error(`O usuário com ID ${user.id} já existe.`)  
        }
        this.Users.set(user.id, user);
    }

    public findById(id: number): User{
        const user = this.Users.get(id);
        if(!user) {
            throw new Error(`O usuário com ID ${id} não foi encontrado.`)
        }
        return user;
    }

    public findAll(): User[] {
        if(this.Users.size === 0){
            throw new Error("Não existe nenhum usuário cadastrado.")
        }
        return Array.from(this.Users.values())

    }
}
