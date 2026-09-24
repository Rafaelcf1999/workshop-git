import User from "../entities/User.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository {
    private users: Map<number, User> = new Map<number, User>();

    save(objectToSave: User): User {
        throw new Error("Method not implemented.");
    }
    findById(id: number): User | null {
        throw new Error("Method not implemented.");
    }
    findAll(): User[] {
        throw new Error("Method not implemented.");
    }

}