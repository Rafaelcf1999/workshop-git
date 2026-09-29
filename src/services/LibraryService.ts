import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {

    private books: IBookRepository;
    private users: IUserRepository;
    private loans: ILoanRepository;

    constructor(
        books: IBookRepository,
        users: IUserRepository,
        loans: ILoanRepository
    ) {
        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    public registerBook(booksList: Book[]): void {
        try {
        booksList.forEach(book => this.books.save(book));
        console.log("Livros registrados com sucesso.");
        } catch (error) {
        console.error(error);
        }
    }

    public registerUser(usersList: User[]): void {
        try {
        usersList.forEach(user => this.users.save(user));
        console.log("Usuários registrados com sucesso.");
        } catch (error) {
        console.error(error);
        }
    }

    public loanBook(userId: number, bookId: number): void {
        try {
        const user = this.users.findById(userId);
        const book = this.books.findById(bookId);
        
        book.decrease();
        this.loans.save(new Loan(user.id, book.id));
        console.log(`Livro "${book.title}" emprestado para ${user.name}.`);
        } catch (error) {
        console.error(error);
        }
    }

    public giveBackBook(userId: number, bookId: number): void {
        try {
        const user = this.users.findById(userId);
        const book = this.books.findById(bookId);
        
        book.increase();
        this.loans.remove(user.id, book.id);
        console.log(`Livro "${book.title}" devolvido por ${user.name}.`);
        } catch (error) {
        console.error(error);
        }
    }

    public search(strategy: SearchStrategy): void {
        try {
        const allBooks = this.books.findAll();
        const results = strategy.search(allBooks);
        console.log("Resultados da pesquisa:", results);
        } catch (error) {
        console.error(error);
        }
    }
}