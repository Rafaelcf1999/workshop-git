import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    const exists = this.loans.some(
      (l) => l.userId === loan.userId && l.bookId === loan.bookId
    );
    if (exists) {
      throw new Error("Loan already exists");
    }
    this.loans.push(loan);
  }

  remove(userId: number, bookId: number): void {
    const index = this.loans.findIndex(
      (l) => l.userId === userId && l.bookId === bookId
    );
    if (index === -1) {
      throw new Error("Loan not found");
    }
    this.loans.splice(index, 1);
  }

  findAll(): Loan[] {
    return this.loans;
  }
}