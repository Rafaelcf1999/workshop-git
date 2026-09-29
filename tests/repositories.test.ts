import assert from "node:assert/strict";
import test from "node:test";
import { Book } from "../src/entities/Book.ts";
import { Loan } from "../src/entities/Loan.ts";
import { User } from "../src/entities/User.ts";
import { BookRepository } from "../src/repositories/BookRepository.ts";
import { LoanRepository } from "../src/repositories/LoanRepository.ts";
import { UserRepository } from "../src/repositories/UserRepository.ts";

test("BookRepository stores books by id and rejects missing or duplicate entries", () => {
  const books = new BookRepository();
  const book = new Book(1, "Clean Code", "Robert Martin", "Technology", 2);

  assert.throws(() => books.findAll(), /No books registered/);
  assert.throws(() => books.findById(1), /not found/);

  books.save(book);

  assert.equal(books.findById(1), book);
  assert.deepEqual(books.findAll(), [book]);
  assert.throws(
    () => books.save(new Book(1, "Other", "Someone", "Technology", 1)),
    /already exists/,
  );
  assert.deepEqual(books.findAll(), [book]);
});

test("UserRepository stores users by id and rejects missing or duplicate entries", () => {
  const users = new UserRepository();
  const user = new User(1, "Ana");

  assert.throws(() => users.findAll(), /No users registered/);
  assert.throws(() => users.findById(1), /not found/);

  users.save(user);

  assert.equal(users.findById(1), user);
  assert.deepEqual(users.findAll(), [user]);
  assert.throws(() => users.save(new User(1, "Beatriz")), /already exists/);
  assert.deepEqual(users.findAll(), [user]);
});

test("LoanRepository prevents duplicate pairs and removes only the selected loan", () => {
  const loans = new LoanRepository();
  const first = new Loan(1, 1);
  const second = new Loan(1, 2);
  const third = new Loan(2, 1);

  assert.deepEqual(loans.findAll(), []);

  loans.save(first);
  loans.save(second);
  loans.save(third);

  assert.throws(() => loans.save(new Loan(1, 1)), /already exists/);
  assert.deepEqual(loans.findAll(), [first, second, third]);

  loans.remove(1, 2);

  assert.deepEqual(loans.findAll(), [first, third]);
  assert.throws(() => loans.remove(1, 2), /not found/);

  const snapshot = loans.findAll();
  snapshot.pop();
  assert.deepEqual(loans.findAll(), [first, third]);
});
