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
        
            if (loanAlreadyExists) throw new Error("ERRO: Empréstimo já registrado.");
            this.loans.push(objectToSave);
            return objectToSave;

    }

    /**
     * Busca um empréstimo pelo ID.
     * @param id - O ID do empréstimo a ser buscado.
     * @returns O empréstimo encontrado ou null se não encontrado.
     * @throws Error se nenhum empréstimo estiver registrado no repositório.
     */
    findById(id: number): Loan | null {
        if (this.loans.length === 0) throw new Error("ERRO: Nenhum empréstimo registrado.");
    
        const loan = this.loans.find(loan => loan.id === id);

        if (!loan) throw new Error("Empréstimo não encontrado.");
        return loan || null;
    }

    /**
     * Retorna todos os empréstimos registrados no repositório.
     * @returns Um array contendo todos os empréstimos.
     * @throws Error se nenhum empréstimo estiver registrado no repositório.
     */
    findAll(): Loan[] {
        if (this.loans.length === 0) throw new Error("ERRO: Nenhum empréstimo registrado.");
        return this.loans;
    }

    search(strategy: SearchStrategy<Loan>, term: string): Loan[] {
        return strategy.search(this.loans, term);
    }

    // removeById(loanId: number): Loan | null {
    //     const loanIndex = this.loans.findIndex(loan => loan.id === loanId);
    //     if (loanIndex === -1) {
    //         throw new Error("Empréstimo não encontrado.");
    //     }
    //     const [removedLoan] = this.loans.splice(loanIndex, 1);
    //     return removedLoan || null;
    // }

    remove(user: User, book: Book): Loan {
        const loanIndex = this.loans.findIndex(loan => loan.userId === user.id && loan.bookId === book.id);
        if (loanIndex === -1) {
            throw new Error("Empréstimo não encontrado.");
        }
        const [removedLoan] = this.loans.splice(loanIndex, 1);
        return removedLoan;
    }
}