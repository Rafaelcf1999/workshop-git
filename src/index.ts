import Book from "./entities/Book.ts";
import Loan from "./entities/Loan.ts";
import User from "./entities/User.ts";
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

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();
const libraryService = new LibraryService(bookRepository, userRepository, loanRepository);

// =======================================================================================
// Funções para testes 
// =======================================================================================

function printBooks(): void {
 for (const book of bookRepository.findAll()) {
     console.log(`ID: ${book.id}, Título: ${book.title}, Autor: ${book.author}, Categoria: ${book.category}, Quantidade: ${book.quantity}`);
 }
}
// =======================================================================================
// Execução dos testes
// =======================================================================================

libraryService.registerBook(books);
libraryService.registerUser(users);
 
console.log("Livros disponíveis:");

printBooks();
console.log("====== ALUGANDO UM LIVRO ======");
const loan = libraryService.loanBook(1, 1);
const loan2 = libraryService.loanBook(1, 1); // Testando erro
console.log(`Empréstimo registrado: ID do Empréstimo: ${loan?.id}, ID do Usuário: ${loan?.userId}, ID do Livro: ${loan?.bookId}`);
printBooks();
console.log("====== DEVOLVENDO UM LIVRO ======");
libraryService.givenBackBook(1, 1);
printBooks();

