import type Loan from '../entities/Loan.ts';
import type { ILoanRepository } from './interfaces/ILoanRepository.ts';

export default class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    if (
      this.loans.some(
        (ev) => ev.userId === loan.userId && ev.bookId === loan.bookId,
      )
    ) {
      throw new Error('You already have a loan.');
    }
    this.loans.push(loan);
  }
  remove(userId: number, bookId: number): void {
    if (this.loans.some((ev) => ev.userId === userId && ev.bookId === bookId)) {
      this.loans = this.loans.filter(
        (ev) => !(ev.userId === userId && ev.bookId === bookId),
      );
    } else {
      throw new Error('There is no loan of this book to this user.');
    }
  }
  findAll(): Loan[] {
    return [...this.loans];
  }
}
