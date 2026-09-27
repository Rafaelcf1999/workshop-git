import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";


export default class LoanRepository implements ILoanRepository{

    private loans: Loan[] = [];
    
    save(loan: Loan): void {
       const loanExistente = this.loans.some(
            emprestimo => emprestimo.userId === loan.userId && emprestimo.bookId === loan.bookId
        );

        if (loanExistente) {
            throw new Error(`Empréstimo de ${loan.userId} de livro ${loan.bookId} já existente`);
        }

        this.loans.push(loan);
    }
    remove(loan: Loan): void {
        const index = this.loans.findIndex(
            emprestimo => emprestimo.userId === loan.userId && emprestimo.bookId === loan.bookId
        );

        if (index === -1) {
            throw new Error("Empréstimo não encontrado.");
        }

        this.loans.splice(index, 1);
    }

    findAll(): Loan[] {
        return this.loans;
    }

}