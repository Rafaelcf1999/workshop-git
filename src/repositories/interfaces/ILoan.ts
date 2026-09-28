import {Loan} from "../../entities/Loan.js";

export default interface ILoanRepository {
    
    save(Loan: Loan): void;
    remove(Userid: number): void;
    findAll(): Loan[]
    
}