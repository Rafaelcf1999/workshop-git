import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";

import type Book from "../entities/Book.ts";
import type User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";

export default class LibraryService {

    constructor(
        private readonly books: IBookRepository,
        private readonly users: IUserRepository,
        private readonly loans: ILoanRepository,
    ) {}

    registerBook(bookList: Book[]): void {
        for (const book of bookList) {
            try {
                this.books.save(book)
            } catch (error) {
                this.logError(error)
            }
        }
    }

    registerUser(userList: User[]): void {
        for (const user of userList) {
            try {
                this.users.save(user)
            } catch (error) {
                this.logError(error)
            }
        }
    }

    loanBook(userId: number, bookId: number): void {
        try {
            this.users.findById(userId);
            const book = this.books.findById(bookId)

            book.decrease()
            try {
                this.loans.save(new Loan(userId, bookId));
            } catch (error) {
                book.increase()
                this.logError(error)
            }
        } catch (error) {
            this.logError(error)
        }
    }

    giveBackBook(userId: number, bookId: number): void {
        try {
            this.users.findById(userId)
            const book = this.books.findById(bookId);

            book.increase()
            try {
                this.loans.remove(new Loan(userId, bookId));
            } catch (error) {
                book.decrease()
                this.logError(error)
            }
        } catch (error) {
            this.logError(error)
        }
    }

    search(strategy: SearchStrategy): Book[] {
        try {
            return strategy.search(this.books.findAll());
        } catch (error) {
            this.logError(error)
            return [];
        }
    }

    private logError(error: unknown): void {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}