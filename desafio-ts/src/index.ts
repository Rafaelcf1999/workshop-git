import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import BookRepository from "./repositories/BookRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import LibraryService from "./services/LibraryService.ts";
import AuthorSearchStrategy from "./strategies/AuthorSearchStrategy.ts";
import CategorySearchStrategy from "./strategies/CategorySearchStrategy.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const service = new LibraryService(
    bookRepository,
    userRepository,
    loanRepository
);

const book1 = new Book(
    1,
    "Sherlock Holmes",
    "Arthur Conan Doyle",
    "Mistério",
    5
);

const book2 = new Book(
    2,
    "É assim que acaba",
    "Colleen Hoover",
    "Romance",
    3
);

const user1 = new User(1, "Gigi");
const user2 = new User(2, "Gabriel");

service.registerBook([book1, book2]);
service.registerUser([user1, user2]);

service.loanBook(1, 1);

const authorStrategy = new AuthorSearchStrategy();
const categoryStrategy = new CategorySearchStrategy();

const booksByAuthor = service.search(authorStrategy, "Arthur Conan Doyle");
const booksByCategory = service.search(categoryStrategy, "Romance");

console.log("Pesquisando por autor:");
console.log(booksByAuthor);
console.log("Pesquisando por categoria:");
console.log(booksByCategory);