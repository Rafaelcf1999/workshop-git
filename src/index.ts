import Book from "./entities/Book";
import User from "./entities/User";
import BookRepository from "./repositories/BookRepository";
import UserRepository from "./repositories/UserRepository";
import LoanRepository from "./repositories/LoanRepository";
import LibraryService from "./services/LibraryService";
import SearchByAuthor from "./strategies/SearchByAuthor";
import SearchByCategory from "./strategies/SearchByCategory";

// 1. Instancia repositórios concretos e injeta no service
const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  loanRepository,
  userRepository,
);

// 2. Cadastra livros e usuários
const book1 = new Book(1, "1984", "George Orwell", "Ficção", 3);
const book2 = new Book(2, "O Hobbit", "J.R.R. Tolkien", "Fantasia", 2);

const user1 = new User(1, "Alice");
const user2 = new User(2, "Bob");

libraryService.registerBook([book1, book2]);
libraryService.registerUser([user1, user2]);

// 3. Realiza um empréstimo
// atenção: loanBook(bookId, userId), nessa ordem
libraryService.loanBook(book1.id, user1.id);

// 4. Busca por autor e por categoria
const booksByAuthor = libraryService.search(new SearchByAuthor("George Orwell"));
const booksByCategory = libraryService.search(new SearchByCategory("Fantasia"));

// 5. Exibe os resultados
console.log("--- Busca por autor 'George Orwell' ---");
console.log(booksByAuthor);

console.log("--- Busca por categoria 'Fantasia' ---");
console.log(booksByCategory);

console.log("--- Estoque de '1984' após empréstimo ---");
console.log(bookRepository.findById(book1.id).getQuantity()); // deve ser 2