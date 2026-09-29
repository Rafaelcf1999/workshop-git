import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { AuthorSearchStrategy } from "./strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "./strategies/CategorySearchStrategy.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository,
);

const pragmaticProgrammer = new Book(
  1,
  "The Pragmatic Programmer",
  "Andrew Hunt and David Thomas",
  "Software Engineering",
  2,
);
const refactoring = new Book(
  2,
  "Refactoring",
  "Martin Fowler",
  "Software Engineering",
  1,
);
const dune = new Book(3, "Dune", "Frank Herbert", "Science Fiction", 1);
const duneMessiah = new Book(
  4,
  "Dune Messiah",
  "Frank Herbert",
  "Science Fiction",
  1,
);

libraryService.registerBook([
  pragmaticProgrammer,
  refactoring,
  dune,
  duneMessiah,
]);
libraryService.registerUser([new User(1, "Clara"), new User(2, "Diego")]);

function printBooks(books: Book[]): void {
  console.table(
    books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      category: book.category,
      availableCopies: book.getQuantity(),
    })),
  );
}

function printLoans(): void {
  const loans = loanRepository.findAll();
  console.log(`Active loans: ${loans.length}`);

  if (loans.length > 0) {
    console.table(loans);
  }
}

console.log("=== Registered books ===");
printBooks(bookRepository.findAll());
console.log("=== Registered users ===");
console.table(userRepository.findAll());

console.log("\n=== Lending books ===");
libraryService.loanBook(1, 1);
libraryService.loanBook(2, 3);
console.log(
  `Copies of "${pragmaticProgrammer.title}": ${pragmaticProgrammer.getQuantity()}`,
);
console.log(`Copies of "${dune.title}": ${dune.getQuantity()}`);
printLoans();

console.log("\n=== Search by author: Frank Herbert ===");
printBooks(libraryService.search(new AuthorSearchStrategy(), "Frank Herbert"));

console.log("\n=== Search by category: Software Engineering ===");
printBooks(libraryService.search(new CategorySearchStrategy(), "Software Engineering"));

console.log("\n=== Handled errors ===");
libraryService.loanBook(1, 1);
libraryService.loanBook(1, 3);
libraryService.loanBook(99, 2);
libraryService.loanBook(1, 99);
libraryService.giveBackBook(1, 4);
console.log("Inventory and loans remain unchanged after these errors:");
printBooks([pragmaticProgrammer, dune, duneMessiah]);
printLoans();

console.log("\n=== Returning books ===");
libraryService.giveBackBook(1, 1);
libraryService.giveBackBook(2, 3);
printBooks([pragmaticProgrammer, dune]);
printLoans();
