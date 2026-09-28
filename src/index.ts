import Book from './entities/Book.ts';
import User from './entities/User.ts';
import BookRepository from './repositories/BookRepository.ts';
import LoanRepository from './repositories/LoanRepository.ts';
import UserRepository from './repositories/UserRepository.ts';
import LibraryService from './services/LibraryService.ts';
import SearchByAuthor from './strategies/SearchByAuthor.ts';
import SearchByCategory from './strategies/SearchByCategory.ts';

const book = new BookRepository();
const user = new UserRepository();
const loan = new LoanRepository();
const categorySearch = new SearchByCategory();
const authorSearch = new SearchByAuthor();

const library = new LibraryService(book, user, loan);

const book1 = new Book(
  1,
  'Viagem ao Centro da Terra',
  'Julio Verne',
  'Aventura',
  50,
);

const book2 = new Book(
  2,
  'Orgulho e Preconceito',
  'Jane Austen',
  'Romance',
  20,
);

const user1 = new User(1, 'Guilherme Deon');
const user2 = new User(2, 'Conde Augustin');

const users = [user1, user2];
const books = [book1, book2];

library.registerBook(books);
console.log(book.findAll());

library.registerUser(users);
console.log(user.findAll());

library.loanBook(1, 2);
console.log(loan.findAll());

console.log(library.search('Romance', categorySearch));
console.log(library.search('Julio Verne', authorSearch));

library.giveBackBook(1, 2);
console.log(book.findById(2));
console.log(loan.findAll());
