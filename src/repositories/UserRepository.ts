import {User} from "../entities/User.js";
import type IUserRepository from "./interfaces/IUser.js";

export default class UserRepository implements IUserRepository {
    private users = new Map<number, User>();


    save(user: User): void {
         if(this.users.has(user.id)){
            throw new Error(`Usuario já cadastrado.`);    
        }
        this.users.set(user.id, user);
    }

    findById(id: number): User {
        const foundUser = this.users.get(id);
        if(!foundUser){
            throw new Error(`Usuario não foi encontrado.`);  
        }
        
        return foundUser; 
    }

    findAll(): User[] {
        if(this.users.size === 0){
            throw new Error("Nenhum usuario foi cadastrado..");
            
        }
        return Array.from(this.users.values());
    }

}