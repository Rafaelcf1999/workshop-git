import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository
    ) {}

    public registerBook(bookList: Book[]): void {
        for (const book of bookList) {
            try {
                this.books.save(book);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(`[Cadastro de Livro] Falha ao registrar "${book.title}" (ID: ${book.id}): ${error.message}`);
                } else {
                    console.error(`[Cadastro de Livro] Erro desconhecido ao registrar "${book.title}":`, error);
                }
            }
        }
    }

    public registerUser(userList: User[]): void {
        for (const user of userList) {
            try {
                this.users.save(user);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(`[Cadastro de Usuário] Falha ao registrar "${user.name}" (ID: ${user.id}): ${error.message}`);
                } else {
                    console.error(`[Cadastro de Usuário] Erro desconhecido ao registrar "${user.name}":`, error);
                }
            }
        }
    }

    public loanBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            if (book.getQuantity() <= 0) {
            throw new Error("No copies available");
        }

            this.loans.save(new Loan(user.id, book.id));
            book.decrease();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`[Empréstimo] Falha ao realizar empréstimo (Usuário ID: ${userId}, Livro ID: ${bookId}): ${error.message}`);
            } else {
                console.error(`[Empréstimo] Erro desconhecido (Usuário ID: ${userId}, Livro ID: ${bookId}):`, error);
            }
        }
    }

    public giveBackBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            this.loans.remove(user.id, book.id);
            book.increase();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`[Devolução] Falha ao realizar devolução (Usuário ID: ${userId}, Livro ID: ${bookId}): ${error.message}`);
            } else {
                console.error(`[Devolução] Erro desconhecido (Usuário ID: ${userId}, Livro ID: ${bookId}):`, error);
            }
        }
    }

    public search(strategy: SearchStrategy, query: string): Book[] {
        try {
            const allBooks = this.books.findAll();
            return strategy.search(allBooks, query);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`[Busca] Falha ao executar busca pelo termo "${query}": ${error.message}`);
            } else {
                console.error(`[Busca] Erro desconhecido durante a busca por "${query}":`, error);
            }
        }
        return [];
    }
}