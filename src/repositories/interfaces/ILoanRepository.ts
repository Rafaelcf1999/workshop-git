import type {Loan} from "../../entities/Loan.js";

export interface ILoanRepository{
    save(loan: Loan): void;
    remove(userId: number, bookId: number): void;
    findAll(): Loan[];
}