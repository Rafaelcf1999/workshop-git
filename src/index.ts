import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import BookRepository from "./repositories/BookRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LibraryService from "./services/LibraryService.ts";
import SearchByAuthor from "./strategies/SearchByAuthor.ts";
import SearchbyCategory from "./strategies/SearchByCategory.ts";
import SearchbyTitle from "./strategies/SearchByTitle.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();
const livraria = new LibraryService(bookRepository, userRepository, loanRepository);

livraria.registerBook([
    new Book(1, "Guerra da Papoula", "R. F. Kuang", "Fantasia", 3),
    new Book(2, "Homem de Giz", "C. J. Tudor", "Suspense", 1),
    new Book(3, "Suicidas", "Raphael Montes", "Suspense", 0),
    new Book(4, "Hunter x Hunter", "Yoshihiro Togashi", "Fantasia", 10),
]);

livraria.registerUser([
    new User(1, "Vinicius"),
    new User(2, "Luan"),
    new User(3, "Rafael"),
    new User(4, "Maria"),
    new User(5, "Livia")
]);

livraria.loanBook(1, 2);
livraria.loanBook(2, 1);
livraria.loanBook(3, 1);

livraria.search("Raphael Montes", new SearchByAuthor());
livraria.search("Yoshihiro Togashi", new SearchByAuthor());
livraria.search("Suspense", new SearchbyCategory());
livraria.search("GUERRA Da pApOula", new SearchbyTitle());