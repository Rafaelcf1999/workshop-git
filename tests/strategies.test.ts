import assert from "node:assert/strict";
import { test } from "node:test";
import { Book } from "../src/entities/Book.ts";
import { AuthorSearchStrategy } from "../src/strategies/AuthorSearchStrategy.ts";
import { CategorySearchStrategy } from "../src/strategies/CategorySearchStrategy.ts";

const books = [
  new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 2),
  new Book(2, "Papéis Avulsos", "Machado de Assis", "Contos", 1),
  new Book(3, "O Cortiço", "Aluísio Azevedo", "Romance", 1),
];

test("AuthorSearchStrategy encontra todos os livros do autor informado", () => {
  const strategy = new AuthorSearchStrategy();

  assert.deepEqual(strategy.search(books, "Machado de Assis"), [books[0], books[1]]);
});

test("CategorySearchStrategy encontra todos os livros da categoria informada", () => {
  const strategy = new CategorySearchStrategy();

  assert.deepEqual(strategy.search(books, "Romance"), [books[0], books[2]]);
});

test("as buscas retornam lista vazia quando não há resultados", () => {
  assert.deepEqual(new AuthorSearchStrategy().search(books, "Clarice Lispector"), []);
  assert.deepEqual(new CategorySearchStrategy().search(books, "Poesia"), []);
  assert.deepEqual(new AuthorSearchStrategy().search([], "Machado de Assis"), []);
  assert.deepEqual(new CategorySearchStrategy().search([], "Romance"), []);
});

test("as buscas usam correspondência exata do autor e da categoria", () => {
  assert.deepEqual(new AuthorSearchStrategy().search(books, "Machado"), []);
  assert.deepEqual(new CategorySearchStrategy().search(books, "romance"), []);
});
