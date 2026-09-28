import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import Book from "../entities/Book.ts";
import User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";


export default class LibraryService {

    private books: IBookRepository;
    private users: IUserRepository;
    private loans: ILoanRepository;

    constructor(books: IBookRepository, users: IUserRepository, loans: ILoanRepository) {
        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    registerBook(books: Book[]) {
        for (let book of books) {
            try {
                this.books.save(book);
                console.log(`Book: ${book.title} registered successfully!`);
            } catch (error) {
                return console.error(error);
            }
        }

    }

    registerUser(users: User[]) {
        for (let user of users) {
            try {
                this.users.save(user);
                console.log(`User: ${user.name} registered successfully!`);
            } catch (error) {
                return console.error(error);
            }
        }

    }

    loanBook(userId: number, bookId: number) {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            book.decrease();

            const loan = new Loan(userId, bookId);
            this.loans.save(loan);


            return console.log(`Loan Completed! ${user.name} borrowed ${book.title}`);

        } catch (error) {
            return console.error(error);
        }

    }

    giveBackBook(userId: number, bookId: number) {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            const loan = new Loan(userId, bookId);
            this.loans.remove(loan);

            book.increase();
            return console.log(`Return Completed! ${user.name} returned ${book.title}`);

        } catch (error) {
            return console.error(error);
        }


    }

    search(strategy: SearchStrategy, value: string) {
        const book = this.books.findAll();
        return strategy.search(book, value);
    }
}