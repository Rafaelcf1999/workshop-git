import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchByAuthor } from "./strategies/SearchByAuthor.ts";
import { SearchByCategory } from "./strategies/SearchByCategory.ts";
import { Loan } from "./entities/Loan.ts";

const library = new LibraryService (
    new BookRepository(),
    new UserRepository(),
    new LoanRepository(),
);

library.registerBook([
    new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 3),
    new Book(2, "Memórias Póstumas de Brás Cubas", "Machado de Assis", "Romance", 2),
    new Book(3, "Clean Code", "Robert C. Martin", "Tecnologia", 1),
]);

library.registerUser([new User(1, "Gabriela"), new User(2, "Letícia")]);

library.loanBook(1, 3);

console.log("Busca por autor: Machado de Assis");
console.log(library.search(new SearchByAuthor("Machado de Assis")));

console.log("Busca por categoria: Tecnologia");
console.log(library.search(new SearchByCategory("Tecnologia")));