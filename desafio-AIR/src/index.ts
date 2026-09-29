import Book from "./entities/Book.js";
import User from "./entities/User.js";
import BookRepository from "./repositories/BookRepository.js";
import LoanRepository from "./repositories/LoanRepository.js";
import UserRepository from "./repositories/UserRepository.js";
import LibraryService from "./service/LibraryService.js";
import SearchBookByAuthor from "./strategies/SearchBookByAuthor.js";
import { SearchBookByCategory } from "./strategies/SearchBookByCategory.js";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(bookRepository, userRepository, loanRepository);

//Cadastra livros e usuários
const book1 = new Book(1, 'O Hobbit', 'J.R.R. Tolkien', 'Fantasia', 3);
const book2 = new Book(2, 'Duna', 'Frank Herbert', 'Ficção Científica', 2);

const user1 = new User(1, 'Ana');
const user2 = new User(2, 'Carlos');

libraryService.registerBook(book1, book2);
libraryService.registerUsers(user1, user2);

//Realiza um empréstimo
libraryService.loanBook(user1.id, book1.id);

//Busca por autor e por categoria
const resultByAuthor = libraryService.search(new SearchBookByAuthor(), 'Frank Herbert');
const resultByCategory = libraryService.search(new SearchBookByCategory(), 'Fantasia');

//Exibe os resultados
console.log('Busca por autor:', resultByAuthor);
console.log('Busca por categoria:', resultByCategory);