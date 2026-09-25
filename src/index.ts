import Book from "./entities/Book.ts";
import Loan from "./entities/Loan.ts";
import User from "./entities/User.ts";
import LoanRepository from "./repositories/LoanRepository.ts";


const testRepo: LoanRepository = new LoanRepository();
const user = new User(1,"Joao");
const book = new Book(1, "Livro 1", "Autor 1", "Categoria 1", 10);
const loan = new Loan(user.id, book.id);
const loan2error = new Loan(user.id, book.id);
const loan3 = new Loan(new User(2,"Maria").id, new Book(2, "Livro 2", "Autor 2", "Categoria 2", 5).id);

console.log(testRepo.save(loan));
console.log("Tentando adicionar um empréstimo duplicado:");
try {
    testRepo.save(loan2error);
} catch (error) {
    console.error(error);
}
console.log(testRepo.save(loan3));