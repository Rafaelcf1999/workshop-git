import { Loan } from '../entities/Loan.js';
import type { ILoanRepository } from '../repositories/interfaces/ILoanRepository.js';

export class LoanRepository implements ILoanRepository{
    private loan: Loan[] = [];

    save(loan: Loan): void{
        const lent = this.loan.some(l => l.userId === loan.userId && l.bookId === loan.bookId);
        if(lent){
            throw new Error('Book already lent to this user.');
        } else {
            this.loan.push(loan);
            return
        }
    }
    remove(loan: Loan): void {
        const index = this.loan.findIndex(l => l.userId === loan.userId && l.bookId === loan.bookId);
        if(index === -1){
            throw new Error('Loan do not founded.')
        } else {
            this.loan.splice(index, 1);
        }
    }
    findAll(): Loan[] {
        return this.loan;
    }
}