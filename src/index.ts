import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchByAuthor } from "./strategies/SearchByAuthor.ts";
import { SearchByCategory } from "./strategies/SearchByCategory.ts";
import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";

const searchByAuthor = new SearchByAuthor();

const searchByCategory = new SearchByCategory();
const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository,
);

const book1 = new Book(1, "It: A Coisa", "Stephen King", "Terror", 3);

const book2 = new Book(
  2,
  "O Assassinato de Roger Ackroyd",
  "Agatha Christie",
  "Investigação",
  2,
);

libraryService.registerBook([book1, book2]);
const user1 = new User(1, "Gustavo");

const user2 = new User(2, "João");

libraryService.registerUser([user1, user2]);

libraryService.loanBook(user1.id, book1.id);

libraryService.giveBackBook(user1.id, book1.id);

const booksByAuthor = libraryService.search(searchByAuthor, "stephen");

console.log(booksByAuthor);

const booksByCategory = libraryService.search(searchByCategory, "investigação");

console.log(booksByCategory);
