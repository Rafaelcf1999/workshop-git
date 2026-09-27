import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import Loan from "./entities/Loan.ts";
import BookRepository from "./repositories/BookRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import LibraryService from "./services/LibraryService.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const service = new LibraryService(
    bookRepository,
    userRepository,
    loanRepository
);