import {Loan} from "../../entities/Loan.js";

export default interface ILoanRepository {
    
    save(Loan: Loan): Loan;
    remove(Userid: number, BookId: number): void;
    findAll(): Loan[]
    
}