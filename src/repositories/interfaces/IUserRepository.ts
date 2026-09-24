import User from "#entities/User";
import BaseRepository from "#repositories/interfaces/BaseRepository";

export default interface IUserRepository extends BaseRepository<User> {}