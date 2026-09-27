import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";

import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts"
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts"
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts"

import type {SearchStrategy } from "../strategies/SearchStrategy.ts"

export class LibraryService {
  constructor(
    private readonly books: IBookRepository,
    private readonly users: IUserRepository,
    private readonly loans: ILoanRepository
  ) {}

  public registerBook(booksToRegister: Book[]): void {
    try {
      for (const book of booksToRegister) {
        this.books.save(book);
      }
    } catch (error) {
      console.error("Erro ao registar livro(s):", (error as Error).message);
    }
  }

  public registerUser(usersToRegister: User[]): void {
    try {
      for (const user of usersToRegister) {
        this.users.save(user);
      }
    } catch (error) {
      console.error("Erro ao registrar usuario(s)", (error as Error).message);
    }
  }

  public loanBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();
      this.loans.save(new Loan(user.id, book.id));
    } catch (error) {
      console.error("Erro ao alugar livro:", (error as Error).message);
    }
  }

  public giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.increase();
      this.loans.remove(user.id, book.id);
    } catch (error) {
      console.error("Erro ao devolver livro:", (error as Error).message);
    }
  }

  public search(strategy:SearchStrategy): Book[] {

    try{
        const allBooks = this.books.findAll();
        return strategy.search(allBooks);
    }catch(error){
        console.error("Erro ao pesquisar livro:",(error as Error).message );
        return[];
    }
  }


}