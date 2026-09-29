import type Loan from '../entities/Loan.ts';
import type ILoanRepository from './interfaces/ILoanRepository.ts';

export default class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    for (let i = 0; i < this.loans.length; i++) {
      const currentLoan = this.loans[i];
      if (currentLoan.userId === loan.userId && currentLoan.bookId === loan.bookId) {
        throw new Error('Loan already exists for this user and book combination.');
      }
    }
    this.loans.push(loan);
  }

  remove(loan: Loan): void {
    let foundIndex = -1;
    for (let i = 0; i < this.loans.length; i++) {
      if (this.loans[i].userId === loan.userId && this.loans[i].bookId === loan.bookId) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1) {
      throw new Error('Loan not found.');
    }

    const updatedLoans: Loan[] = [];
    for (let i = 0; i < this.loans.length; i++) {
      if (i !== foundIndex) {
        updatedLoans.push(this.loans[i]);
      }
    }
    this.loans = updatedLoans;
  }

  findAll(): Loan[] {
    if (this.loans.length === 0) {
      throw new Error('No loans registered in the system.');
    }
    return this.loans;
  }
}
