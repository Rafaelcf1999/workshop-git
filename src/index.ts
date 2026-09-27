import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { AuthorSearchStrategy } from "./strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "./strategies/CategorySearchStrategy.ts";


const bookRep = new BookRepository();
const userRep = new UserRepository();
const loanRep = new LoanRepository();

const libraryService = new LibraryService(bookRep, userRep, loanRep);


console.log("1. Cadastro de Livros e Usuários");
libraryService.registerBook([
  new Book(1, "Harry Potter e a Pedra Filosofal", "J. K. Rowling", "Fantasia", 2),
  new Book(2, "A Princesa do Castelo Grande", "Stéfany Lima", "Fantasia", 1)
]);

libraryService.registerUser([
  new User(1, "Stéfany"),
  new User(2, "Carlos")
]);

console.log("\n2. Realizando Empréstimo");
libraryService.loanBook(1, 2);


console.log("\n3. Busca por Autor");
const booksByAuthor = libraryService.search(new AuthorSearchStrategy(), "Lima");
console.log(booksByAuthor);

console.log("\n4. Busca por Categoria");
const booksByCategory = libraryService.search(new CategorySearchStrategy(), "Fantasia");
console.log(booksByCategory);