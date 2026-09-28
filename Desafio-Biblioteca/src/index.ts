import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import BookRepository from "./repositories/BookRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LibraryService from "./services/LibraryService.ts";
import SearchByAuthor from "./strategies/SearchByAuthor.ts";
import SearchByCategory from "./strategies/SearchByCategory.ts";

const biblioteca =  new LibraryService(new BookRepository, new UserRepository, new LoanRepository);

const livro1 = new Book(1, "O Hobbit", "J. R. R. Tolkien", "Fantasia", 5);
const livro2 = new Book(2, "O Senhor dos Anéis", "J. R. R. Tolkien", "Fantasia", 10);
const livro3 = new Book(3, "O Retrato de Dorian Gray", "Oscar Wilde", "Literatura Gótica", 4);

const user1 = new User(1, "Larissa");
const user2 = new User(2, "Julie");
const user3 = new User(3, "Tito");

biblioteca.registerBook([livro1, livro2, livro3]);
biblioteca.registerUser([user1, user2, user3]);

biblioteca.loanBook(1, 2);

console.log(biblioteca.search(new SearchByAuthor(), "J. R. R. Tolkien"));
console.log(biblioteca.search(new SearchByCategory(), "Literatura Gótica"));