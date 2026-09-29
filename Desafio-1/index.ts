import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { AuthorSearchStrategy } from "./strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "./strategies/CategorySearchStrategy.ts";


const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();

const library = new LibraryService(bookRepo, userRepo, loanRepo);


const b1 = new Book(1, "Clean Code", "Robert C. Martin", "Programação", 2);
const b2 = new Book(2, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 1);
library.registerBook([b1, b2]);

const u1 = new User(1, "Alice");
const u2 = new User(2, "Bob");
library.registerUser([u1, u2]);

console.log("--- Realizando Empréstimo ---");

library.loanBook(1, 1);

console.log("\n--- Buscas ---");

const authorSearch = new AuthorSearchStrategy("Tolkien");
console.log("Busca por autor 'Tolkien':");
library.search(authorSearch);

const categorySearch = new CategorySearchStrategy("Programação");
console.log("Busca por categoria 'Programação':");
library.search(categorySearch);