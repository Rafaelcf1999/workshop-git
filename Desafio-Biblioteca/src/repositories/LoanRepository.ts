import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository {

    public loans: Loan[] = [];

    save(userid: number, bookid: number): boolean {

        for (let loan of this.loans) {
            if (loan.userId === userid && loan.bookId === bookid) {
                return false
            }
        }

        this.loans.push(new Loan(userid, bookid));
        return true;
    }

    remove(userid: number, bookid: number): boolean {

        let loancount = 0;

        for (let loan of this.loans) {
            if (loan.userId === userid && loan.bookId === bookid) {
                this.loans.splice(loancount, 1);
                return true;
            }

            loancount++;
        }

        return false
    }

    findAll(): Loan[] {
        return Array.from(this.loans.values());
    }

}

