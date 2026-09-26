import User from "../../entities/User";

interface IUserRepository {

    save(user: User): void
    findById(id: number): User
    findAll(): User[]
    
}

export default IUserRepository;