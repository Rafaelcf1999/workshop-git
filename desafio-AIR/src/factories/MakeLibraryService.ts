import BookRepository from "../repositories/BookRepository.ts";
import LoanRepository from "../repositories/LoanRepository.ts";
import UserRepository from "../repositories/UserRepository.ts";
import LibraryService from "../service/LibraryService.ts";

export function makeLibraryService(): LibraryService {
  const bookRepository = new BookRepository();
  const userRepository = new UserRepository();
  const loanRepository = new LoanRepository();

  return new LibraryService(bookRepository, userRepository, loanRepository);
}