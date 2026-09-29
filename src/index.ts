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

const libraryService = new LibraryService(bookRepository, userRepository, loanRepository);

const book1 = new Book(1, "Gerenciamento de Pessoas em Projeto", "Ana Cláudia Trintenaro Baumotte M", "Software Engineering", 2);
const book2 = new Book(2, "Dominando Relatorios - Jasperreports com Ireport", "Edson Gonçalves", "Software Engineering", 1);

const user1 = new User(1, "João Paulo Marinho Santos");
const user2 = new User(2, "Maria Beatriz dos Santos");

console.log("--- Cadastrando Livros e Utilizadores ---");
libraryService.registerBook([book1, book2]);
libraryService.registerUser([user1, user2]);

console.log("\n--- Realizando Empréstimo ---");
libraryService.loanBook(1, 1);

console.log("\n--- Realizando Buscas ---");
console.log("Busca por Autor ('Edson Gonçalves'):");
const authorResults = libraryService.search(new AuthorSearchStrategy(), "Edson Gonçalves");
console.log(authorResults);

console.log("\nBusca por Categoria ('Software Engineering'):");
const categoryResults = libraryService.search(new CategorySearchStrategy(), "Software Engineering");
console.log(categoryResults);

console.log("\n--- Realizando Devolução ---");
libraryService.giveBackBook(1, 1);