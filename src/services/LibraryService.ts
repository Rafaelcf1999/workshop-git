import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type { IBookRepository } from "../repositories/interfaces/IBookRepository.ts";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.ts";
import type { ILoanRepository } from "../repositories/interfaces/ILoanRepository.ts";
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

/**
 * Serviço orquestrador da biblioteca.
 * Depende exclusivamente das interfaces dos repositórios (Inversão de Dependências)
 * e trata exceções internamente sem propagá-las.
 */
export class LibraryService {
  private books: IBookRepository;
  private users: IUserRepository;
  private loans: ILoanRepository;

  constructor(
    books: IBookRepository,
    users: IUserRepository,
    loans: ILoanRepository
  ) {
    this.books = books;
    this.users = users;
    this.loans = loans;
  }

  /**
   * Salva uma lista de livros no repositório.
   */
  public registerBook(books: Book[]): void {
    try {
      for (const book of books) {
        this.books.save(book);
      }
    } catch (error) {
      console.error("Error registering book(s):", error);
    }
  }

  /**
   * Salva uma lista de usuários no repositório.
   */
  public registerUser(users: User[]): void {
    try {
      for (const user of users) {
        this.users.save(user);
      }
    } catch (error) {
      console.error("Error registering user(s):", error);
    }
  }

  /**
   * Busca usuário e livro, decrementa o estoque e registra o empréstimo.
   */
  public loanBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.decrease();

      const loan = new Loan(user.id, book.id);
      this.loans.save(loan);
    } catch (error) {
      console.error(
        `Error loaning book (User ID: ${userId}, Book ID: ${bookId}):`,
        error
      );
    }
  }

  /**
   * Busca usuário e livro, incrementa o estoque e remove o empréstimo.
   */
  public giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      book.increase();

      this.loans.remove(user.id, book.id);
    } catch (error) {
      console.error(
        `Error giving back book (User ID: ${userId}, Book ID: ${bookId}):`,
        error
      );
    }
  }

  /**
   * Executa a busca delegando para a estratégia de busca recebida.
   */
  public search(strategy: SearchStrategy): Book[] | undefined {
    try {
      const allBooks = this.books.findAll();
      return strategy.search(allBooks);
    } catch (error) {
      console.error("Error searching books:", error);
      return undefined;
    }
  }
}
