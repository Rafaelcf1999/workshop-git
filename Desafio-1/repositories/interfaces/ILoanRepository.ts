import { Loan } from "../../entities/Loan.ts";

export interface ILoanRepository {
    save(loan: Loan): void;
    remove(userId: number, bookId: number): void;
    findAll(): Loan[];
}