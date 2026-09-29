import { Book } from "../entities/book.entity.ts";
import { Loan } from "../entities/loan.entity.ts";
import { User } from "../entities/user.entity.ts";
import type { IBookRepository } from "../repositories/interfaces/book.interface.ts";
import type { ILoanRepository } from "../repositories/interfaces/loan.interface.ts";
import type { IUserRepository } from "../repositories/interfaces/user.interface.ts";
import type { SearchStrategy } from "../strategies/search.strategy.ts";

export class LibraryService {
  constructor(
    private readonly book: IBookRepository,
    private readonly user: IUserRepository,
    private readonly loan: ILoanRepository,
  ) { }

  registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.book.save(book);
      }
    } catch (error) {
      console.error(error);
    }
  }

  registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.user.save(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      const user = this.user.findById(userId);
      const book = this.book.findById(bookId);

      const loan = new Loan(user.id, book.id)

      book.decrease();
      try {
        this.loan.save(loan);
      } catch (error) {
        book.increase();
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.user.findById(userId);
      const book = this.book.findById(bookId);

      this.loan.remove(new Loan(user.id, book.id));

      book.increase();
    } catch (error) {
      console.error(error);
    }
  }

  search(searchStrategy: SearchStrategy, keyword: string): Book[] | undefined {
    try {
      const books = this.book.findAll();

      return searchStrategy.search(books, keyword);
    } catch (error) {
      console.error(error);
    }
  }
}
