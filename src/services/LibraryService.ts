import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  constructor(
    private books: IBookRepository,
    private users: IUserRepository,
    private loans: ILoanRepository
  ) {}

  registerBook(bookList: Book[]): void {
    try {
      bookList.forEach((book) => this.books.save(book));
    } catch (error) {
      console.error(error);
    }
  }

  registerUser(userList: User[]): void {
    try {
      userList.forEach((user) => this.users.save(user));
    } catch (error) {
      console.error(error);
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);
      book.decrease();
      this.loans.save(new Loan(user.id, book.id));
    } catch (error) {
      console.error(error);
    }
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);
      book.increase();
      this.loans.remove(user.id, book.id);
    } catch (error) {
      console.error(error);
    }
  }

  search(strategy: SearchStrategy, criteria: string): Book[] {
    try {
      const allBooks = this.books.findAll();
      return strategy.search(allBooks, criteria);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}