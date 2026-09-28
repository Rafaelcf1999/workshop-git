import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  constructor(
    private readonly books: IBookRepository,
    private readonly users: IUserRepository,
    private readonly loans: ILoanRepository
  ) {}

  registerBook(books: Book[] | Book): void {
    try {
      const bookList = Array.isArray(books) ? books : [books];
      for (const book of bookList) {
        this.books.save(book);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  registerUser(users: User[] | User): void {
    try {
      const userList = Array.isArray(users) ? users : [users];
      for (const user of userList) {
        this.users.save(user);
      }
    } catch (error) {
      console.error((error as Error).message);
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
      console.error((error as Error).message);
    }
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      this.users.findById(userId);
      const book = this.books.findById(bookId);
      this.loans.remove(userId, bookId);
      book.increase();
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  search(strategy: SearchStrategy): Book[] {
    try {
      const allBooks = this.books.findAll();
      return strategy.search(allBooks);
    } catch (error) {
      console.error((error as Error).message);
      return [];
    }
  }
}
