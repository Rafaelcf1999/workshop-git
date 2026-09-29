import type Book from "../entities/Book.js";
import Loan from "../entities/Loan.js";
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

    loanBook(bookId: number, userId: number) {
        try{
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);
            
            book.decrease();

            const loan = new Loan(user.id, book.id);
            this.loans.save(loan);

        } catch(error){
            if(error instanceof Error){
                console.log(error.message);
            }
        }
    }

    giveBackBook(bookId: number, userId: number): void {
        try{
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            const loan = new Loan(user.id, book.id);

            this.loans.remove(loan);
            book.increase();

        } catch(error){
            if(error instanceof Error){
                console.log(error.message);
            }
        }
    }
}