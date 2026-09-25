import { Book } from '../entities/Book.js'
import { User } from '../entities/User.js'
import { Loan } from '../entities/Loan.js'
import type { IBookRepository } from '../repositories/interfaces/IBookRepository.js'
import type { IUserRepository } from '../repositories/interfaces/IUserRepository.js'
import type { ILoanRepository } from '../repositories/interfaces/ILoanRepository.js'
import type { SearchStrategy } from '../strategies/SearchStrategy.js'

export class LibraryService {
    
    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository
    ) {}

    registerBook(books: Book[]): void {
        try {
            for (const book of books){
                this.books.save(book);
            }
            console.log(`${books.length} books registered successfully`);
        } catch (error) {
            if (error instanceof Error) { // verifica se o erro é uma instância da classe Error
                console.error(`Error registering books: ${error.message}`);
            }
        }
    }

    registerUser(users: User[]): void {
        try {
            for (const user of users) {
                this.users.save(user);
            }
            console.log(`${users.length} user(s) registered successfully.`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error registering users: ${error.message}`);
            }
        }
    }

    loanBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            book.decrease();
    
            const loan = new Loan(user.id, book.id);
            this.loans.save(loan);
    
            console.log(`Loan registered successfully for user ${user.name} and book ${book.title}.`);

        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error registering loan: ${error.message}`);
            }
        }
    }

    giveBackBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            this.loans.remove(user.id, book.id);
            book.increase();

            console.log(`Return registered: User ${user.name} returned ${book.title}.`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error processing return: ${error.message}`);
            }

        }
    }

    search(strategy: SearchStrategy): Book[] {
        try {
            const allBooks = this.books.findAll();

            return strategy.search(allBooks);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error searching books: ${error.message}`);
            }
            return [];
        }
    }

}