import { BookRepository } from "./repositories/BookRepository.ts";
import { Book } from "./entities/Book.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { User } from "./entities/User.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { Loan } from "./entities/Loan.ts";

//test BookRepository
const testeRepo = new BookRepository();
const testeBook = new Book(99, "teste", "autor", "categoria", 1);

testeRepo.save(testeBook);
console.log(testeRepo.findById(99));
try{
    testeRepo.save(testeBook);
}catch(e){
    console.log((e as Error).message);
}

//test UserRepository
const testeUserRepo = new UserRepository();
const testeUser = new User(99, "usuário");
testeUserRepo.save(testeUser);
console.log(testeUserRepo.findById(99));
try {
    testeUserRepo.save(testeUser);
} catch (e) {
    console.log((e as Error).message);
}

//test LoanRepository
const testeLoanRepo = new LoanRepository();
const testLoan = new Loan(25, 25);
testeLoanRepo.save(testLoan);
console.log(testeLoanRepo.findAll());
try {
    testeLoanRepo.save(testLoan);
} catch (e) {
    console.log((e as Error).message);
}
testeLoanRepo.remove(25, 25);
try {
    testeLoanRepo.remove(25, 25);
} catch (e) {
    console.log((e as Error).message);
}