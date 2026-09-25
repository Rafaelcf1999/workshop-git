/*definir save; findById; findAll; para o repositório*/
import {User} from "../../entities/User.ts";

export interface IUserRepository{

    save(user:User): void;
    findById(id:number):User;
    findAll():User[];
}