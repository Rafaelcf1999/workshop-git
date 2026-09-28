import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";

export default class LoanRepository implements ILoanRepository {

    public loans: Loan[] = [];

    save(loan: Loan): boolean {

        for(let oneloan of this.loans){
             if (oneloan.userId === loan.userId && oneloan.bookId === loan.bookId) {
                throw new Error(`Usuário ${loan.userId} já está com o livro ${loan.bookId}.`)
            }
        }

        this.loans.push(loan);
        return true;

        /*for (let loan of this.loans) {
            if (loan.userId === userid && loan.bookId === bookid) {
                throw new Error(`Usuário ${userid} já está com o livro ${bookid}.`)
            }
        }

        */
    }

    remove(loan: Loan): boolean {

        let loancount = 0;

        for (let oneloan of this.loans) {
            if (oneloan.userId === loan.userId && oneloan.bookId === loan.bookId) {
                this.loans.splice(loancount, 1);
                return true;
            }

            loancount++;
        }

        throw new Error(`Usuário ${loan.userId} não está com o livro ${loan.bookId}`)
        //return false
    }

    findAll(): Loan[] {
        return this.loans;
    }

}

