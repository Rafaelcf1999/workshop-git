//deve definir os contratos: save(retorno void), findById(retorna o usuário correspondente), findAll(retorna uma lista de todos os usuários)

import { User } from "../../entities/User.ts";

export interface IUserRepository{
    save(user: User): void;
    findById(id: number): User;
    findAll(): User[];
}