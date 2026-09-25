import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
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

const books = [
  new Book(1, "Entendendo Algoritmos", "Aditya Bhargava", "Programação", 5),
  new Book(2, "Doutor Sono", "Stephen King", "Drama", 5),
];

const users = [new User(1, "Gustavo"), new User(2, "Pedro")];

/* Registrando livros */
library.registerBook(books);

/* Registrando usuários */
library.registerUser(users);

/* Realizando um empréstimo */
library.loanBook(1, 2);

/* Devolvendo um empréstimo */
library.giveBackBook(1, 2);

/* Fazendo busca por autor e por categoria */
console.log(
  "Resultado da busca por Autor:",
  library.search(searchByAuthor, "Stephen King"),
);
console.log(
  "Resultado da busca por Categoria:",
  library.search(searchByCategory, "Programação"),
);
