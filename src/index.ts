import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { SearchByCategoryStrategy } from "./strategies/SearchByCategoryStrategy.ts";
import { SearchByAuthorStrategy } from "./strategies/SearchByAuthorStrategy.ts";

const userRepository = new UserRepository();
const bookRepository = new BookRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(bookRepository, userRepository, loanRepository);

libraryService.registerBook([
    new Book("A hipótese do amor", "Ali Hazelwood", 1, "Romance", 10),
    new Book("The Hobbit", "J.R.R. Tolkein", 2, "Ficção", 21),
    new Book("The hunger games", "Suzanne Collins", 3, "Distopia", 15),
]);

libraryService.registerUser([
    new User("Jhulia", 1),
    new User("Rafael", 2),
]);

libraryService.loanBook(1, 1);

//case de erro para teste
libraryService.loanBook(1, 6);

libraryService.search(new SearchByCategoryStrategy("Romance"));
libraryService.search(new SearchByAuthorStrategy("Suzanne Collins"));

