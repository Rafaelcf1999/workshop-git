import { Book } from "./entities/Book.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { LibraryService } from "./services/LibraryService.ts";
import { SearchByAuthor } from "./strategies/SearchByAuthor.ts";
import { SearchByCategory } from "./strategies/SearchByCategory.ts";
import { SearchByTitle } from "./strategies/SearchByTitle.ts";

console.log("==================================================");
console.log("=== SISTEMA DE GERENCIAMENTO DE BIBLIOTECA ===");
console.log("==================================================\n");

// 1. Instanciar repositórios concretos e o serviço da biblioteca
console.log("1. Inicializando repositórios e serviço...");
const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const loanRepository = new LoanRepository();

const libraryService = new LibraryService(
  bookRepository,
  userRepository,
  loanRepository
);
console.log("-> Repositórios e LibraryService instanciados com sucesso!\n");

// 2. Cadastrar pelo menos 2 livros e 2 usuários
console.log("2. Cadastrando livros e usuários...");
const book1 = new Book(1, "Clean Code", "Robert C. Martin", "Tecnologia", 3);
const book2 = new Book(2, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 2);
const book3 = new Book(3, "Refactoring", "Martin Fowler", "Tecnologia", 1);

const user1 = new User(101, "Ana Silva");
const user2 = new User(102, "Bruno Souza");

libraryService.registerBook([book1, book2, book3]);
libraryService.registerUser([user1, user2]);
console.log("-> 3 Livros e 2 Usuários cadastrados com sucesso!\n");

// 3. Realizar um empréstimo
console.log("3. Realizando empréstimo do livro 'Clean Code' (ID: 1) para 'Ana Silva' (ID: 101)...");
console.log(`- Cópias de 'Clean Code' antes do empréstimo: ${book1.getQuantity()}`);
libraryService.loanBook(101, 1);
console.log(`- Cópias de 'Clean Code' após o empréstimo: ${book1.getQuantity()}`);
console.log("- Empréstimos registrados no repositório:", loanRepository.findAll());
console.log("");

// 4. Fazer busca por autor e por categoria (Strategy Pattern)
console.log("4. Executando buscas com o padrão Strategy...");

console.log("\n--- Busca por Autor: 'Robert C. Martin' ---");
const authorStrategy = new SearchByAuthor("Robert C. Martin");
const booksByAuthor = libraryService.search(authorStrategy);
console.log("Livros encontrados:", booksByAuthor);

console.log("\n--- Busca por Categoria: 'Tecnologia' ---");
const categoryStrategy = new SearchByCategory("Tecnologia");
const booksByCategory = libraryService.search(categoryStrategy);
console.log("Livros encontrados:", booksByCategory);

console.log("\n--- Busca Extensível por Título (Nova Estratégia): 'Senhor' ---");
const titleStrategy = new SearchByTitle("Senhor");
const booksByTitle = libraryService.search(titleStrategy);
console.log("Livros encontrados:", booksByTitle);

// 5. Demonstrar devolução e tratamento de erros sem interromper a execução
console.log("\n5. Demonstrando devolução e resiliência a erros...");

console.log("\n- Devolvendo livro 'Clean Code'...");
libraryService.giveBackBook(101, 1);
console.log(`- Cópias de 'Clean Code' após devolução: ${book1.getQuantity()}`);
console.log("- Lista de empréstimos atualizada:", loanRepository.findAll());

console.log("\n- Testando tratamento de erro (tentando buscar usuário inexistente ao realizar empréstimo):");
libraryService.loanBook(999, 1); // Usuário 999 não existe

console.log("\n==================================================");
console.log("=== EXECUÇÃO FINALIZADA COM SUCESSO ===");
console.log("==================================================");

