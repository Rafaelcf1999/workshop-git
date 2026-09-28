import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";
import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";

export class LibraryService{
    constructor(private books: IBookRepository, private users: IUserRepository, private loans: ILoanRepository){}

    registerBook(bookList: Book[]): void{
        try{
            bookList.forEach(book => this.books.save(book));
        } catch(error){
            if(error instanceof Error){
                console.error("Error: ", error.message);
            } else {
                console.error("Unknown error: ", error);
            }
        }
    }

    registerUser(userList: User[]): void{
        try {
            userList.forEach(user => this.users.save(user));
        } catch (error) {
            if(error instanceof Error){
                console.error("Error: ", error.message);
            } else {
                console.error("Unknown error: ", error);
            }
        }
    }

    loanBook(userId: number, bookId: number): void{
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);
            book.decrease();
            try {
                this.loans.save(new Loan(userId, bookId));
                console.log(`Loan of book "${book.title}" successfully completed for ${user.name}`);
            } catch (loanError) {
                book.increase();
                throw loanError
            }
        } catch (error) {
            if(error instanceof Error){
                console.error("Error: ", error.message);
            } else {
                console.error("Unknown error: ", error);
            }
        }
    }

    giveBackBook(userId: number, bookId: number): void{
        try {
            const book = this.books.findById(bookId);

            this.loans.remove(userId, bookId);
            book.increase();
            console.log(`Return of book "${book.title}" successfully completed`);
        } catch (error) {
            if(error instanceof Error){
                console.error("Error: ", error.message);
            } else {
                console.error("Unknown error: ", error);
            }
        }
    }

    search(searchStrategy: SearchStrategy, term: string): Book[]{
        try {
            const allBooks = this.books.findAll();
            return searchStrategy.search(allBooks, term);
        } catch (error) {
            if(error instanceof Error){
                console.error("Error: ", error.message);
            } else {
                console.error("Unknown error: ", error);
            }
            return [];
        }
    }
}