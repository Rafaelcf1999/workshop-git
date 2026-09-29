import type Book from '../entities/Book.ts';
import type User from '../entities/User.ts';
import Loan from '../entities/Loan.ts';
import type IBookRepository from '../repositories/interfaces/IBookRepository.ts';
import type IUserRepository from '../repositories/interfaces/IUserRepository.ts';
import type ILoanRepository from '../repositories/interfaces/ILoanRepository.ts';
import type SearchStrategy from '../strategies/SearchStrategy.ts';

export default class LibraryService {
  private bookRepository: IBookRepository;
  private userRepository: IUserRepository;
  private loanRepository: ILoanRepository;

  constructor(
    bookRepository: IBookRepository,
    userRepository: IUserRepository,
    loanRepository: ILoanRepository
  ) {
    this.bookRepository = bookRepository;
    this.userRepository = userRepository;
    this.loanRepository = loanRepository;
  }

  registerBook(books: Book[]): void {
    for (const book of books) {
      try {
        this.bookRepository.save(book);
      } catch (error) {
        console.error(error);
      }
    }
  }

  registerUser(users: User[]): void {
    for (const user of users) {
      try {
        this.userRepository.save(user);
      } catch (error) {
        console.error(error);
      }
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      const user = this.userRepository.findById(userId);
      const book = this.bookRepository.findById(bookId);

      book.decrease();

      const loan = new Loan(user.id, book.id);

      try {
        this.loanRepository.save(loan);
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
      const user = this.userRepository.findById(userId);
      const book = this.bookRepository.findById(bookId);

      const loan = new Loan(user.id, book.id);

      this.loanRepository.remove(loan);
      book.increase();
    } catch (error) {
      console.error(error);
    }
  }

  search(strategy: SearchStrategy, query: string): Book[] {
    try {
      const allBooks = this.bookRepository.findAll();
      return strategy.search(allBooks, query);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}