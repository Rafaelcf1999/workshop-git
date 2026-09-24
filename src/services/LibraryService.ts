import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";


export default class LibraryService {
    constructor(
        private bookRepository: IBookRepository, 
        private userRepository: IUserRepository, 
        private loanRepository: ILoanRepository) {}

    registerBook(): void {}
    registerUser(): void {}
    loanBook(): void {}
    givenBackBook(): void {}
    searchBook(): void {} // pensar no padrão strategy
        
}