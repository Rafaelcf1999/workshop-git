import Book from "../entities/Book.ts";
import User from "../entities/User.ts";
import Loan from "../entities/Loan.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IBookSearchStrategy from "../strategies/interfaces/IBookSearchStrategy.ts";

export default class LibraryService {
    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository
    ) {}

    public registerBook(booksToSave: Book[]): void {
        try {
            if (booksToSave.length === 0) {
                throw new Error("A lista de livros está vazia. Nenhum livro foi cadastrado.");
            }

            for (const book of booksToSave) {
                const exists = this.books.findById(book.id);
                if (exists) {
                    throw new Error(`Livro ID ${book.id} já existe.`);
                }
                this.books.save(book);
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    public registerUser(usersToSave: User[]): void {
        try {
            if (usersToSave.length === 0) {
                throw new Error("A lista de usuários está vazia. Nenhum usuário foi cadastrado.");
            }

            for (const user of usersToSave) {
                const exists = this.users.findById(user.id);
                if (exists) {
                    throw new Error(`Usuário ID ${user.id} já existe.`);
                }
                this.users.save(user);
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    public loanBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            if (!user) {
                throw new Error(`Usuário ID ${userId} não encontrado.`);
            }

            const book = this.books.findById(bookId);
            if (!book) {
                throw new Error(`Livro ID ${bookId} não encontrado.`);
            }

            book.decrease();

            const loan = new Loan(userId, bookId);
            this.loans.save(loan);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    public giveBackBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            if (!user) {
                throw new Error(`Usuário ID ${userId} não encontrado.`);
            }

            const book = this.books.findById(bookId);
            if (!book) {
                throw new Error(`Livro ID ${bookId} não encontrado.`);
            }

            const activeLoan = this.loans.findAll().find(
                loan => loan.userId === userId && loan.bookId === bookId
            );

            if (!activeLoan) {
                throw new Error(`Devolução inválida: O usuário ID ${userId} não possui o livro ID ${bookId}.`);
            }

            book.increase();
            this.loans.remove(userId, bookId);
            
        } catch (error: any) {
            console.error(error.message);
        }
    }

    public search(strategy: IBookSearchStrategy, query: string): Book[] {
        try {
            const allBooks = this.books.findAll();
            const results = strategy.search(allBooks, query);

            if (results.length === 0) {
                console.log(`Nenhum resultado encontrado para a busca: "${query}".`);
            }

            return results;
        } catch (error: any) {
            console.error(error.message);
            return [];
        }
    }
}