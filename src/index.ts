import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LibraryService } from "./services/libraryService.ts";
import { SearchByAuthorStrategy } from "./strategis/SearchByAuthorStrategy.ts";
import { SearchByCategoryStrategy } from "./strategis/SearchByCategory.ts";

const bookRepository = new BookRepository
const userRepository = new UserRepository
const loanRepository = new LoanRepository

const library = new LibraryService(
    bookRepository,
    userRepository,
    loanRepository
)

console.log("\n----bem vindo(a) ao sistema da biblioteca----\n");
//registro de livros e usuarios e emprestimos
const newBooks = [
    new Book(1,"As Crônicas de Nárnia", "C. S. Lewis", "fantasia", 10),
    new Book(2,"O Senhor dos Anéis", "J. R. R. Tolkien", "fantasia", 5),
    new Book(3,"O Guia do Mochileiro das Galáxias", "Douglas Adams", "ficção científica", 7),
    new Book(4,"Orgulho e Preconceito", "Jane Austen", "romance", 4),
    new Book(5,"O Problema do Sofrimento", "C. S. Lewis", "filosofia", 8),
]

const newUsers = [
    new User(1, "Timoteo"),
    new User(2, "Elena")
]

library.registerBook(newBooks)
library.registerUser(newUsers)

console.log("\ncadastros relizados\n");

console.log("\n-> executando o imprestimo\n");

library.loanBook(1,5)
library.loanBook(2,1)

console.log("\n-> executando a devolução\n");

library.giveBackBook(1,5)

// uso de buscas com padrão strategy

console.log("\n-> executando a busca por autor\n");
const authorSearch = new SearchByAuthorStrategy("C. S. Lewis")
const bookByAuthor = library.search(authorSearch)
console.log("livros encontrados por autor (C. S. Lewis) =",bookByAuthor);


console.log("\n-> executando a busca por categoria\n");
const searchByCategory = new SearchByCategoryStrategy("ficção científica")
const booksByCategory = library.search(searchByCategory)
console.log("livros encontrados por categoria (ficção científica) =",booksByCategory);

// Testes de erros

console.log("\n## testes de controle de alguns erros ##");


console.log("\n-> executando o imprestimo com usuario e livros que não existem\n");

library.loanBook(3,5)
library.loanBook(1,10)


console.log("\n-> executando a devolução de emprestimo não feito\n");

library.giveBackBook(2,5)

console.log("\n-> executando a busca de livros por autor não registrado\n");
const authorSearch_1 = new SearchByAuthorStrategy("guidorizzi")
const bookByAuthor_1 = library.search(authorSearch_1)
console.log("livros encontrados por autor (guidorizzi) =",bookByAuthor_1);


console.log("\n-> executando a busca por categoria não registrado\n");
const searchByCategory_1 = new SearchByCategoryStrategy("aventura")
const booksByCategory_1 = library.search(searchByCategory_1)
console.log("livros encontrados por categoria (aventura) =",booksByCategory_1);
