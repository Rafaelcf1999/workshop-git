import User from "../entities/User.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository {

    private users: Map<number, User> = new Map<number, User>();

    /**
     * Salva um usuário no repositório.
     * @param objectToSave O usuário a ser salvo.
     * @returns O usuário salvo.
     * @throws Error se o id do usuário já cadastrado existir.
     */
    save(objectToSave: User): User {
        const userAlreadyExists = this.users.get(objectToSave.id);
        if (userAlreadyExists) throw new Error("User already registered.");
        this.users.set(objectToSave.id, objectToSave);
        return objectToSave;
    }
    /**
     * Busca um usuário pelo ID no repositório.
     * @param id O ID do usuário a ser buscado.
     * @returns O usuário encontrado.
     * @throws Error se o usuário não for encontrado.
     */
    findById(id: number): User {
        const user = this.users.get(id);
        if (!user) throw new Error("User not found.");
        return user;
    }
    /**
     * Retorna todos os usuários cadastrados no repositório.
     * @returns Um array contendo todos os usuários.
     * @throws Error se não houver usuários cadastrados.
     */
    findAll(): User[] {
        const allUsers: User[] = Array.from(this.users.values());
        if (allUsers.length === 0) throw new Error("No users registered.");
        return allUsers;
    }
}