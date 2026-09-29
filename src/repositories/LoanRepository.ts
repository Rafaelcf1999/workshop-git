import { Loan } from '../entities/Loan.ts';
import type { ILoanRepository } from './interfaces/ILoanRepository.ts';

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  //lança erro se já existir um empréstimo para a mesma combinação de userId e bookId.
  save(loan: Loan): void {
    const exists = this.loans.some(
      (item) => item.userId === loan.userId && item.bookId === loan.bookId,
    );
    if (exists) {
      throw new Error(
        `Já existe um empréstimo para o usuário com id ${loan.userId} e o livro com o id ${loan.bookId}.`,
      );
    }
    this.loans.push(loan);
  }

  //lança erro se o empréstimo não for encontrado. Remove o item do array
  remove(userId: number, bookId: number): void {
    const index = this.loans.findIndex(
      (item) => item.userId === userId && item.bookId === bookId,
    );
    if (index === -1) {
      throw new Error(
        `Empréstimo não encontrado para usuário com o ${userId} e o livro com id ${bookId}.`,
      );
    }
    this.loans.splice(index, 1);
  }

  //retorna todos os emprestimos.
  findAll(): Loan[] {
    return this.loans;
  }
}
