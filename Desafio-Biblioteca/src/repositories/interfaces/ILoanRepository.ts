import Loan from "../../entities/Loan.ts";

export default interface ILoanRepository{
    save(userid: number, bookid: number): boolean;
    remove(userid: number, bookid: number): boolean;
    findAll(): Loan[];
}