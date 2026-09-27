 import Book from "./entities/Book.ts";
import User from "./entities/User.ts";
import BookRepository from "./repositories/BookRepository.ts";
import LoanRepository from "./repositories/LoanRepository.ts";
import UserRepository from "./repositories/UserRepository.ts";
import LibraryService from "./services/LibraryService.ts";
import SearchByAuthor from "./strategies/SearchByAuthor.ts";
import SearchByCategory from "./strategies/SearchByCategory.ts";

const biblioteca =  new LibraryService(new BookRepository, new UserRepository, new LoanRepository);

const livro1 = new Book(1, "O Hobbit", "J. R. R. Tolkien", "Fantasia", 2);
const livro2 = new Book(2, "Senhor dos Anéis", "J. R. R. Tolkien", "Fantasia", 10);
const livro3 = new Book(3, "O Retrato de Dorian Gray", "Oscar Wilde", "Literatura Gótica", 4);

const user1 = new User(1, "Larissa");
const user2 = new User(2, "Julie");
const user3 = new User(3, "Tito");

console.log("testes-------------------")

console.log(biblioteca);


biblioteca.registerBook(livro1);
biblioteca.registerBook(livro2);
biblioteca.registerBook(livro3);

biblioteca.registerUser(user1);
biblioteca.registerUser(user2);
biblioteca.registerUser(user3);



//console.log(biblioteca);
console.log(biblioteca.books);
console.log(biblioteca.users);

console.log("emprestimos-----------")
biblioteca.loanBook(1, 2);
biblioteca.loanBook(2, 3);
biblioteca.loanBook(3, 1);

console.log(biblioteca.loans);

console.log(biblioteca.books);

biblioteca.giveBackBook(3, 1);

console.log(biblioteca.loans);

console.log(biblioteca.books);

biblioteca.loanBook(1, 1);

console.log(biblioteca.loans);
console.log(biblioteca.books);

biblioteca.loanBook(1, 1); 

console.log(biblioteca.loans);
console.log(biblioteca.books);

biblioteca.loanBook(2, 1); 

console.log(biblioteca.loans);
console.log(biblioteca.books);

biblioteca.loanBook(5, 1); 
biblioteca.loanBook(4, 1); 
biblioteca.loanBook(4, 4); 
biblioteca.loanBook(3, 1); 

console.log(biblioteca.loans);
console.log(biblioteca.books);

console.log("DEVOLUCAO------------------");
biblioteca.giveBackBook(1, 2);

console.log(biblioteca.loans);
console.log(biblioteca.books);

biblioteca.giveBackBook(1, 2);

console.log(biblioteca.loans);
console.log(biblioteca.books);

biblioteca.giveBackBook(5, 2);
biblioteca.giveBackBook(3, 5);

console.log(biblioteca.loans);
console.log(biblioteca.books);

console.log("cadastro---------------")


const livro4 = new Book(3, "fsdfdf", "fdfdfdfd fd", "Lfdfdfda", 5);
const user4 = new User(3, "Maria");

biblioteca.registerUser(user4);
biblioteca.registerBook(livro4);


console.log(biblioteca.users);
console.log(biblioteca.books);

console.log("search-----------------")

const buscaAutor = new SearchByAuthor(); 
const buscaCategoria = new SearchByCategory(); 

console.log(biblioteca.search(buscaAutor, "J. R. R. Tolkien"));
console.log(biblioteca.search(buscaCategoria, "Literatura Gótica"));