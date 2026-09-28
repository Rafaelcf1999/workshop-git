import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { AuthorSearchStrategy } from "./strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "./strategies/CategorySearchStrategy.ts";

const books = new BookRepository();
const users = new UserRepository();
const loans = new LoanRepository();
const library = new LibraryService(books, users, loans);

library.registerBook([
  new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 2),
  new Book(2, "Papéis Avulsos", "Machado de Assis", "Contos", 1),
]);
library.registerUser([new User(1, "Ana"), new User(2, "Pedro")]);

console.log("Livros cadastrados:");
console.table(books.findAll());
console.log("Usuários cadastrados:");
console.table(users.findAll());

library.loanBook(1, 1);
console.log("Empréstimos ativos:");
console.table(loans.findAll());
console.log("Cópias disponíveis de Dom Casmurro:", books.findById(1).getQuantity());

console.log("Busca por autor: Machado de Assis");
console.table(library.search(new AuthorSearchStrategy(), "Machado de Assis"));

console.log("Busca por categoria: Romance");
console.table(library.search(new CategorySearchStrategy(), "Romance"));

library.giveBackBook(1, 1);
console.log("Empréstimos após a devolução:");
console.table(loans.findAll());
console.log("Cópias disponíveis de Dom Casmurro:", books.findById(1).getQuantity());
