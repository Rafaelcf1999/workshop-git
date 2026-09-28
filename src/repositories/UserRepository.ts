import { User} from "../entities/User.ts";
import type { IUserRepository } from "./interfaces/IUserRepository.ts";


export class UserRepository implements IUserRepository {
    private Users = new Map<number, User>();

    save(user: User): void {
        
        if (this.Users.has(user.id)){
            throw Error("Esse usuário já esta cadastrado");
        } this.Users.set(user.id, user);
    }

    findById (id: number): User{
    
        const encontrarUser = this.Users.get(id);

        if (!encontrarUser){
            throw Error("usuário não encontrado ");
        }return encontrarUser;
    }

    findAll(): User[]{
        
       if(this.Users.size === 0){
            throw Error("Não há usuários cadastrados");
        } return Array.from(this.Users.values());

    }}