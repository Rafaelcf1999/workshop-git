import { Book } from "./entities/Book.ts"
import { User } from "./entities/User.ts"

import { BookRepository } from "./repositories/BookRepository.ts"
import { UserRepository } from "./repositories/UserRepository.ts"
import { LoanRepository } from "./repositories/LoanRepository.ts"

import {LibraryService } from "./services/LibraryService.ts"

//1. Instancie o LibraryService passando os repositórios concretos.
const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(

    bookRepository,
    userRepository,
    loanRepository
);

//2. Cadastre pelo menos 2 livros e 2 usuários.

    libraryService.registerBook([
        new Book(1, "O chamado de Cthulhu","H.P. Lovecraft", "Terror", 3),
        new Book(2, "Harry Potter e a Pedra Filosofal", "J.K. Rowling", "Fantasia", 8)
    ]);

    libraryService.registerUser([
        new User(1,"Anderson"),
        new User(2, "Gabriel")
    ]);

//3. Realize um empréstimo.

    libraryService.loanBook(2,1);

//4. Faça uma busca por autor e outra por categoria.

//5. Exiba os resultados no console.







