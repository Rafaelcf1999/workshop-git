import type User from "../entities/User.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";


export default class UserRepository implements IUserRepository{
    private users: Map<number, User> = new Map();

    save(user: User): void {
        if(this.users.has(user.id)){
            throw new Error("Usuário com mesmo ID já cadastrado");
        }
        this.users.set(user.id, user);
    }

    findById(id: number): User {
        const user = this.users.get(id);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
       
        return user;
    }

    findAll(): User[] {
        if (this.users.size === 0) {
            throw new Error("Não há usuários cadastrados.");
        }
        
        return Array.from(this.users.values());

    }
    
}