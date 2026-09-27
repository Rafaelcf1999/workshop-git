import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { SearchByAuthor } from "./strategies/SearchByAuthor.ts";
import { SearchByCategory } from "./strategies/SearchByCategory.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository
);

libraryService.registerBook([
  new Book(1, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 3),
  new Book(2, "Duna", "Frank Herbert", "Ficção Científica", 2),
]);

libraryService.registerUser([
  new User(1, "Giovanna"),
  new User(2, "Carlos"),
]);

libraryService.loanBook(1, 1);

const booksByAuthor = libraryService.search(
  new SearchByAuthor(),
  "J.R.R. Tolkien"
);
console.log("Busca por autor (J.R.R. Tolkien):", booksByAuthor);

const booksByCategory = libraryService.search(
  new SearchByCategory(),
  "Ficção Científica"
);
console.log("Busca por categoria (Ficção Científica):", booksByCategory);