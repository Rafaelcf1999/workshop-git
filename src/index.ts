import { Book } from "./entities/book.entity.ts";
import { User } from "./entities/user.entity.ts";
import { jsonMock } from "./mocks/mockjson.ts";
import { BookRepository } from "./repositories/book.repository.ts";
import { LoanRepository } from "./repositories/loan.repository.ts";
import { UserRepository } from "./repositories/user.repository.ts";
import { LibraryService } from "./services/library.service.ts";
import { SearchAuthor } from "./strategies/searchAuthor.strategy.ts";
import { SearchCategory } from "./strategies/searchCategory.strategy.ts";

const app = () => {
  const dados = JSON.parse(jsonMock);
  const bookRepository = new BookRepository();
  const userRepository = new UserRepository();
  const loanRepository = new LoanRepository();

  const library = new LibraryService(
    bookRepository,
    userRepository,
    loanRepository,
  );

  //* Registrar livros */ ------
  const books = dados.books.map(
    (book: {
      id: number;
      title: string;
      author: string;
      category: string;
      quantity: number;
    }) =>
      new Book(book.id, book.title, book.author, book.category, book.quantity),
  );

  const [book1, book2, book3, book4, book5] = books;

  const saveBooks: Array<Book> = [];
  saveBooks.push(book1);
  saveBooks.push(book2);
  saveBooks.push(book3);
  saveBooks.push(book4);

  library.registerBook(saveBooks)
  console.log("\n Livros cadastrados:", bookRepository.findAll());

  //* Registrar usuários */ ------
  const users = dados.users.map(
    (user: { id: number; name: string }) => new User(user.id, user.name),
  );

  const [user1, user2] = users;

  const saveUser: Array<User> = [];
  saveUser.push(user1);
  saveUser.push(user2);

  library.registerUser(saveUser);
  console.log("\n Usuários cadastrados:", userRepository.findAll());

  //* Realizar empréstimos de livros */ ------
  library.loanBook(user1.id, book2.id);
  library.loanBook(user2.id, book2.id);
  library.loanBook(user1.id, book5.id); // Livro não desta disponível para empréstimo, porque não foi registrado.

  console.log("\n Empréstimos realizados:", loanRepository.findAll());

  //* Devolução de um livro */ ------
  library.giveBackBook(user1.id, book2.id);


  console.log("\n Devolução realizada:", loanRepository.findAll());

  //* Pesquisas por autor e categoria */ ------
  const searchAuthor = new SearchAuthor();
  console.log("\n Pesquisa pelo autor: Aurthur Conan Doyle", library.search(searchAuthor, "Arthur Conan Doyle"));
  console.log("\n Pesquisa pelo autor: George Orwell", library.search(searchAuthor, "George Orwell"));

  const searchCategory = new SearchCategory();
  console.log("\n Pesquisa pela categoria: drama", library.search(searchCategory, "drama"));
}

app();