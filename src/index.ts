import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchByAuthorStrategy } from "./strategies/SearchByAuthorStrategy.ts";
import { SearchByCategoryStrategy } from "./strategies/SearchByCategoryStrategy.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository,
);

const books = [
  new Book(
    1,
    "Clean Code",
    "Robert C. Martin",
    "Software Engineering",
    2,
  ),
  new Book(
    2,
    "Domain-Driven Design",
    "Eric Evans",
    "Software Engineering",
    1,
  ),
];

const users = [new User(1, "Ana Silva"), new User(2, "Bruno Souza")];

libraryService.registerBook(books);
libraryService.registerUser(users);
libraryService.loanBook(1, 1);

const booksByAuthor = libraryService.search(
  new SearchByAuthorStrategy(),
  "Robert C. Martin",
);

const booksByCategory = libraryService.search(
  new SearchByCategoryStrategy(),
  "Software Engineering",
);

console.log("Livros encontrados por autor:", booksByAuthor);
console.log("Livros encontrados por categoria:", booksByCategory);
