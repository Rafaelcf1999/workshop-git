import { Book } from "../entities/Book.ts";
import { User } from "../entities/User.ts";
import { Loan } from "../entities/Loan.ts";
import type {IBookRepository} from '../repositories/interfaces/IBookRepository.ts'
import type {IUserRepository} from '../repositories/interfaces/IUserRepository.ts'
import type {ILoanRepository} from '../repositories/interfaces/ILoanRepository.ts'
import type { SearchStrategy } from "../strategies/SearchStrategy.ts";

export class LibraryService{
    constructor(
        protected books: IBookRepository,
        protected users: IUserRepository,
        protected loans: ILoanRepository
    ){}
    registerBook(booksList: Book[]): void{
        try{
            for(let book of booksList){
                this.books.save(book);
            }
        }catch(e){
            console.log(e);
        }
    }
    registerUser(usersList: User[]): void{
        try{
            for(let user of usersList){
                this.users.save(user);
            }
        }catch(e){
            console.log(e);
        }
    }
    loanBook(loan: Loan): void{
        try{
            const user = this.users.findById(loan.userId);
            const book = this.books.findById(loan.bookId);
            if(user && book){
                book.decrease();
                this.loans.save(loan);
            }
        }catch(e){
            console.log(e);
        }
    }
    giveBackBook(loan: Loan): void{
        try{
            const user = this.users.findById(loan.userId);
            const book = this.books.findById(loan.bookId);
            if(user && book){
                book.increase();
                this.loans.remove(loan);
            }
        }catch(e){
            console.log(e);
        }
    }
    search(value: string, searchType: SearchStrategy): Book[] | undefined{
        try{
            return searchType.search(value);
        }catch(e){
            console.log(e);
        }
    }
} 