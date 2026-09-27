import type IUserRepository from "./interfaces/IUserRepository.ts";
import User from "../entities/User.ts";

export default class UserRepository implements IUserRepository {

    public users = new Map<number, User>();
    
    save(user: User): boolean {
        /*for (let [userid] of this.users) {
            if (userid === user.id) {
                return false;
            }
        }*/

        if(this.users.has(user.id)){
            return false;
        }

        this.users.set(user.id, user);
        return true;
    }

    findById(id: number) {
        /*for (let [userid] of this.users) {
            if (userid === id) {
                return this.users.get(id);
            }
        }*/

        return this.users.get(id);
    }

    findAll(): User[] {
        return Array.from(this.users.values());
    }

}