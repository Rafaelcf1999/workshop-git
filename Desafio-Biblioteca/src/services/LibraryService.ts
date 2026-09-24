import IBookRepository from "../repositories/interfaces/IBookRepository";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import ILoanRepository from "../repositories/interfaces/ILoanRepository";
import Book from "../entities/Book";
import User from "../entities/User";


export default class LibraryService{

    public books!: IBookRepository;
    public users!: IUserRepository;
    public loans!: ILoanRepository;

    constructor(books: IBookRepository, users: IUserRepository, loans: ILoanRepository){
        this.books = books;
        this.users = users;
        this.loans = loans;
    }

    registerBook(book: Book){
         
    }

    registerUser(user: User){

    }

    loanBook(userid: number, bookid: number){


       

    }

    giveBackBook(userid: number, bookid: number){

    }

    search(){

    }
}