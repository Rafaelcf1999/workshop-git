import type User from "../../entities/User";
import type BaseRepository from "./BaseRepository";

export default interface IUserRepository extends BaseRepository<User> {}