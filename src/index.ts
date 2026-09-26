import BookRepository from "./repositories/BookRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import LibraryService from "./services/LibraryService.ts";
import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import SearchAuthor from "./strategies/SearchAuthor.ts";
import SearchCategory from "./strategies/SearchCategory.ts";


const libraryService = new LibraryService(new BookRepository(), new LoanRepository(), new UserRepository());

const books = [
    new Book(1, "Flores para Algernon", "Daniel Keyes", 'Ficção Científica', 5),
    new Book(2, "Percy Jackson e o Ladrão de Raios", "Rick Riordan", "Fantasia", 10)
];

const users = [
    new User(1, "Maria"),
    new User(2, "João")
];

libraryService.registerUser(users);
libraryService.registerBook(books);
libraryService.loanBook(1, 2);
console.log(libraryService.search(new SearchAuthor, 'Daniel Keyes'));
console.log(libraryService.search(new SearchCategory, 'Fantasia'));