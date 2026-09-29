import { Book } from "./entities/Book.ts";
import { Loan } from "./entities/Loan.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchBookByAuthor, SearchBookByCategory } from "./strategies/SearchStrategy.ts";

const bookRepository = new BookRepository(); 
const userRepository = new UserRepository(); 
const loanRepository = new LoanRepository(); 

const Library = new LibraryService(
  bookRepository, 
  userRepository, 
  loanRepository
);

Library.registerBook([
  new Book(1, "A biblioteca da meia noite", "Matt Haig", "Ficção", 15),
  new Book(2, "Bird box", "Josh Malerman", "Terror", 20),
  new Book(3, "O fator Melquisedeque", "Don Richardson", "Espiritual", 10),
]);
Library.registerUser([
  new User(1, "Alex"),
  new User(2, "Ellie"),
  new User(3, "Georgio")
]);
Library.loanBook(
  new Loan(1, 3)
);

console.log("\n-----------Livros cadastrados----------")
console.log(bookRepository.findAll());

console.log("\n----------Usuários cadastrados---------")
console.log(userRepository.findAll());

console.log("\n---------Empréstimos realizados--------")
console.log(loanRepository.findAll());

console.log("\n------------Busca por autor------------")
console.log(Library.search("Matt Haig", new SearchBookByAuthor(bookRepository)));

console.log("\n----------Busca por categoria----------")
console.log(Library.search("Terror", new SearchBookByCategory(bookRepository)));