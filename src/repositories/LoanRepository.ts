import Book from "../entities/Book.ts";
import Loan from "../entities/Loan.ts";
import User from "../entities/User.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import type ILoanRepository from "./interfaces/ILoanRepository.ts";


export default class LoanRepository implements ILoanRepository {
    private loans: Loan[] = [];

    /**
     * Salva um empréstimo no repositório.
     * @param objectToSave - O empréstimo a ser salvo.
     * @returns O empréstimo salvo.
     * @throws Error se o empréstimo já estiver registrado no repositório.
     */
    save(objectToSave: Loan): Loan {
            const loanAlreadyExists = this.loans
            .find(loan => (loan.userId === objectToSave.userId 
                && loan.bookId === objectToSave.bookId) 
                || (loan.id === objectToSave.id));
        
            if (loanAlreadyExists) throw new Error("Loan already registered.");
            this.loans.push(objectToSave);
            return objectToSave;

    }

    /**
     * Busca um empréstimo pelo ID.
     * @param id - O ID do empréstimo a ser buscado.
     * @returns O empréstimo encontrado ou null se não encontrado.
     * @throws Error se nenhum empréstimo estiver registrado no repositório.
     */
    findById(id: number): Loan {
        if (this.loans.length === 0) throw new Error("No loans registered.");
    
        const loan = this.loans.find(loan => loan.id === id);

        if (!loan) throw new Error("Loan not found.");
        return loan;
    }

    /**
     * Retorna todos os empréstimos registrados no repositório.
     * @returns Um array contendo todos os empréstimos.
     * @throws Error se nenhum empréstimo estiver registrado no repositório.
     */
    findAll(): Loan[] {
        if (this.loans.length === 0) throw new Error("No loans registered.");
        return this.loans;
    }

    /**
     * Remove um empréstimo do repositório pelo ID.
     * @param loanId O id do empréstimo a ser devolvido.
     * @returns o empréstimo que foi devolvido.
     */
    removeById(loanId: number): Loan {
        const loanIndex = this.loans.findIndex(loan => loan.id === loanId);
        if (loanIndex === -1) {
            throw new Error("Loan not found.");
        }
        const [removedLoan] = this.loans.splice(loanIndex, 1);
        return removedLoan;
    }

    /**
     * Remove um empréstimo do repositório com base no usuário e no livro.
     * @param user O usuário que realizou o empréstimo.
     * @param book O livro que foi emprestado.
     * @returns O empréstimo removido.
     * @throws Error se o empréstimo não for encontrado.
     */
    remove(user: User, book: Book): Loan {
        const loanIndex = this.loans.findIndex(loan => loan.userId === user.id && loan.bookId === book.id);
        if (loanIndex === -1) {
            throw new Error("Loan not found.");
        }
        const [removedLoan] = this.loans.splice(loanIndex, 1);
        return removedLoan;
    }
}