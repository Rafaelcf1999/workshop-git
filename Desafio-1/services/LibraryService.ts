import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
    constructor(
        private books: IBookRepository,
        private users: IUserRepository,
        private loans: ILoanRepository
    ) {}

    public registerBook(bookList: Book[]): void {
        bookList.forEach(book => {
            try {
                this.books.save(book);
            } catch (error) {
                console.error(`Erro ao registrar livro:`, (error as Error).message);
            }
        });
    }

    public registerUser(userList: User[]): void {
        userList.forEach(user => {
            try {
                this.users.save(user);
            } catch (error) {
                console.error(`Erro ao registrar usuário:`, (error as Error).message);
            }
        });
    }

    public loanBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);
            
            book.decrease();
            this.loans.save(new Loan(user.id, book.id));
            console.log(`Empréstimo realizado: Livro "${book.title}" para ${user.name}`);
        } catch (error) {
            console.error(`Erro no empréstimo:`, (error as Error).message);
        }
    }

    public giveBackBook(userId: number, bookId: number): void {
        try {
            const user = this.users.findById(userId);
            const book = this.books.findById(bookId);

            this.loans.remove(user.id, book.id);
            book.increase();
            console.log(`Devolução realizada: Livro "${book.title}" por ${user.name}`);
        } catch (error) {
            console.error(`Erro na devolução:`, (error as Error).message);
        }
    }

    public search(strategy: SearchStrategy): void {
        try {
            const allBooks = this.books.findAll();
            const results = strategy.search(allBooks);
            console.log("Resultados da busca:", results.length > 0 ? results : "Nenhum livro encontrado");
        } catch (error) {
            console.error(`Erro na busca:`, (error as Error).message);
        }
    }
}