import assert from "node:assert/strict";
import test from "node:test";
import { Book } from "../src/entities/Book.ts";
import { User } from "../src/entities/User.ts";
import { BookRepository } from "../src/repositories/BookRepository.ts";
import { LoanRepository } from "../src/repositories/LoanRepository.ts";
import { UserRepository } from "../src/repositories/UserRepository.ts";
import { LibraryService } from "../src/services/LibraryService.ts";
import { AuthorSearchStrategy } from "../src/strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "../src/strategies/CategorySearchStrategy.ts";
import type { SearchStrategy } from "../src/strategies/SearchStrategy.ts";

function captureErrors(run: (errors: unknown[]) => void): void {
  const originalError = console.error;
  const errors: unknown[] = [];
  console.error = (...messages: unknown[]) => {
    errors.push(...messages);
  };

  try {
    run(errors);
  } finally {
    console.error = originalError;
  }
}

test("LibraryService registers, lends, returns, and delegates searches", () => {
  const books = new BookRepository();
  const users = new UserRepository();
  const loans = new LoanRepository();
  const library = new LibraryService(books, users, loans);
  const cleanCode = new Book(1, "Clean Code", "Robert Martin", "Technology", 2);
  const hobbit = new Book(2, "The Hobbit", "J. R. R. Tolkien", "Fantasy", 1);

  library.registerBook([cleanCode, hobbit]);
  library.registerUser([new User(1, "Ana"), new User(2, "Bruno")]);
  library.loanBook(1, 1);

  assert.equal(cleanCode.getQuantity(), 1);
  assert.deepEqual(
    loans.findAll().map((loan) => [loan.userId, loan.bookId]),
    [[1, 1]],
  );
  assert.deepEqual(library.search(new AuthorSearchStrategy(), "martin"), [cleanCode]);
  assert.deepEqual(library.search(new CategorySearchStrategy(), "fantasy"), [hobbit]);

  class TitleSearchStrategy implements SearchStrategy {
    public search(allBooks: Book[], query: string): Book[] {
      return allBooks.filter((book) => book.title.includes(query));
    }
  }

  assert.deepEqual(library.search(new TitleSearchStrategy(), "Hobbit"), [hobbit]);

  library.giveBackBook(1, 1);

  assert.equal(cleanCode.getQuantity(), 2);
  assert.deepEqual(loans.findAll(), []);
});

test("registration logs duplicate errors and continues with later entries", () => {
  const books = new BookRepository();
  const users = new UserRepository();
  const library = new LibraryService(books, users, new LoanRepository());

  captureErrors((errors) => {
    library.registerBook([
      new Book(1, "First", "A", "Fiction", 1),
      new Book(1, "Duplicate", "B", "Fiction", 1),
      new Book(2, "Second", "C", "Fiction", 1),
    ]);
    library.registerUser([
      new User(1, "Ana"),
      new User(1, "Duplicate"),
      new User(2, "Bruno"),
    ]);

    assert.equal(errors.length, 2);
  });

  assert.deepEqual(books.findAll().map((book) => book.id), [1, 2]);
  assert.deepEqual(users.findAll().map((user) => user.id), [1, 2]);
});

test("loan and return failures are logged without changing stock or loans", () => {
  const books = new BookRepository();
  const users = new UserRepository();
  const loans = new LoanRepository();
  const library = new LibraryService(books, users, loans);
  const available = new Book(1, "Available", "A", "Fiction", 2);
  const unavailable = new Book(2, "Unavailable", "B", "Fiction", 0);

  library.registerBook([available, unavailable]);
  library.registerUser([new User(1, "Ana"), new User(2, "Bruno")]);
  library.loanBook(1, 1);

  captureErrors((errors) => {
    library.loanBook(1, 1);
    library.loanBook(2, 2);
    library.loanBook(99, 1);
    library.giveBackBook(2, 1);

    assert.equal(errors.length, 4);
    assert.ok(
      errors.some(
        (error) => error instanceof Error && error.message === "No copies available",
      ),
    );
    assert.equal(available.getQuantity(), 1);
    assert.equal(unavailable.getQuantity(), 0);
    assert.equal(loans.findAll().length, 1);

    library.giveBackBook(1, 1);
    library.giveBackBook(1, 1);

    assert.equal(errors.length, 5);
  });

  assert.equal(available.getQuantity(), 2);
  assert.deepEqual(loans.findAll(), []);
});

test("search logs repository and strategy failures and returns an empty list", () => {
  const library = new LibraryService(
    new BookRepository(),
    new UserRepository(),
    new LoanRepository(),
  );

  captureErrors((errors) => {
    assert.deepEqual(library.search(new AuthorSearchStrategy(), "anything"), []);
    library.registerBook([new Book(1, "Book", "Author", "Category", 1)]);

    const failingStrategy: SearchStrategy = {
      search(): Book[] {
        throw new Error("Search failed");
      },
    };

    assert.deepEqual(library.search(failingStrategy, "anything"), []);
    assert.equal(errors.length, 2);
  });
});
