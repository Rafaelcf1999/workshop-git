import type Book from '../entities/Book.ts';
import Loan from '../entities/Loan.ts';
import type User from '../entities/User.ts';
import type { IBookRepository } from '../repositories/interfaces/IBookRepository.ts';
import type { ILoanRepository } from '../repositories/interfaces/ILoanRepository.ts';
import type { IUserRepository } from '../repositories/interfaces/IUserRepository.ts';
import type SearchStrategy from '../strategies/SearchStrategy.ts';

export default class LibraryService {
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

  registerBook(book: Book[]): void {
    try {
      book.forEach((ev) => this.books.save(ev));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  registerUser(user: User[]): void {
    try {
      user.forEach((ev) => this.users.save(ev));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);
      this.loans.save(new Loan(userId, bookId));
      book.decrease();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);
      this.loans.remove(userId, bookId);
      book.increase();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  search(value: string, method: SearchStrategy): Book[] {
    try {
      return method.search(value, this.books.findAll());
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return [];
    }
  }
}
