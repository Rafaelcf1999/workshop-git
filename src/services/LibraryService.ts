import { Book } from '../entities/Book.ts';
import { User } from '../entities/User.ts';
import { Loan } from '../entities/Loan.ts';
import type { IBookRepository } from '../repositories/interfaces/IBookRepository.ts';
import type { IUserRepository } from '../repositories/interfaces/IUserRepository.ts';
import type { ILoanRepository } from '../repositories/interfaces/ILoanRepository.ts';
import type { SearchStrategy } from '../strategies/SearchStrategy.ts';

export class LibraryService {
  constructor(
    private books: IBookRepository,
    private users: IUserRepository,
    private loans: ILoanRepository,
  ) {}

  // salva uma lista de livros.
  registerBook(booksList: Book[]): void {
    try {
      for (const book of booksList) {
        this.books.save(book);
      }
    } catch (error) {
      console.error('Erro ao registrar livros: ', error);
    }
  }

  //salva uma lista de usuários.
  registerUser(usersList: User[]): void {
    try {
      for (const user of usersList) {
        this.users.save(user);
      }
    } catch (error) {
      console.error('Erro ao registrar usuários: ', error);
    }
  }

  //busca o usuário e o livro, decrementa o estoque e registra o empréstimo.
  loanBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      if (!user || !book) {
        throw new Error('Usuário ou livro não encontrado.');
      }

      book.decrease();
      this.loans.save(new Loan(user.id, book.id));
    } catch (error) {
      console.error('Erro ao realizar empréstimo: ', error);
    }
  }

  //busca o usuário e o livro, incrementa o estoque e remove o empréstimo.
  giveBackBook(userId: number, bookId: number): void {
    try {
      const user = this.users.findById(userId);
      const book = this.books.findById(bookId);

      if (!user || !book) {
        throw new Error('Usuário ou livro não encontrado.');
      }

      this.loans.remove(user.id, book.id);
      book.increase();
    } catch (error) {
      console.error('Erro ao realizar devolução: ', error);
    }
  }

  //executa a busca delegando para a estratégia recebida.
  search(strategy: SearchStrategy, query: string): Book[] {
    try {
      const allBooks = this.books.findAll();
      return strategy.search(allBooks, query);
    } catch (error) {
      console.error('Erro ao realizar busca: ', error);
      return [];
    }
  }
}
