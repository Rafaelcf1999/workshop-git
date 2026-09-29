import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import BookRepository from "./repositories/BookRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import LibraryService from "./services/LibraryService.ts";
import SearchBookByAuthor from "./strategies/SearchBookByAuthor.ts";
import SearchBookByCategory from "./strategies/SearchBookByCategory.ts";
import SearchBookByTitle from "./strategies/SearchBookByTitle.ts";

console.log("INICIANDO SISTEMA DA BIBLIOTECA\n");

// instanciando os repositories e o service
const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();

const library = new LibraryService(bookRepo, userRepo, loanRepo);

// inserindo livros e usuarios
const books = [
    new Book(1, "Clean Architecture", "Robert C. Martin", "Tecnologia", 3),
    new Book(2, "Sapiens", "Yuval Noah Harari", "História", 2),
    new Book(3, "The Hobbit", "J.R.R. Tolkien", "Ficcção", 5)
];

library.registerBook(books);

const users = [
    new User(1, "Thiago Markendorf"),
    new User(2, "Henrique Markendorf")
];

library.registerUser(users);

console.log("Livros e usuários cadastrados!");

// realizando emprestimo
library.loanBook(1, 2); 
console.log("Empréstimo realizado com sucesso!");

library.loanBook(999, 1); // caso invalido

library.giveBackBook(2, 1); // caso invalido (tentando devolver um livro que nao possui)

library.giveBackBook(1, 2);
console.log("Devolução realizada com sucesso!\n");

// instanciando as strategies
const searchByTitle = new SearchBookByTitle();
const searchByAuthor = new SearchBookByAuthor();
const searchByCategory = new SearchBookByCategory();


//testes das strategies
//buscando pelo titulo 'sapiens'
console.log("BUSCA POR TÍTULO:");

const titleResults = library.search(searchByTitle, "Sapiens");
for (const book of titleResults) {
    console.log(`- ${book.title} (Estoque: ${book.getQuantity()})`);
}

//buscando por autor 'tolkien'
console.log("\nBUSCA POR AUTOR:");
const authorResults = library.search(searchByAuthor, "Tolkien");
for (const book of authorResults) {
    console.log(`- ${book.title} (Estoque: ${book.getQuantity()})`);
}

//buscando por categoria inexistente 'ficção cientifica'
console.log("\nBUSCA POR CATEGORIA:");
const categoryResults1 = library.search(searchByCategory, "Ficção Científica");
for (const book of categoryResults1) {
    console.log(`- ${book.title} (Autor: ${book.author})`);
}

//buscando por categoria válida 'ficção cientifica'
console.log("\nBUSCA POR CATEGORIA:");
const categoryResults2 = library.search(searchByCategory, "História");
for (const book of categoryResults2) {
    console.log(`- ${book.title} (Autor: ${book.author})`);
}

