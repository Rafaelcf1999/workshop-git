import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { SearchByAuthor } from "./strategies/SearchByAuthor.ts";
import { SearchByCategory } from "./strategies/SearchByCategory.ts";

const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();
const library = new LibraryService(bookRepo, userRepo, loanRepo);

library.registerBook([
    new Book(1, "O Codificador Limpo", "Robert C. Martin", "Tecnologia", 3),
    new Book(2, "Entendendo Algoritmos", "Aditya Y. Bhargava", "Tecnologia", 4),
    new Book(3, "Padrões de Projetos", "Erich Gamma", "Tecnologia", 1),
    new Book(4, "Refatoração", "Martin Fowler", "Tecnologia", 2),
    new Book(5, "Arquitetura Limpa", "Robert C. Martin", "Tecnologia", 0),
    new Book(6, "O Hobbit", "J.R.R. Tolkien", "Fantasia", 3),
    new Book(7, "Duna", "Frank Herbert", "Ficção Científica", 2),
    new Book(8, "Dom Casmurro", "Machado de Assis", "Literatura", 5),
    new Book(9, "O Alquimista", "Paulo Coelho", "Literatura", 2),
    new Book(10, "1984", "George Orwell", "Ficção", 4)
]);

library.registerUser([
    new User(1, "Icaro"),
    new User(2, "João Gabriel")
]);

console.log("==== Registrando emprestimo =====");
library.loanBook(1, 8);

console.log("======= Busca por autor =======");
const buscaAutor = library.search(new SearchByAuthor, "Machado de assis");
console.log(buscaAutor);

console.log("===== Busca por categoria =====");
const buscaCategoria = library.search(new SearchByCategory, "literatura");
console.log(buscaCategoria);