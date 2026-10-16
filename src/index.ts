/**
 * @author: Bruno Benitez Forgiarini | https://github.com/Beforg
 */

import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import { FilterEnum } from "./enum/Filter.ts";
import BookRepository from "./repositories/BookRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LibraryService from "./services/LibraryService.ts";

// =======================================================================================
// Inicializando e salvando os objetos
// =======================================================================================

const books = [
    new Book("O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 5),
    new Book("1984", "George Orwell", "Distopia", 3),
    new Book("O Pequeno Príncipe", "Antoine de Saint-Exupéry", "Infantil", 4),
    new Book("O Hobbit", "J.R.R. Tolkien", "Fantasia", 2),
    new Book("A Revolução dos Bichos", "George Orwell", "Distopia", 6),
    new Book("O Guia do Mochileiro das Galáxias", "Douglas Adams", "Ficção Científica", 3),
    new Book("O Código Da Vinci", "Dan Brown", "Suspense", 5),
]

const users = [
    new User("Alice"),
    new User("Bob"),
    new User("Charlie"),
    new User("David")
]

const libraryService = new LibraryService(new BookRepository(), new UserRepository(), new LoanRepository());

// =======================================================================================
// Funções para testes 
// =======================================================================================

function printAllBooks(): void {
 for (const book of libraryService.findAllBooks() || []) {
     console.log(`ID: ${book.id}, Título: ${book.title}, Autor: ${book.author}, Categoria: ${book.category}, Quantidade: ${book.quantity}`);
 }
 console.log("\n");
}


function printBooksFound(booksFound: Book[] | null): void {
    console.log("\n");
    if (booksFound) {
        for (const book of booksFound) {
            console.log(`ID: ${book.id}, Título: ${book.title}, Autor: ${book.author}, Categoria: ${book.category}, Quantidade: ${book.quantity}`);
        }
    } else {
        console.log("No books found.");
    }
}


// =======================================================================================
// Execução dos testes
// =======================================================================================

libraryService.registerBook(books);
libraryService.registerUser(users);
 
console.log("Livros disponíveis:");

printAllBooks();
console.log("=================== ALUGANDO UM LIVRO ===================");
const loan = libraryService.loanBook(1, 1);
const loan2 = libraryService.loanBook(2, 1); 
console.log(`Empréstimo registrado: ID do Empréstimo: ${loan?.id}, ID do Usuário: ${loan?.userId}, ID do Livro: ${loan?.bookId}`);
printAllBooks();
console.log("=================== DEVOLVENDO UM LIVRO ===================");
libraryService.givenBackBook(1, 1);
printAllBooks();
console.log("=================== DEVOLVENDO OUTRO LIVRO ===================");
libraryService.givenBackBookByLoanId(loan2!.id);
libraryService.loanBook(3, 4);
libraryService.loanBook(4, 4);
libraryService.loanBook(1, 4); // produz erro pelo estoque
printAllBooks();

const booksFound = libraryService.searchBook("Dist", FilterEnum.CATEGORY);
printBooksFound(booksFound);
const booksFound2 = libraryService.searchBook("1984", FilterEnum.TITLE);
printBooksFound(booksFound2);
const booksFound3 = libraryService.searchBook("George Orwell", FilterEnum.AUTHOR);
printBooksFound(booksFound3);