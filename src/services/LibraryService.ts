import type { Book } from "../entities/Book.ts";
import { Loan } from "../entities/Loan.ts";
import type { User } from "../entities/User.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  constructor(
    private books: IBookRepository,
    private users: IUserRepository,
    private loans: ILoanRepository,
  ) {}

  public registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.books.save(book);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.users.save(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public loanBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);
      book.decrease();

      try {
        this.loans.save(new Loan(userId, bookId));
      } catch (error) {
        // Restaura o estoque se o empréstimo não puder ser registrado.
        book.increase();
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public giveBackBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);
      book.increase();

      try {
        this.loans.remove(userId, bookId);
      } catch (error) {
        // Restaura o estoque se não houver empréstimo para devolver.
        book.decrease();
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public search(strategy: SearchStrategy, query: string): Book[] {
    try {
      return strategy.search(this.books.findAll(), query);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
