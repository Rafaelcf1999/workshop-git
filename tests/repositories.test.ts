import assert from "node:assert/strict";
import { test } from "node:test";
import { Book } from "../src/entities/Book.ts";
import { Loan } from "../src/entities/Loan.ts";
import { User } from "../src/entities/User.ts";
import { BookRepository } from "../src/repositories/BookRepository.ts";
import { LoanRepository } from "../src/repositories/LoanRepository.ts";
import { UserRepository } from "../src/repositories/UserRepository.ts";

test("BookRepository cadastra e consulta livros por id e em lista", () => {
  const repository = new BookRepository();
  const first = new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 2);
  const second = new Book(2, "O Cortiço", "Aluísio Azevedo", "Romance", 1);
  repository.save(first);
  repository.save(second);

  assert.equal(repository.findById(1), first);
  assert.deepEqual(repository.findAll(), [first, second]);
});

test("BookRepository rejeita id duplicado sem substituir o livro original", () => {
  const repository = new BookRepository();
  const original = new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 2);
  repository.save(original);

  assert.throws(
    () => repository.save(new Book(1, "O Cortiço", "Aluísio Azevedo", "Romance", 1)),
    { message: "Book already exists" },
  );
  assert.deepEqual(repository.findAll(), [original]);
});

test("BookRepository informa livro ausente e lista vazia", () => {
  const repository = new BookRepository();

  assert.throws(() => repository.findById(1), { message: "Book not found" });
  assert.throws(() => repository.findAll(), { message: "No books registered" });
});

test("UserRepository cadastra e consulta usuários por id e em lista", () => {
  const repository = new UserRepository();
  const first = new User(1, "Ana");
  const second = new User(2, "Pedro");
  repository.save(first);
  repository.save(second);

  assert.equal(repository.findById(1), first);
  assert.deepEqual(repository.findAll(), [first, second]);
});

test("UserRepository rejeita id duplicado sem substituir o usuário original", () => {
  const repository = new UserRepository();
  const original = new User(1, "Ana");
  repository.save(original);

  assert.throws(() => repository.save(new User(1, "Pedro")), {
    message: "User already exists",
  });
  assert.deepEqual(repository.findAll(), [original]);
});

test("UserRepository informa usuário ausente e lista vazia", () => {
  const repository = new UserRepository();

  assert.throws(() => repository.findById(1), { message: "User not found" });
  assert.throws(() => repository.findAll(), { message: "No users registered" });
});

test("LoanRepository começa sem empréstimos e permite combinações diferentes", () => {
  const repository = new LoanRepository();
  assert.deepEqual(repository.findAll(), []);
  const loans = [new Loan(1, 1), new Loan(1, 2), new Loan(2, 1)];
  loans.forEach((loan) => repository.save(loan));

  assert.deepEqual(repository.findAll(), loans);
});

test("LoanRepository rejeita empréstimo duplicado", () => {
  const repository = new LoanRepository();
  const loan = new Loan(1, 1);
  repository.save(loan);

  assert.throws(() => repository.save(new Loan(1, 1)), {
    message: "Loan already exists",
  });
  assert.deepEqual(repository.findAll(), [loan]);
});

test("LoanRepository remove somente o par de usuário e livro solicitado", () => {
  const repository = new LoanRepository();
  const loans = [new Loan(1, 1), new Loan(1, 2), new Loan(2, 1)];
  loans.forEach((loan) => repository.save(loan));

  repository.remove(1, 1);

  assert.deepEqual(repository.findAll(), [loans[1], loans[2]]);
});

test("LoanRepository rejeita remoção inexistente sem alterar outros empréstimos", () => {
  const repository = new LoanRepository();
  const loan = new Loan(1, 1);
  repository.save(loan);

  assert.throws(() => repository.remove(2, 1), { message: "Loan not found" });
  assert.deepEqual(repository.findAll(), [loan]);
  repository.remove(1, 1);
  assert.throws(() => repository.remove(1, 1), { message: "Loan not found" });
  assert.deepEqual(repository.findAll(), []);
});

test("alterar a lista retornada não altera os empréstimos armazenados", () => {
  const repository = new LoanRepository();
  const loan = new Loan(1, 1);
  repository.save(loan);
  repository.findAll().pop();

  assert.deepEqual(repository.findAll(), [loan]);
});
