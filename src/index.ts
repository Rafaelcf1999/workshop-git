import { Book } from "./entities/Book.ts";
import { BookRepository } from "./repositories/BookRepository.ts";

const newRepoBook = new BookRepository();

try {
  const book = new Book(
    1,
    "Entendendo Algoritmos",
    "Aditya Y. Bhargava",
    "Programação",
    1,
  );
  const book1 = new Book(
    2,
    "Entendendo Algoritmos",
    "Aditya Y. Bhargava",
    "Programação",
    1,
  );

  book.increase();

  newRepoBook.save(book);
  newRepoBook.save(book1);

  console.log("Buscando por ID:", newRepoBook.findById(2));

  console.log("Verificando todos os livros:", newRepoBook.findAll());
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
