import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  constructor(
    private booksRepository: IBookRepository,
    private usersRepository: IUserRepository,
    private loansRepository: ILoanRepository
  ) {}

  public registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.booksRepository.save(book);
      }
    } catch (error: any) {
      console.error("error nenhum livro registrado:", error.message);
    }
  }

  public registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.usersRepository.save(user);
      }
    } catch (error: any) {
      console.error("error nenhum usuário registrado:", error.message);
    }
  }

  public loanBook(userId: number, bookId: number): void {
    try {
      const user = this.usersRepository.findById(userId);
      const book = this.booksRepository.findById(bookId);

      book.decrease();
      this.loansRepository.save(new Loan(user.id, book.id));
      console.log(`sucesso ao emitir empréstimo: Usuário "${user.name}" pegou emprestado "${book.title}".`);
    } catch (error: any) {
      console.error("error ao emitir empréstimo:", error.message);
    }
  }

  public giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.usersRepository.findById(userId);
      const book = this.booksRepository.findById(bookId);

      this.loansRepository.remove(user.id, book.id);
      book.increase();
      console.log(`Livro devolvido com sucesso: Usuário "${user.name}" devolveu "${book.title}".`);
    } catch (error: any) {
      console.error("error ao devolver livro:", error.message);
    }
  }

  public search(strategy: SearchStrategy, term: string): Book[] {
    try {
      const allBooks = this.booksRepository.findAll();
      return strategy.search(allBooks, term);
    } catch (error: any) {
      console.error("erro ao realizar busca:", error.message);
      return [];
    }
  }
}