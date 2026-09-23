import { Book } from "./entities/Book.ts";
import { Loan } from "./entities/Loan.ts";
import { User } from "./entities/User.ts";
import { BookRepository } from "./repositories/BookRepository.ts";
import { LoanRepository } from "./repositories/LoanRepository.ts";
import { UserRepository } from "./repositories/UserRepository.ts";

const newRepoBook = new BookRepository();
const newRepoLoan = new LoanRepository();
const newRepoUser = new UserRepository();

try {
  const book = new Book(
    1,
    "Entendendo Algoritmos",
    "Aditya Y. Bhargava",
    "Programação",
    1,
  );

  const user = new User(1, "Gustavo");
  const loan: Loan = new Loan(user.id, book.id);

  book.increase();

  newRepoBook.save(book);

  console.log("Buscando por ID:", newRepoBook.findById(1));
  console.log("Verificando todos os livros:", newRepoBook.findAll());

  newRepoUser.save(user);

  newRepoLoan.save(loan);

  console.log(newRepoLoan.remove(1, 1));

  console.log("Após a remoção:", newRepoLoan.loanView);
  // newRepoLoan.remove(1, 1); // retorna erro
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
