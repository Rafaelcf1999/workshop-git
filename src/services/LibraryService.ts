import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import Book from "../entities/Book.ts";
import User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";

export default class LibraryService{
    constructor(
        private bookRepository: IBookRepository,
        private loanRepository: ILoanRepository,
        private userRepository: IUserRepository,
    ){}

    registerBook(books: Book[]): void {
        try {
            books.forEach(b => this.bookRepository.save(b));
        } catch (error: any) {
            console.error("Error save book: ", error.message);
        }
    }

    registerUser(users: User[]): void {
        try{
            users.forEach(u => this.userRepository.save(u));
        } catch (error: any) {
            console.error("Error registering user: ", error.message);
        }
    }

    loanBook(userId: number, bookId: number): void {
        try{
            const user = this.userRepository.findById(userId);
            const book = this.bookRepository.findById(bookId);
            book.decrease();
            const loan = new Loan(user.id, book.id);
            this.loanRepository.save(loan);
        } catch (error: any) {
            console.error("Error creating loan: ", error.message);
        }
    }

    giveBackBook(loan: Loan): void{
        try{
            this.userRepository.findById(loan.userId);
            this.bookRepository.findById(loan.bookId).increase();
            this.loanRepository.remove(loan);
        } catch (error: any) {
            console.error("Error returning book: ", error.message);
        }
    }

    search(strategy: SearchStrategy, info: string): Book[] | undefined {
        try{
            return strategy.search(this.bookRepository.findAll(), info);
        } catch (error: any) {
            console.error("Error find books: ", error.message);
        }
    }
}