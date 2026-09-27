import type Book from "../entities/Book.ts";
import Loan from "../entities/Loan.ts";
import type User from "../entities/User.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type SearchStrategy from "../strategies/interfaces/SearchStrategy.ts";


export default class LibraryService {

    private books: IBookRepository;
    private users: IUserRepository;
    private loans: ILoanRepository;

    constructor(books: IBookRepository, users: IUserRepository, loans: ILoanRepository) {

        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    registerBook(books: Book[]): void {
        for (const book of books) {
            try {
                this.books.save(book);
            } catch (error) {
                console.error(error);
            }
        }
    }


    registerUser(users: User[]): void {
        for (const user of users) {
            try {
                this.users.save(user);
            } catch (error) {
                console.error(error);
            }
        }
    }

    loanBook(userId: number, bookId: number): void {
        try {
            this.users.findById(userId);
            const book = this.books.findById(bookId);

            const loan = new Loan(userId, bookId);

            this.loans.save(loan);
            book.decrease();

        } catch (error) {
            console.error(error);
        }

    }

    giveBackBook(userId: number, bookId: number): void {

        try {
            this.users.findById(userId);
            const book = this.books.findById(bookId);

            const loan = new Loan(userId, bookId);
            this.loans.remove(loan)
            book.increase()

        } catch (error) {
            console.error(error);
        }

    }


    search(strategy: SearchStrategy, term: string): Book[] {

        try {
            const allBooks = this.books.findAll();
            return strategy.search(allBooks, term);
        } catch (error) {
            console.error(error);
            return [];
        }

    }


}
