import { Book } from "./entities/Book.js";
import { Loan } from "./entities/Loan.js";
import { User } from "./entities/User.js";
import { BookRepository } from "./repositories/BookRepository.js";
import { LoanRepository } from "./repositories/LoanRepository.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { LibraryService } from "./services/LibraryService.js";
import { SearchBookByAuthor, SearchBookByCategory } from "./strategies/SearchStrategy.js";

const bookRepository = new BookRepository(); 

const Library = new LibraryService(
  bookRepository, 
  new UserRepository(), 
  new LoanRepository()
);

Library.registerBook([
  new Book(1, "A biblioteca da meia noite", "Matt Haig", "Ficção", 15),
  new Book(2, "Bird box", "Josh Malerman", "Terror", 20),
  new Book(3, "O fator Melquisedeque", "Don Richardson", "Espiritual", 10),
])
Library.registerUser([
  new User(1, "Alex"),
  new User(2, "Ellie"),
  new User(3, "Georgio")
])
Library.loanBook(
  new Loan(1, 3)
)
Library.search("Matt Haig", new SearchBookByAuthor(bookRepository))
Library.search("Terror", new SearchBookByCategory(bookRepository))