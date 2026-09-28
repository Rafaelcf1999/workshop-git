import {Book} from "../entities/Book.js";
import {User} from "../entities/User.js";
import {Loan} from "../entities/Loan.js";
import type IBookRepository from "../repositories/interfaces/IBook.js";
import type IUserRepository from "../repositories/interfaces/IUser.js";
import type ILoanRepository from "../repositories/interfaces/ILoan.js";
import type ISearchStrategy from "../strategies/ISearch.js";

export default class LibraryService {
  constructor(
    private readonly books: IBookRepository,
    private readonly users: IUserRepository,
    private readonly loans: ILoanRepository
  ) {}

   registerBook(bookList: Book[]): void {
    for (const book of bookList) {
      try {
        this.books.save(book);
      } catch (error) {
        console.log(error);
      }
    }
  }

   registerUser(userList: User[]): void {
    for (const user of userList) {
      try {
        this.users.save(user);
      } catch (error) {
        console.log(error);
      }
    }
  }

   loanBook(userId: number, bookId: number): { usuario: string; titulo: string } | void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();

      const newLoan = new Loan(user.id, book.id);
      this.loans.save(newLoan);
      return {
        usuario: user.name,
        titulo : book.title
      };
    } catch (error) {
      console.error(error);
    }
  }

   BackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      this.loans.remove(userId, bookId);
      book.increase();
    } catch (error) {
      console.log(error);
    }
  }

   search(query: string, strategy: ISearchStrategy): Book[] {
    try {
      const allBooks = this.books.findAll();
      return strategy.search(allBooks, query);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}