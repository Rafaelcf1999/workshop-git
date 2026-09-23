import { Book } from "../entities/Book.ts";
import { Loan } from "../entities/Loan.ts";
import { User } from "../entities/User.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";

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
      if (error instanceof Error) {
        console.error(`Erro registrar usuários: ${error.message}`);
      }
    }
  }

  registerUser(users: User[]): void {
    try {
      users.forEach((user) => {
        this.users.save(user);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro registrar usuários: ${error.message}`);
      }
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      const findUser = this.users.findById(userId);
      const findBook = this.books.findById(bookId);

      findBook.decrease();

      const loan = new Loan(findUser.id, findBook.id);

      this.loans.save(loan);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao realizar empréstimo: ${error.message}`);
      }
    }
  }

  giveBackBook(userId: number, bookId: number): void {}

  search() {} // delegar para a estratégia
}
