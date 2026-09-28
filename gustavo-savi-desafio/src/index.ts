import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchByAuthorStrategy } from "./strategies/SearchByAuthorStrategy.ts";
import { SearchByCategoryStrategy } from "./strategies/SearchByCategoryStrategy.ts";

const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();
const searchByAuthor = new SearchByAuthorStrategy();
const searchByCategory = new SearchByCategoryStrategy();

const library = new LibraryService(bookRepo, userRepo, loanRepo);

const books = [
  new Book(1, "Entendendo Algoritmos", "Aditya Bhargava", "Programação", 5),
  new Book(2, "Doutor Sono", "Stephen King", "Drama", 5),
  new Book(3, "Clean Code", "Robert Martin", "Programação", 4),
  new Book(4, "1984", "George Orwell", "Ficção", 5),
  new Book(
    5,
    "O Poder do Hábito",
    "Charles Duhigg",
    "Desenvolvimento Pessoal",
    4,
  ),
  new Book(6, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 5),
  new Book(7, "Dom Casmurro", "Machado de Assis", "Literatura Brasileira", 4),
  new Book(8, "Pai Rico, Pai Pobre", "Robert Kiyosaki", "Finanças", 3),
  new Book(9, "O Código Da Vinci", "Dan Brown", "Suspense", 4),
  new Book(10, "A Revolução dos Bichos", "George Orwell", "Ficção", 5),
];

const users = [
  new User(1, "Gustavo"),
  new User(2, "Pedro"),
  new User(3, "João"),
  new User(4, "Lucas"),
  new User(5, "Gabriel"),
  new User(6, "Rafael"),
  new User(7, "Matheus"),
  new User(8, "Felipe"),
  new User(9, "Bruno"),
  new User(10, "André"),
];

/* Registrando livros */
library.registerBook(books);

/* Registrando usuários */
library.registerUser(users);

/* Realizando um empréstimo */
library.loanBook(1, 3);

/* Fazendo busca por autor e por categoria */
console.log(
  "Resultado da busca por Autor:",
  library.search(searchByAuthor, "George Orwell"),
);
console.log(
  "Resultado da busca por Categoria:",
  library.search(searchByCategory, "Programação"),
);
