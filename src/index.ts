//deve demonstrar o funcionamento do sistema
//instaciar o LibraaryService passando os reposit´roios concretos
//cadastro mínimo de 2 livros e 2 usuários
//realização de um empréstimo
//uma busca por autro e outra por categoria
//exibir os resultados no console

import { LibraryService } from "./services/LibraryService.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { SearchByAuthorStrategy } from "./strategies/SearchByAuthorStrategy.ts";
import { SearchByCategoryStrategy } from "./strategies/SearchByCategoryStrategy.ts";

const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();
const libraryService = new LibraryService(bookRepository, userRepository, loanRepository);

function printBooks(books: Book[]): void{
    for(const book of books){
        console.log(`Book registered:`);
        console.log(` Title - ${book.title}`);
        console.log(` Author - ${book.author}`);
        console.log(` Category - ${book.category}`);
        console.log(` Id - ${book.id}`);
    }
}

function printUsers(users: User[]): void{
    for(const user of users){
        console.log(`User registered:`);
        console.log(`  Name - ${user.name}`);
        console.log(`  Id - ${user.id}`);
    }
}

function printSearch(term : string, result: Book[]): void{
    if(result.length === 0){
        console.log(`Search for ${term} returned no results`);
        return;
    }
    const num = result.length === 1 ? "result" : " results";
    console.log(`Search for ${term} returned ${result.length} ${num}:`);
    result.forEach(book => {
        console.log(` Title - ${book.title}`);
        console.log(` Author - ${book.author}`);
        console.log(` Category - ${book.category}`);
        console.log("");
        }
    );
}

console.log("\n=====  Book registration  =====");
const books: Book[] = [
    new Book(1, "O Cão dos Baskervilles", "Arthur Conan Doyle", "Ficção Policial", 2),
    new Book(2, "Uma Breve História do Tempo", "Stephen Hawking", "Divulgação Científica", 1),
    new Book(3, "A Hora da Estrela", "Clarice Lispector", "Ficção", 3),];
libraryService.registerBook(books);
printBooks(books);

console.log("\n=====  User registration  =====");
const users: User[] = [
    new User(1, "Kévna"),
    new User(2, "Késia"),];
libraryService.registerUser(users);
printUsers(users);

console.log("\n=====  Loan  =====");
const loan = libraryService.loanBook(1, 1);
if (loan) {
    console.log(`Loan completed:`);
    console.log(` User ${loan.userId} borrowed book ${loan.bookId}`);
}

console.log("\n=====  Search by author  =====");
printSearch("Stephen Hawking", libraryService.search(new SearchByAuthorStrategy(), "Stephen Hawking"));


console.log("\n=====  Search by category  =====");
printSearch("Ficção", libraryService.search(new SearchByCategoryStrategy(), "Ficção"));
console.log("");