import {Book} from "./entities/Book.js";
import {User} from "./entities/User.js";
import BookRepository from "./repositories/BookRepository.js";
import UserRepository from "./repositories/UserRepository.js";
import LoanRepository from "./repositories/LoanRepository.js";
import SearchAuthorStrategy from "./strategies/SearchAuthorStrategy.js";
import SearchCategoryStrategy from "./strategies/SearchCategoryStrategy.js";
import LibraryService from "./services/LibraryService.js";

const bookRepo = new BookRepository();
const userRepo = new UserRepository();
const loanRepo = new LoanRepository();

const libraryService = new LibraryService(bookRepo, userRepo, loanRepo);

const book1 = new Book(1, "Vidas Secas", "Graciliano Ramos", "Drama", 2);
const book2 = new Book(2, "Noites Brancas", "Fiodor Dostoievski", "Romance curto", 1);
const book3 = new Book(3, "Metamorfose", "Franz Kafka", "Ficção", 3);
const book4 = new Book(4, "A Revolução dos Bichos", "George Orwell", "Ficção", 2);

const user1 = new User(10, "Agnes Ludmila");
const user2 = new User(20, "Matheus Souza");

libraryService.registerBook([book1, book2, book3, book4]);
libraryService.registerUser([user1, user2]);
console.log("  CADASTRO CONCLUIDO... \n");

const searchByAuthor = new SearchAuthorStrategy();
const searchByCategory = new SearchCategoryStrategy();
const authorResult = libraryService.search("Ramos", searchByAuthor);
console.log("Buscando por autor: " + authorResult);
console.log("\n");
const categoryResult = libraryService.search("Ficção", searchByCategory);
console.log("Buscando por categoria: " + categoryResult);
console.log("\n");


const loan = libraryService.loanBook(user2.id, book4.id);
console.log("Emprestimo realizado:", loan);
console.log("Estoque atualizado do livro:", book4.Quantity);
console.log("\n");

const loan2 = libraryService.loanBook(user1.id, book2.id);
console.log("Emprestimo realizado:", loan2);
console.log("Estoque atualizado do livro:", book2.Quantity);
console.log("\n");


libraryService.BackBook(user2.id, book4.id);
console.log("Livro Devolvido: "+ book4.title + ", quantidade em estoque: " + book4.Quantity);
libraryService.BackBook(user1.id, book2.id);
console.log("Livro Devolvido: " + book2.title + ", quantidade em estoque: " + book2.Quantity);
console.log("\n")


console.log(" TESTES CONCLUIDOS... ");