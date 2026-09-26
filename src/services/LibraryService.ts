import Book from "../entities/Book";
import Loan from "../entities/Loan";
import User from "../entities/User";
import IBookRepository from "../repositories/interfaces/IBookRepository";
import ILoanRepository from "../repositories/interfaces/ILoanRepository";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import ISearchStrategy from "../strategies/interfaces/ISearchStrategy";

class LibraryService {
  constructor(
    private readonly books: IBookRepository,
    private readonly loans: ILoanRepository,
    private readonly users: IUserRepository,
  ) {}

  registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.books.save(book);
      }
    } catch (error) {
      console.error(error);
    }
  }

  registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.users.save(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  loanBook(bookId: number, userId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();

      this.loans.save(new Loan(user.id, book.id));
    } catch (error) {}
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.increase();
      this.loans.remove(new Loan(user.id, book.id));
    } catch (error) {
      console.error(error);
    }
  }

  search(strategy: ISearchStrategy): Book[] {
    try {
      const allBooks = this.books.findAll();
      return strategy.search(allBooks);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default LibraryService;
