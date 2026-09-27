import {Loan} from "../../entities/Loan.ts";

export interface ILoanRepository {
    save(loan:Loan):void;
    remove(userId: number, LoanId: number): void;
    findAll(): Loan[];
}
