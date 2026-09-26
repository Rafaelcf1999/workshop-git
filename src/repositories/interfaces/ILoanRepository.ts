import Loan from "../../entities/Loan";

interface ILoanRepository{
    save(loan:Loan): void
    remove(loan:Loan): void
    findAll(): Loan[]
}

export default ILoanRepository;