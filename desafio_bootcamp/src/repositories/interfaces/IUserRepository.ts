import {User} from "../../entities/User.ts";
import type { IRepository } from './IRepository.ts';

export interface IUserRepository extends IRepository<User> {
    
    findById(userId:number):User;
}