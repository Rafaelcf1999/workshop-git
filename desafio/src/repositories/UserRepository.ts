import User from "../entities/User";
import IUserRepository from "./interfaces/IUserRepository";

export default class UserRepository implements IUserRepository {

    private userDataBase = new Map<number, User>();

    save(user: User): void {
        if(this.alreadyExist(user.id)) {
        throw new Error('Usuário com esse id já está cadastrado');
       }
       console.log('Tudo ok, cadastrando o usuário com o id = ' + user.id)
       this.userDataBase.set(user.id, user);
    }

    findById(id: number): User {
        const foundUser = this.userDataBase.get(id);
        if(!foundUser){
            throw new Error('não há cadastro de usuario com o id = ' + id);
        }
        return foundUser;
    }

    findAll(): User[] {
        if(this.userDataBase.size === 0){
            throw new Error('Nao ha usuario cadastrado');
        }
       const listUsers: User[] = [];
        for (const user of this.userDataBase.values()) {
            listUsers.push(user);  
        }
        return listUsers;
    }

    private alreadyExist(id: number): boolean {
        const foundUser = this.userDataBase.get(id);
        return foundUser !== undefined;
    }
    
}