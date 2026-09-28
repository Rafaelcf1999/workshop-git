import assert from "node:assert/strict";
import { test } from "node:test";
import { Book } from "../src/entities/Book.ts";
import { Loan } from "../src/entities/Loan.ts";
import { User } from "../src/entities/User.ts";
import { BookRepository } from "../src/repositories/BookRepository.ts";
import { LoanRepository } from "../src/repositories/LoanRepository.ts";
import { UserRepository } from "../src/repositories/UserRepository.ts";
import { LibraryService } from "../src/services/LibraryService.ts";
import { AuthorSearchStrategy } from "../src/strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "../src/strategies/CategorySearchStrategy.ts";
import type { SearchStrategy } from "../src/strategies/SearchStrategy.ts";

function setup(quantity = 2) {
  const books = new BookRepository();
  const users = new UserRepository();
  const loans = new LoanRepository();
  const library = new LibraryService(books, users, loans);
  const book = new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", quantity);
  const user = new User(1, "Ana");
  library.registerBook([book]);
  library.registerUser([user]);

  return { books, users, loans, library, book, user };
}

test("LibraryService cadastra listas de livros e usuários", () => {
  const { library, books, users, book, user } = setup();
  const newBooks = [
    new Book(2, "O Cortiço", "Aluísio Azevedo", "Romance", 1),
    new Book(3, "Papéis Avulsos", "Machado de Assis", "Contos", 1),
  ];
  const newUsers = [new User(2, "Pedro"), new User(3, "Maria")];
  library.registerBook(newBooks);
  library.registerUser(newUsers);

  assert.deepEqual(books.findAll(), [book, ...newBooks]);
  assert.deepEqual(users.findAll(), [user, ...newUsers]);
});

test("registerBook trata duplicidade e interrompe a lista no primeiro erro", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library, books, book } = setup();
  const second = new Book(2, "O Cortiço", "Aluísio Azevedo", "Romance", 1);
  const third = new Book(3, "Papéis Avulsos", "Machado de Assis", "Contos", 1);

  assert.doesNotThrow(() => library.registerBook([second, book, third]));

  assert.deepEqual(books.findAll(), [book, second]);
  assert.equal(errorLog.mock.callCount(), 1);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("Book already exists")]);
});

test("registerUser trata duplicidade e interrompe a lista no primeiro erro", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library, users, user } = setup();
  const second = new User(2, "Pedro");

  assert.doesNotThrow(() => library.registerUser([second, user, new User(3, "Maria")]));

  assert.deepEqual(users.findAll(), [user, second]);
  assert.equal(errorLog.mock.callCount(), 1);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("User already exists")]);
});

test("loanBook registra o empréstimo e decrementa uma cópia", () => {
  const { library, book, loans } = setup();

  library.loanBook(1, 1);

  assert.equal(book.getQuantity(), 1);
  assert.deepEqual(loans.findAll(), [new Loan(1, 1)]);
});

test("loanBook trata falta de estoque sem criar empréstimo", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library, book, loans } = setup(0);

  assert.doesNotThrow(() => library.loanBook(1, 1));

  assert.equal(book.getQuantity(), 0);
  assert.deepEqual(loans.findAll(), []);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("No copies available")]);
});

test("loanBook duplicado preserva o estoque e o empréstimo original", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library, book, loans } = setup();
  library.loanBook(1, 1);

  assert.doesNotThrow(() => library.loanBook(1, 1));

  assert.equal(book.getQuantity(), 1);
  assert.deepEqual(loans.findAll(), [new Loan(1, 1)]);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("Loan already exists")]);
});

for (const method of ["loanBook", "giveBackBook"] as const) {
  test(`${method} trata usuário inexistente sem alterar estoque ou empréstimos`, (t) => {
    const errorLog = t.mock.method(console, "error", () => {});
    const { library, book, loans } = setup();

    assert.doesNotThrow(() => library[method](99, 1));

    assert.equal(book.getQuantity(), 2);
    assert.deepEqual(loans.findAll(), []);
    assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("User not found")]);
  });

  test(`${method} trata livro inexistente sem alterar estoque ou empréstimos`, (t) => {
    const errorLog = t.mock.method(console, "error", () => {});
    const { library, book, loans } = setup();

    assert.doesNotThrow(() => library[method](1, 99));

    assert.equal(book.getQuantity(), 2);
    assert.deepEqual(loans.findAll(), []);
    assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("Book not found")]);
  });
}

