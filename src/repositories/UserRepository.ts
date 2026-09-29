import type IUserRepository from "./interfaces/IUserRepository.ts";
import type User from "../entities/User.ts";

export default class UserRepository implements IUserRepository{
    private readonly users: Map<number, User> = new Map()

    save(user: User): void {
        if(this.users.has(user.id) === true){
            throw new Error("User already exists!");
        }

        this.users.set(user.id, user);
        console.log("User registered");
    }
    
    findById(id: number): User {
       const resposta = this.users.get(id);

       if(resposta === undefined){
            throw new Error ("User not found");
       }

       return resposta;
    }

    findAll() {
        if (this.users.size <= 0){
            throw new Error("No users registered");
        }
        return this.users;

        /*for (let [id, users] of this.users.entries()){
            console.log(`${id} => ${users}`)
        }*/
    }

}
