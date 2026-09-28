import type { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  public save(loan: Loan): void {
    const alreadyExists = this.loans.some(
      (item) => item.userId === loan.userId && item.bookId === loan.bookId,
    );

    if (alreadyExists) {
      throw new Error("Loan already exists");
    }

    this.loans.push(loan);
  }

  public remove(userId: number, bookId: number): void {
    const index = this.loans.findIndex(
      (loan) => loan.userId === userId && loan.bookId === bookId,
    );

    if (index === -1) {
      throw new Error("Loan not found");
    }

    this.loans.splice(index, 1);
  }

  public findAll(): Loan[] {
    return [...this.loans];
  }
}
