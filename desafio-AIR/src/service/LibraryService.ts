import type Book from "../entities/Book.js";
import type User from "../entities/User.js";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.js";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.js";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.js";

export default class LibraryService {

    constructor(
        private books: IBookRepository, 
        private users: IUserRepository, 
        private loans: ILoanRepository
    ){}

    registerBook(...listBooks: Book[]): void {
        for (const book of listBooks) {
            try{
                this.books.save(book);
                
            } catch(error){
                if(error instanceof Error){
                    console.log(error.message);
                }
            }   
        }
    }

    registerUsers(...listUsers: User[]): void {
        for (const user of listUsers) {
            try{
                this.users.save(user);

            } catch(error){
                if(error instanceof Error){
                    console.log(error.message);
                }
            }
        }
    }
}