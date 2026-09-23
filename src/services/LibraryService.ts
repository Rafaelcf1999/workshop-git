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

  registerBook(
    id: number,
    title: string,
    author: string,
    category: string,
    quantity: number,
  ): void {
    try {
      const book = new Book(id, title, author, category, quantity);

      this.books.save(book);
      console.log("Livro ok"); // pra teste
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro registrar livros: ${error.message}`);
      }
    }
  }

  registerUser(id: number, name: string): void {
    try {
      const user = new User(id, name);

      this.users.save(user);
      console.log("Usuário ok"); // pra teste
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
      console.log("Livro emprestado."); // pra teste
      console.log(this.loans.findAll()); // pra teste
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao realizar empréstimo: ${error.message}`);
      }
    }
  }

  giveBackBook(userId: number, bookId: number): void {}

  search() {} // delegar para a estratégia
}
