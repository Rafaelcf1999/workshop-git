import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { AuthorSearchStrategy } from "./strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "./strategies/CategorySearchStrategy.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository
);

const book1 = new Book(1, "Clean Code", "Robert C. Martin", "Software Engineering", 2);
const book2 = new Book(2, "Refactoring", "Martin Fowler", "Software Engineering", 1);
const book3 = new Book(3, "Design Patterns", "Erich Gamma", "Architecture", 1);

libraryService.registerBook([book1, book2, book3]);

const user1 = new User(1, "Augusto Jorge");
const user2 = new User(2, "Beatriz Silva");

libraryService.registerUser([user1, user2]);

console.log("=== Livros Cadastrados ===");
console.table(
  bookRepository.findAll().map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category,
    quantity: b.getQuantity(),
  }))
);

console.log("\n=== Realizando Empréstimo ===");
libraryService.loanBook(1, 1);
console.log(`Estoque do livro 1 após empréstimo: ${book1.getQuantity()}`);
console.log(`Total de empréstimos ativos: ${loanRepository.findAll().length}`);

console.log("\n=== Busca por Autor: 'Martin' ===");
const authorResults = libraryService.search(new AuthorSearchStrategy("Martin"));
console.table(
  authorResults.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category,
  }))
);

console.log("\n=== Busca por Categoria: 'Architecture' ===");
const categoryResults = libraryService.search(
  new CategorySearchStrategy("Architecture")
);
console.table(
  categoryResults.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category,
  }))
);

console.log("\n=== Realizando Devolução ===");
libraryService.giveBackBook(1, 1);
console.log(`Estoque do livro 1 após devolução: ${book1.getQuantity()}`);
console.log(`Total de empréstimos ativos: ${loanRepository.findAll().length}`);

console.log("\n=== Demonstração do Tratamento Interno de Erros ===");
libraryService.loanBook(99, 1);
libraryService.loanBook(1, 99);
libraryService.loanBook(1, 2);
libraryService.loanBook(2, 2);

