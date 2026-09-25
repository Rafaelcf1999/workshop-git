import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import {
  SearchByAuthorStrategy,
  SearchByCategoryStrategy,
} from "./strategies/SearchStrategy.ts";

const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();
const searchByAuthor = new SearchByAuthorStrategy();
const searchByCategory = new SearchByCategoryStrategy();

const library = new LibraryService(bookRepo, userRepo, loanRepo);

{
  /* Registrando livros */
}
library.registerBook(
  1,
  "Entendendo Algoritmos",
  "Aditya Bhargava",
  "Programação",
  5,
);
library.registerBook(2, "Doutor Sono", "Stephen King", "Drama", 5);

{
  /* Registrando usuários */
}
library.registerUser(1, "Gustavo");
library.registerUser(2, "Pedro");

{
  /* Realizando um empréstimo */
}
library.loanBook(1, 2);

{
  /* Fazendo busca por autor e por categoria */
}
console.log(
  "Resultado da busca por Autor:",
  library.search(searchByAuthor, "Stephen King"),
);
console.log(
  "Resultado da busca por Categoria:",
  library.search(searchByCategory, "Programação"),
);
