import type { Book } from "../entities/Book.ts";
import type { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  constructor(
    private readonly books: IBookRepository,
    private readonly users: IUserRepository,
    private readonly loans: ILoanRepository,
  ) {}

  public registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.books.save(book);
      }
    } catch (error: unknown) {
      console.error(this.getErrorMessage(error));
    }
  }

  public registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.users.save(user);
      }
    } catch (error: unknown) {
      console.error(this.getErrorMessage(error));
    }
  }

  public loanBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();

      try {
        this.loans.save(new Loan(user.id, book.id));
      } catch (error: unknown) {
        // Keeps the domain state consistent if the loan cannot be registered.
        book.increase();
        throw error;
      }

      console.log(`Loan created: "${book.title}" -> ${user.name}`);
    } catch (error: unknown) {
      console.error(this.getErrorMessage(error));
    }
  }

  public giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      this.loans.remove(user.id, book.id);
      book.increase();

      console.log(`Book returned: "${book.title}" by ${user.name}`);
    } catch (error: unknown) {
      console.error(this.getErrorMessage(error));
    }
  }

  public search(strategy: SearchStrategy): Book[] {
    try {
      const books = this.books.findAll();
      return strategy.search(books);
    } catch (error: unknown) {
      console.error(this.getErrorMessage(error));
      return [];
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown error";
  }
}