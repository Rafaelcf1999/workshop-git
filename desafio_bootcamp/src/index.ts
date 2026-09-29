import { Book } from "./entities/Book.ts"
import { User } from "./entities/User.ts"
import { BookRepository } from "./repositories/BookRepository.ts"
import { LoanRepository } from "./repositories/LoanRepository.ts"
import { UserRepository } from "./repositories/UserRepository.ts"
import { LibraryService } from "./services/LibraryService.ts"
import { SearchAuthor } from "./strategies/SearchAuthor.ts"
import { SearchCategory } from "./strategies/SearchCategory.ts"

const bookRepository = new BookRepository()
const userRepository = new UserRepository()
const loanRepository = new LoanRepository()

const libraryService = new LibraryService(bookRepository, userRepository, loanRepository)

libraryService.registerBook([new Book(1, "Código limpo: habilidades práticas do Agile Software", "Robert Cecil Martin", "Engenharia de software", 6), new Book(2, "Escuridão Total Sem Estrelas", " Stephen King ", "Contos", 4)])

libraryService.registerUser([new User(1, "Leon Scott Kennedy"), new User(2, "Mario Bros")])

libraryService.loanBook(1, 1)


const pesquisaAutor = libraryService.search(new SearchAuthor(), "Robert Cecil Martin");
const pesquisaCategoria = libraryService.search(new SearchCategory(), "Contos");


console.log('Busca pelo autor "Robert Cecil Martin":');
pesquisaAutor.forEach((book: Book) => console.log(`${book.title} (${book.getQuantity()} cópias)`));

console.log('Busca pela categoria "Contos":');
pesquisaCategoria.forEach((book: Book) => console.log(`${book.title} (${book.getQuantity()} cópias)`));