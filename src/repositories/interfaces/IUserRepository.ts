import type User from "../../entities/User";
import type BaseRepository from "./BaseRepository";

/**
 * IUserRepository é a interface responsável por definir os métodos específicos para o repositório de usuários,
 * estendendo a interface BaseRepository para herdar os métodos básicos de um repositório.
 * @method save(objectToSave: User): User - Salva um usuário no repositório e retorna o usuário salvo.
 * @method findById(id: number): User - Busca um usuário no repositório pelo seu ID e retorna o usuário encontrado.
 * @method findAll(): User[] - Retorna todos os usuários presentes no repositório.
 */
export default interface IUserRepository extends BaseRepository<User> {}