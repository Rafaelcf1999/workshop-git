import type Loan from "../../entities/Loan.ts";

export default interface ILoanRepository{
    save(loan: Loan): void;
    remove(userId: number, bookId: number): void;
    findAll(): Loan[];
}
