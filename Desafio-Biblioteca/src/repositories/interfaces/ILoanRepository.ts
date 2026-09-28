import Loan from "../../entities/Loan.ts";

export default interface ILoanRepository{
    save(loan: Loan): boolean;
    remove(loan: Loan): boolean;
    findAll(): Loan[]; 
}