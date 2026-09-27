import { Loan } from "../entities/Loan.ts";
import type { ILoanRepository } from "./interfaces/ILoanRepository.ts";

export class LoanRepository implements ILoanRepository{
    private loans: Loan[] = [];

    public save(loan: Loan): void{
        const exists = this.loans.some(
            (l) => l.userId === loan.userId && l.bookId === loan.bookId
        );
        if(exists){
            throw new Error(`Já existe um emprestimo da combinação de usuário e livro informado`)
        }
        this.loans.push(loan);
    }

    public remove(userId: number, bookId: number): void{
        const loanIndex = this.loans.findIndex(
            (l) => l.userId === userId && l.bookId === bookId
        );
        if(loanIndex === -1){
            throw new Error("O Emprestimo não foi encontrado.")
        }
        this.loans.splice(loanIndex, 1);
    }

    public findAll(): Loan[]{
        return [...this.loans];
    }
}
