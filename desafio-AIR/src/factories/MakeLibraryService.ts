import BookRepository from "../repositories/BookRepository.js";
import LoanRepository from "../repositories/LoanRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import LibraryService from "../service/LibraryService.js";

export function makeLibraryService(): LibraryService {
  const bookRepository = new BookRepository();
  const userRepository = new UserRepository();
  const loanRepository = new LoanRepository();

  return new LibraryService(bookRepository, userRepository, loanRepository);
}