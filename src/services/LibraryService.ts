import type { SearchStrategy } from "../strategies/SearchStrategy.ts";
import type { Book } from "../entities/Book.ts";
import type { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";

export class LibraryService {
  private books: IBookRepository;
  private users: IUserRepository;
  private loans: ILoanRepository;

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
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);
      book.decrease();
      this.loans.save(new Loan(user.id, book.id));
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
