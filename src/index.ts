import Book from "./entities/Book.ts";
import Loan from "./entities/Loan.ts";
import User from "./entities/User.ts";
import LoanRepository from "./repositories/LoanRepository.ts";


const testRepo: LoanRepository = new LoanRepository();
const user = new User(1,"Joao");
const book = new Book(1, "Livro 1", "Autor 1", "Categoria 1", 10);
const loan = new Loan(user.id, book.id);

console.log(testRepo.save(loan));
const loanfound = testRepo.findById(loan.userId);