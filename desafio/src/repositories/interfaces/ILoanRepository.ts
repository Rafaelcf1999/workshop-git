import Loan from "../../entities/Loan";

export default interface ILoanRepository {

    save(loan: Loan): void;
    remove(loan: Loan): void;
    findAll(): Loan[];

}