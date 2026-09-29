import assert from "node:assert/strict";
import test from "node:test";
import { Book } from "../src/entities/Book.ts";
import { AuthorSearchStrategy } from "../src/strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "../src/strategies/CategorySearchStrategy.ts";
import type { SearchStrategy } from "../src/strategies/SearchStrategy.ts";

const books = [
  new Book(1, "Clean Code", "Robert Martin", "Technology", 2),
  new Book(2, "Clean Architecture", "Robert Martin", "Technology", 1),
  new Book(3, "The Hobbit", "J. R. R. Tolkien", "Fantasy", 3),
];

test("author strategy finds partial names without case sensitivity", () => {
  const strategy: SearchStrategy = new AuthorSearchStrategy();

  assert.deepEqual(strategy.search(books, "  mArTiN  "), [books[0], books[1]]);
  assert.deepEqual(strategy.search(books, "unknown"), []);
  assert.equal(books.length, 3);
});

test("category strategy can replace author strategy without changing its contract", () => {
  const strategy: SearchStrategy = new CategorySearchStrategy();

  assert.deepEqual(strategy.search(books, "TECH"), [books[0], books[1]]);
  assert.deepEqual(strategy.search(books, "fant"), [books[2]]);
  assert.deepEqual(strategy.search(books, "history"), []);
});
