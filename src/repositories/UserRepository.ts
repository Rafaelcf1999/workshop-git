import type {IUserRepository} from '../repositories/interfaces/IUserRepository.ts';
import {User} from '../entities/User.ts';

export class UserRepository implements IUserRepository{
    private users = new Map<number, User>();

    save(user: User): void{
        if(this.users.has(user.id)){
            throw new Error('Already exists a user with this Id saved.')
        } else {
            this.users.set(user.id, user);
            return
        }
    }
    findById(id: number): User | undefined {
        if(this.users.get(id) === undefined){
            throw new Error('User do not founded.');
        } else {
            return this.users.get(id);
        }
    }
    findAll(): User[]{
        if(this.users.size <= 0){
            throw new Error('Do not have users registered.')
        } else {
            return [...this.users.values()];
        }
    }
}