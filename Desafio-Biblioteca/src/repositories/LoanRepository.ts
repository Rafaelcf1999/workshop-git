import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository {

    private loans: Loan[] = [];

    save(loan: Loan): boolean {

        for(let oneloan of this.loans){
             if (oneloan.userId === loan.userId && oneloan.bookId === loan.bookId) {
                throw new Error(`User ${loan.userId} has already borrowed book ${loan.bookId}.`);
            }
        }

        this.loans.push(loan);
        return true;

    }

    remove(loan: Loan): boolean {

        let loancount = 0;

        for (let oneloan of this.loans) {
            if (oneloan.userId === loan.userId && oneloan.bookId === loan.bookId) {
                this.loans.splice(loancount, 1);
                return true;
            }

            loancount++;
        }

        throw new Error(`User ${loan.userId} has not borrowed book ${loan.bookId}`)
      
    }

    findAll(): Loan[] {
        return this.loans;
    }

}

