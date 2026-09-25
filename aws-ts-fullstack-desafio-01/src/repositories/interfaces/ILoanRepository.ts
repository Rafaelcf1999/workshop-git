import type Loan from "../../entities/Loan.ts";

export default interface ILoanRepository {
    save(loan: Loan): void;
    remove(loan: Loan): void;
    findAll(): Loan[];
}