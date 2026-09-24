import Loan from "../entities/Loan.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";


export default class LoanRepository implements ILoanRepository {

    private loans: Loan[] = [];
    save(objectToSave: Loan): Loan {
        try {
            this.verifyLoanExists(objectToSave.userId, objectToSave.bookId);
            this.loans.push(objectToSave);
            return objectToSave;
        } catch (error) {
            throw new Error("Erro ao salvar o emprestímo.");
        }

    }
    findById(id: number): Loan | null {
        let loan: Loan | null = null;
        try {
            this.verifyIfIsEmpty();
            loan = this.findLoanById(id);
        } catch (error) {
            console.log(error);
        }
        return loan;
    }
    findAll(): Loan[] {
        this.verifyIfIsEmpty();
        throw new Error("Method not implemented.");
    }

    private findLoanById(id: number): Loan | null {
        const loan = this.loans.find(loan => loan.userId === id);
        if (!loan) throw new Error("Empréstimo não encontrado.");
        return loan || null;
    }

    private verifyLoanExists(userId: number, bookId: number): void {
        const loanExists = this.loans.find(loan => loan.userId === userId && loan.bookId === bookId);
        if (loanExists) throw new Error();
    }

    private verifyIfIsEmpty(): void {
        if (this.loans.length === 0) throw new Error();
    }

}