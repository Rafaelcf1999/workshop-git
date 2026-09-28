import { Book } from './entities/Book.ts'
import { User } from './entities/User.ts'
import { BookRepository } from './repositories/BookRepository.ts'
import { UserRepository } from './repositories/UserRepository.ts'
import { LoanRepository } from './repositories/LoanRepository.ts'

import { LibraryService } from './services/LibraryService.ts'

import { SearchByAuthorStrategy } from './strategies/SearchByAuthorStrategy.ts'
import { SearchByCategoryStrategy } from './strategies/SearchByCategoryStrategy.ts'

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
    bookRepository,
    userRepository, 
    loanRepository
);

const book1 = new Book(1, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 3);
const book2 = new Book(2, "1984", "George Orwell", "Distopia", 5);
const book3 = new Book(3, "O Hobbit", "J.R.R. Tolkien", "Fantasia", 2);

const user1 = new User(1, "Ana Silva");
const user2 = new User(2, "Carlos Mendes");

// 2. Cadastre pelo menos 2 livros e 2 usuários
libraryService.registerBook([book1, book2, book3]);
libraryService.registerUser([user1, user2]);

// 3. Realize um empréstimo
libraryService.loanBook(1, 1);

// 4. Faça uma busca por autor e outra por categoria
const searchByTolkien = new SearchByAuthorStrategy("J.R.R. Tolkien");
const authorResults = libraryService.search(searchByTolkien);
console.log(authorResults);

const searchByDystopia = new SearchByCategoryStrategy("Distopia");
const categoryResults = libraryService.search(searchByDystopia);
console.log(categoryResults);

console.log("\n--- Testando Tratamento de Erros ---");
// Tentando emprestar um livro que não existe
libraryService.loanBook(1, 999);