import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    const findLoan = this.loans.find(
      (item) => item.userId === loan.userId && item.bookId === loan.bookId,
    );

    if (findLoan) {
      throw new Error("Já existe empréstimo para este livro e usuário.");
    }

    this.loans.push(loan);
  }

  remove(userId: number, bookId: number): void {
    const initialLength = this.loans.length;

    this.loans = this.loans.filter(
      (loan) => loan.userId !== userId || loan.bookId !== bookId,
    );

    if (this.loans.length === initialLength) {
      throw new Error("O empréstimo não existe.");
    }
  }

  findAll(): Loan[] {
    throw new Error("Method not implemented.");
  }
}
