import Book from './entities/Book.ts';
import User from './entities/User.ts';
import BookRepository from './repositories/BookRepository.ts';
import UserRepository from './repositories/UserRepository.ts';
import LoanRepository from './repositories/LoanRepository.ts';
import LibraryService from './services/LibraryService.ts';
import SearchByAuthor from './strategies/SearchByAuthor.ts';
import SearchByCategory from './strategies/SearchByCategory.ts';


const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();

const libraryService = new LibraryService(bookRepo, userRepo, loanRepo);

console.log("Registration of books and users");

const booksToRegister = [
  new Book(1, "Clean Code", "Robert C. Martin", "Programação", 3),
  new Book(2, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 2)];

const usersToRegister = [
  new User(101, "Leandro Penha"),
  new User(102, "Maria Souza")];

libraryService.registerBook(booksToRegister);
libraryService.registerUser(usersToRegister);

console.log("\nTaking out a Loan");

libraryService.loanBook(101, 1);
console.log(`Remaining number of copies of 'Clean Code': ${bookRepo.findById(1).getQuantity()}`);

console.log("\nSearch Test");

const authorSearchStrategy = new SearchByAuthor();
const categorySearchStrategy = new SearchByCategory();

const booksByAuthor = libraryService.search(authorSearchStrategy, "J.R.R. Tolkien");
console.log("Search By Author: ", booksByAuthor);

const booksByCategory = libraryService.search(categorySearchStrategy, "Programação");
console.log("Search By Category: ", booksByCategory);

console.log("\nReturning a book");

libraryService.giveBackBook(101, 1);

console.log(`Copies after returning 'Clean Code': ${bookRepo.findById(1).getQuantity()}`);

console.log("Active loans:", loanRepo.findAll());