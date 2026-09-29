import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { AuthorSearchStrategy } from "./strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "./strategies/CategorySearchStrategy.ts";

const library = new LibraryService(
  new BookRepository(),
  new UserRepository(),
  new LoanRepository(),
);

library.registerBook([
  new Book(1, "Clean Code", "Robert C. Martin", "Technology", 2),
  new Book(2, "The Hobbit", "J. R. R. Tolkien", "Fantasy", 1),
]);

library.registerUser([new User(1, "Ana"), new User(2, "Bruno")]);
library.loanBook(1, 1);

const byAuthor = library.search(new AuthorSearchStrategy(), "Martin");
const byCategory = library.search(new CategorySearchStrategy(), "Fantasy");

function printResults(label: string, books: Book[]): void {
  console.log(label);

  for (const book of books) {
    console.log(
      `- ${book.title} | ${book.author} | ${book.category} | ${book.getQuantity()} available`,
    );
  }
}

printResults("Books by author:", byAuthor);
printResults("Books by category:", byCategory);
