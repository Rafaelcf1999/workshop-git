import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { SearchByAuthor } from "./strategies/SearchByAuthor.ts";
import { SearchByCategory } from "./strategies/SearchByCategory.ts";
import { LibraryService } from "./services/LibraryService.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository,
);

libraryService.registerBook([
  new Book(1, "Clean Code", "Robert C. Martin", "Programação", 3),
  new Book(2, "The Pragmatic Programmer", "Andrew Hunt", "Programação", 2),
]);

libraryService.registerUser([
  new User(1, "Ana"),
  new User(2, "Carlos"),
]);

libraryService.loanBook(1, 1);

const booksByAuthor = libraryService.search(
  new SearchByAuthor("Robert C. Martin"),
);

console.log("\nBusca por autor:");
console.table(
  booksByAuthor.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    quantity: book.getQuantity(),
  })),
);

const booksByCategory = libraryService.search(
  new SearchByCategory("Programação"),
);

console.log("\nBusca por categoria:");
console.table(
  booksByCategory.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    quantity: book.getQuantity(),
  })),
);

console.log("\nEmpréstimos registrados:");
console.table(loanRepository.findAll());

console.log("\nDevolvendo o livro...");
libraryService.giveBackBook(1, 1);

console.log("\nEmpréstimos após devolução:");
console.table(loanRepository.findAll());