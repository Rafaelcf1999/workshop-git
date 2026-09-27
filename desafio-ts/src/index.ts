import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import Loan from "./entities/Loan.ts";
import BookRepository from "./repositories/BookRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

// Teste bookRepository
// const book1 = new Book(
//     1,
//     "Harry Potter e a Pedra Filosofal",
//     "J.K. Rowling",
//     "Fantasia",
//     5
// );

// const book2 = new Book(
//     2,
//     "Harry Potter e a Câmara Secreta",
//     "J.K. Rowling",
//     "Fantasia",
//     2
// );

// bookRepository.save(book1);
// bookRepository.save(book2);

// console.log(bookRepository.findById(1));

// console.log(bookRepository.findAll());

//Teste UserRepository
// const user1 = new User(1, "Gigi");
//const user2 = new User(2, "Gabi");

// userRepository.save(user1);
// userRepository.save(user1);

// console.log(userRepository.findById(0));

// console.log(userRepository.findAll());

//Teste LoanRepository
// const loan1 = new Loan(1,2);
// const loan2 = new Loan(1,3);

// loanRepository.save(loan2);

// console.log(loanRepository.remove(loan1));

//console.log(loanRepository.findAll());