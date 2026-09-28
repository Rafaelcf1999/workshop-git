import LibraryService from "./services/LibraryService.ts";
import BookRepository from "./repositories/BookRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import SearchAuthorStrategy from "./strategies/SearchAuthorStrategy.ts";
import SearchCategoryStrategy from "./strategies/SearchCategoryStrategy.ts";

const library = new LibraryService(
    new BookRepository(),
    new UserRepository(),
    new LoanRepository()
)

const ensaioSobreACegueira = new Book(1, "Ensaio sobre a cegueira", "José Saramago", "Romance", 2);

library.registerBook([
    ensaioSobreACegueira,
    new Book(2, "E não sobrou nenhum", "Agatha Christie", "Mistério", 1),
    new Book(3, "JoJo's Bizarre Adventures", "Hirohiko Araki", "Manga", 5),
    new Book(4, "Memorial do Convento", "José Saramago", "Romance", 1),
   ]);

library.registerUser([new User(1, "Richard"), new User(2, "Ana Júlia")])

console.log("Cópias antes do empréstimo:", ensaioSobreACegueira.getQuantity())
library.loanBook(1, 1)
console.log("Depois do empréstimo:", ensaioSobreACegueira.getQuantity())

const byAuthor = library.search(new SearchAuthorStrategy("José Saramago"));
console.log("Livros de José Saramago:", byAuthor.map((book) => book.title))

const byCategory = library.search(new SearchCategoryStrategy("Mistério"))
console.log("Livros de Mistério:", byCategory.map((book) => book.title))

library.giveBackBook(1, 1)
console.log("Cópias depois de devolver:", ensaioSobreACegueira.getQuantity());

library.loanBook(1, 2)
library.loanBook(2, 2)
library.loanBook(1, 3)
library.loanBook(1, 3)
library.loanBook(100, 1)
library.giveBackBook(2, 1)
