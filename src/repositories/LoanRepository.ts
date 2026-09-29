import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  public save(loan: Loan): void {
    const exists = this.loans.some(
      (l) => l.userId === loan.userId && l.bookId === loan.bookId
    );
    if (exists) {
      throw new Error(`Loan already exists for userId ${loan.userId} and bookId ${loan.bookId}.`);
    }
    this.loans.push(loan);
  }

  public remove(userId: number, bookId: number): void {
    const index = this.loans.findIndex(
      (l) => l.userId === userId && l.bookId === bookId
    );
    if (index === -1) {
      throw new Error(`Loan not found for userId ${userId} and bookId ${bookId}.`);
    }
    this.loans.splice(index, 1);
  }

  public findAll(): Loan[] {
    return this.loans;
  }

  public findByUserId(userId: number): Loan[] {
    return this.loans.filter((loan) => loan.userId === userId);
  }
}