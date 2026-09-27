import Book from "./entities/Book.ts"
import User from "./entities/User.ts"
import BookRepository from "./repositories/BookRepository.ts"
import LoanRepository from "./repositories/LoanRepository.ts"
import UserRepository from "./repositories/UserRepository.ts"
import LibraryService from "./services/LibraryService.ts"
import SearchByAuthor from "./strategies/SearchByAuthor.ts"
import SearchByCategory from "./strategies/SearchByCategory.ts"

const bookRepository = new BookRepository()
const userRepository = new UserRepository()
const loanRepository = new LoanRepository()

const libraryService = new LibraryService(bookRepository, userRepository, loanRepository)

libraryService.registerBook([new Book(1, "O Último Desejo", "Andrzej Sapkowski", "Fantasia", 6), new Book(2, "A Espada do Destino", "Andrzej Sapkowski", "Fantasia", 4)])

libraryService.registerUser([new User(1, "Renan Zanetti Oliveira"), new User(2, "Carlos Silva")])

libraryService.loanBook(1, 1)

const pesquisaAutor = libraryService.search(new SearchByAuthor(), "Andrzej Sapkowski")

const pesquisaCategoria = libraryService.search(new SearchByCategory(), "Fantasia")

console.log('Busca pelo autor "Andrzej Sapkowski":');
pesquisaAutor.forEach(book => console.log(`${book.title} (${book.getQuantity()} cópias)`));

console.log('Busca pela categoria "Fantasia":');
pesquisaCategoria.forEach(book => console.log(`${book.title} (${book.getQuantity()} cópias)`));
