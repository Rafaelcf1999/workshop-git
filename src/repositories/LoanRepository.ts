import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";


export default class LoanRepository implements ILoanRepository {
    private loans: Loan[] = [];

    save(objectToSave: Loan): Loan {
            const loanAlreadyExists = this.loans
            .find(loan => (loan.userId === objectToSave.userId 
                && loan.bookId === objectToSave.bookId) 
                || (loan.id === objectToSave.id));
        
            if (loanAlreadyExists) throw new Error("ERRO: Empréstimo já registrado.");
            this.loans.push(objectToSave);
            return objectToSave;

    }

    findById(id: number): Loan | null {
        if (this.loans.length === 0) throw new Error("ERRO: Nenhum empréstimo registrado.");
    
        const loan = this.loans.find(loan => loan.id === id);

        if (!loan) throw new Error("Empréstimo não encontrado.");
        return loan || null;
    }
    findAll(): Loan[] {
        if (this.loans.length === 0) throw new Error("ERRO: Nenhum empréstimo registrado.");
        return this.loans;
    }

}