test("giveBackBook restaura uma cópia e permite um novo empréstimo", () => {
  const { library, book, loans } = setup(1);
  library.loanBook(1, 1);

  library.giveBackBook(1, 1);

  assert.equal(book.getQuantity(), 1);
  assert.deepEqual(loans.findAll(), []);
  library.loanBook(1, 1);
  assert.equal(book.getQuantity(), 0);
  assert.deepEqual(loans.findAll(), [new Loan(1, 1)]);
});

test("giveBackBook trata devolução inexistente e repetida sem aumentar estoque", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library, book, loans } = setup();

  assert.doesNotThrow(() => library.giveBackBook(1, 1));
  assert.equal(book.getQuantity(), 2);
  library.loanBook(1, 1);
  library.giveBackBook(1, 1);
  assert.doesNotThrow(() => library.giveBackBook(1, 1));

  assert.equal(book.getQuantity(), 2);
  assert.deepEqual(loans.findAll(), []);
  assert.equal(errorLog.mock.callCount(), 2);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("Loan not found")]);
  assert.deepEqual(errorLog.mock.calls[1].arguments, [new Error("Loan not found")]);
});

test("um usuário não pode devolver o empréstimo de outro", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library, book, loans } = setup();
  library.registerUser([new User(2, "Pedro")]);
  library.loanBook(1, 1);

  library.giveBackBook(2, 1);

  assert.equal(book.getQuantity(), 1);
  assert.deepEqual(loans.findAll(), [new Loan(1, 1)]);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("Loan not found")]);
});

test("usuários diferentes podem emprestar as cópias disponíveis do mesmo livro", () => {
  const { library, book, loans } = setup();
  library.registerUser([new User(2, "Pedro")]);
  library.loanBook(1, 1);
  library.loanBook(2, 1);

  assert.equal(book.getQuantity(), 0);
  assert.deepEqual(loans.findAll(), [new Loan(1, 1), new Loan(2, 1)]);
  library.giveBackBook(1, 1);
  assert.equal(book.getQuantity(), 1);
  assert.deepEqual(loans.findAll(), [new Loan(2, 1)]);
});

test("search delega as buscas por autor e categoria às estratégias", () => {
  const { library, book } = setup();

  assert.deepEqual(library.search(new AuthorSearchStrategy(), "Machado de Assis"), [book]);
  assert.deepEqual(library.search(new CategorySearchStrategy(), "Romance"), [book]);
  assert.deepEqual(library.search(new CategorySearchStrategy(), "Poesia"), []);
});

test("search aceita um novo critério sem alterar LibraryService", () => {
  const { library, book } = setup();
  class TitleSearchStrategy implements SearchStrategy {
    public search(books: Book[], query: string): Book[] {
      return books.filter((item) => item.title === query);
    }
  }

  assert.deepEqual(library.search(new TitleSearchStrategy(), "Dom Casmurro"), [book]);
});

test("search trata repositório vazio e retorna lista vazia", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const library = new LibraryService(
    new BookRepository(), new UserRepository(), new LoanRepository(),
  );

  assert.deepEqual(library.search(new AuthorSearchStrategy(), "Machado de Assis"), []);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [new Error("No books registered")]);
});

test("search trata erros da própria estratégia sem propagar a exceção", (t) => {
  const errorLog = t.mock.method(console, "error", () => {});
  const { library } = setup();
  const error = new Error("Search failed");
  const strategy: SearchStrategy = {
    search() {
      throw error;
    },
  };

  assert.deepEqual(library.search(strategy, "Romance"), []);
  assert.deepEqual(errorLog.mock.calls[0].arguments, [error]);
});
