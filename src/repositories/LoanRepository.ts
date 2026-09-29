import type { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private readonly loans: Loan[] = [];

  public save(loan: Loan): void {
    const exists = this.loans.some(
      (savedLoan) =>
        savedLoan.userId === loan.userId && savedLoan.bookId === loan.bookId,
    );

    if (exists) {
      throw new Error(
        `Loan for user ${loan.userId} and book ${loan.bookId} already exists`,
      );
    }

    this.loans.push(loan);
  }

  public remove(userId: number, bookId: number): void {
    const index = this.loans.findIndex(
      (loan) => loan.userId === userId && loan.bookId === bookId,
    );

    if (index === -1) {
      throw new Error(`Loan for user ${userId} and book ${bookId} not found`);
    }

    this.loans.splice(index, 1);
  }

  public findAll(): Loan[] {
    return [...this.loans];
  }
}
