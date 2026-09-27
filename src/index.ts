import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import {SearchBookByAuthor, SearchBookByCategory} from "./strategies/SearchStrategy.ts";

const RepositorioLivros = new BookRepository();
const RepositorioUsuarios = new UserRepository();
const RepositorioEmprestimos = new LoanRepository();
const biblioteca = new LibraryService(
    RepositorioLivros,
    RepositorioUsuarios,
    RepositorioEmprestimos );

//cadastrando 2 livros
const livros= [
    new Book (1, "Noites Brancas", "Fiódor Dostoiévski", "Romance", 138), //referência ao livro
    new Book (2, "A paixão segundo G.H.", "Clarice Lispector", "Romance", 2)
]

//os usuários
const usuarios = [
     new User (1, "Ana Carolina"),
    new User (2, "Marina")
]

biblioteca.registerBook(livros);
biblioteca.registerUser(usuarios);
biblioteca.loanBook(1,1);


//procurar pelo autor e categoria
const buscarAutor = new SearchBookByAuthor(livros);
const retornaAutor= biblioteca.search("Fiódor Dostoiévski", buscarAutor);
console.log(retornaAutor);

const buscarCategoria = new SearchBookByCategory(livros);
const retornaCategoria= biblioteca.search("Romance", buscarCategoria);
console.log(retornaCategoria);