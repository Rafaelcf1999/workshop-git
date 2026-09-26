import { BookRepository } from "./repositories/BookRepository.ts";
import { Book } from "./entities/Book.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { User } from "./entities/User.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { Loan } from "./entities/Loan.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchByAuthorStrategy } from "./strategies/SearchByAuthorStrategy.ts";

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

//test LibraryService
const testeBookRepo = new BookRepository();
const testeUserRepo2 = new UserRepository();
const testeLoanRepo2 = new LoanRepository();
const testeService = new LibraryService(testeBookRepo, testeUserRepo2, testeLoanRepo2);

const svcBook = new Book(1, "livro", "autor", "categoria", 1);
const svcUser = new User(1, "usuário");

testeService.registerBook([svcBook]);
testeService.registerUser([svcUser]);

const loan = testeService.loanBook(1, 1);
console.log("Loan:", loan);

const failedLoan = testeService.loanBook(1, 1);
console.log("Failed loan (duplicate):", failedLoan);

const returned = testeService.giveBackBook(1, 1);
console.log("Returned:", returned);

const failedReturn = testeService.giveBackBook(1, 1);
console.log("Failed return (not found):", failedReturn);

testeService.registerBook([svcBook]); // recadastra para testar busca
const searchResult = testeService.search(new SearchByAuthorStrategy(), "AUTOR");
console.log("Search result:", searchResult);
