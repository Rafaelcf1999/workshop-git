import type { Book } from "../entities/Book.ts";
import { Loan } from "../entities/Loan.ts";
import type { User } from "../entities/User.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  private readonly books: IBookRepository;
  private readonly users: IUserRepository;
  private readonly loans: ILoanRepository;

  constructor(
    books: IBookRepository,
    users: IUserRepository,
    loans: ILoanRepository,
  ) {
    this.books = books;
    this.users = users;
    this.loans = loans;
  }

  public registerBook(books: Book[]): void {
    try {
      books.forEach((book) => this.books.save(book));
    } catch (error: unknown) {
      this.showError(error);
    }
  }

  public registerUser(users: User[]): void {
    try {
      users.forEach((user) => this.users.save(user));
    } catch (error: unknown) {
      this.showError(error);
    }
  }

  public loanBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();

      try {
        this.loans.save(new Loan(userId, bookId));
      } catch (error: unknown) {
        book.increase();
        throw error;
      }
    } catch (error: unknown) {
      this.showError(error);
    }
  }

  public giveBackBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);

      this.loans.remove(userId, bookId);
      book.increase();
    } catch (error: unknown) {
      this.showError(error);
    }
  }

  public search(strategy: SearchStrategy, searchTerm: string): Book[] {
    try {
      return strategy.search(this.books.findAll(), searchTerm);
    } catch (error: unknown) {
      this.showError(error);
      return [];
    }
  }

  private showError(error: unknown): void {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }

    console.error(error);
  }
}
