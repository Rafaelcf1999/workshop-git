import { Loan } from "../entities/Loan.ts";
import type { Book } from "../entities/Book.ts";
import type { User } from "../entities/User.ts";
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

  registerBook(books: Book[]): void {
    try {
      books.forEach((book) => this.books.save(book));
    } catch (error) {
      this.handleError(error);
    }
  }

  registerUser(users: User[]): void {
    try {
      users.forEach((user) => this.users.save(user));
    } catch (error) {
      this.handleError(error);
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();
      try {
        this.loans.save(new Loan(userId, bookId));
      } catch (error) {
        book.increase();
        throw error;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);

      this.loans.remove(new Loan(userId, bookId));
      book.increase();
    } catch (error) {
      this.handleError(error);
    }
  }

  search(strategy: SearchStrategy): Book[] {
    try {
      return strategy.search(this.books.findAll());
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  private handleError(error: unknown): void {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Erro desconhecido");
    }
  }
}