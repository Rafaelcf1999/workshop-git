import { Book } from './entities/Book.ts';
import { User } from './entities/User.ts';
import { BookRepository } from './repositories/BookRepository.ts';
import { UserRepository } from './repositories/UserRepository.ts';
import { LoanRepository } from './repositories/LoanRepository.ts';
import { LibraryService } from './services/LibraryService.ts';
import { AuthorSearchStrategy } from './strategies/AuthorSearchStrategy.ts';
import { CategorySearchStrategy } from './strategies/CategorySearchStrategy.ts';

// 1. Instanciando os repositórios e o serviço
const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();

const libraryService = new LibraryService(bookRepo, userRepo, loanRepo);

// 2. Cadastrando livros e usuários
const book1 = new Book(1, 'Coraline', 'Neil Gaiman', 'Terror', 5);
const book2 = new Book(2, 'Odisseia', 'Romero', 'Epopeia', 10);
libraryService.registerBook([book1, book2]);

const user1 = new User(3, 'Raiane Dantas');
const user2 = new User(4, 'Maria Alyce');
libraryService.registerUser([user1, user2]);

console.log(
  `Quantidade de cópias do livro ${book1.title}: ${book1.getQuantity()}`,
);

// 3. Realizando um empréstimo
libraryService.loanBook(user1.id, book1.id);

console.log(
  `Quantidade de cópias após empréstimo do livro ${book1.title}: ${book1.getQuantity()}`,
);

// 4. Executando buscas com o Strategy Pattern
const searchByAuthor = libraryService.search(
  new AuthorSearchStrategy(),
  'Romero',
);

console.log('Busca pelo autor "Romero"', searchByAuthor);

const searchByCategory = libraryService.search(
  new CategorySearchStrategy(),
  'Terror',
);

console.log('Busca pela categoria "Terror"', searchByCategory);
