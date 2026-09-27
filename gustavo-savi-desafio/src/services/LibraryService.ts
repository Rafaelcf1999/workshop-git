import { Book } from "../entities/Book.ts";
import { Loan } from "../entities/Loan.ts";
import { User } from "../entities/User.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService {
  constructor(
    private readonly books: IBookRepository,
    private readonly users: IUserRepository,
    private readonly loans: ILoanRepository,
  ) {}

  registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.books.save(book);
        console.log(`Livro ${book.title} registrado com sucesso.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao registrar livro: ${error.message}`);
      }
    }
  }

  registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.users.save(user);
        console.log(`Usuário ${user.name} registrado com sucesso.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao registrar usuário: ${error.message}`);
      }
    }
  }

  loanBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();

      const loan = new Loan(user.id, book.id);
      this.loans.save(loan);

      console.log(`Livro ${book.title} emprestado para ${user.name}.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao realizar empréstimo: ${error.message}`);
      }
    }
  }

  giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      this.loans.remove(user.id, book.id);
      book.increase();

      console.log(`Livro ${book.title} devolvido com sucesso.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao devolver o livro: ${error.message}`);
      }
    }
  }

  search(strategy: SearchStrategy, query: string): Readonly<Book[]> {
    return strategy.search(this.books.findAll(), query);
  }
}
