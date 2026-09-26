import Loan from "../entities/Loan";
import ILoanRepository from "./interfaces/ILoanRepository";

export default class LoanRepository implements ILoanRepository {

    private loansDataBase: Loan[] = [];

    save(loan: Loan): void {
        if(this.existLoan(loan)){
            throw new Error('Este emprestimo ja existe')
        }
        this.loansDataBase.push(loan);
    }

    remove(loan: Loan): void {
        if(!this.existLoan(loan)){
            throw new Error('Nao existe este emprestimo');
        }
        let index = this.loansDataBase.indexOf(loan);
        this.loansDataBase.splice(index, 1);
    }

    findAll(): Loan[] {
        if(this.loansDataBase.length === 0){
            throw new Error('Nao existe nenhum emprestimo para ser retornado');
        }
        return this.loansDataBase;
    }

    private existLoan(loan: Loan): boolean {
        for (const loanAux of this.loansDataBase) {
            if ((loan.bookId === loanAux.bookId) && (loan.userId === loanAux.userId)) { 
                return true;
            }
        }
        return false;
    }
    
}