import {Book } from "../entities/Book.ts";
import {User} from "../entities/User.ts";
import {Loan } from "../entities/Loan.ts";

export interface SearchStrategy {
    search(termo: string):Book[] | User[] | Loan[];
}

//livros
//procurar o ID
export class SearchBookById implements SearchStrategy {
    constructor(private livros: Book[]) {}

    search(termo: string): Book[] {
        const resultado: Book[] = [];
        
        for (const livro of this.livros){
            if (livro.id === Number(termo)) {
                resultado.push(livro);
            }}return resultado;
    }}
//procurar o titulo
export class SearchBookByTitle implements SearchStrategy {
    constructor(private livros: Book[]) {}

    search(termo: string): Book[] {
        const resultado: Book[] = [];

        for (const livro of this.livros) {
            if (livro.title === termo) {
                resultado.push(livro);
            }}return resultado;
    }}

//procurar o autor
export class SearchBookByAuthor implements SearchStrategy {
    constructor(private livros: Book[]) {}

    search(termo: string): Book[] {
        const resultado: Book[] = [];

        for (const livro of this.livros) {
            if (livro.author === termo) {
                resultado.push(livro);
            }}return resultado;
    }}

//procurar a categoria
export class SearchBookByCategory implements SearchStrategy {
    constructor(private livros: Book[]) {}

    search(termo: string): Book[] {
        const resultado: Book[] = [];

        for (const livro of this.livros) {
            if (livro.category === termo) {
                resultado.push(livro);
            }}return resultado;
    }}

    //usuario
    //procurar o ID
    export class SearchUserById implements SearchStrategy {
        constructor(private usuarios: User[]) {}

    search(termo: string): User[] {
        const resultado: User[] = [];

        for (const usuario of this.usuarios) {
            if (usuario.id === Number(termo)) {
                resultado.push(usuario);
            }}return resultado;
    }}
    
    //procurar o nome
    export class SearchUserByName implements SearchStrategy {
        constructor(private usuarios: User[]) {}

    search(termo: string): User[] {
        const resultado: User[] = [];

        for (const usuario of this.usuarios) {
            if (usuario.name === termo) {
                resultado.push(usuario);
            }}return resultado;
    }}

    //emprestimo
    //procurar o usuario
    export class SearchLoanByUser implements SearchStrategy {
        constructor(private emprestimos: Loan[]) {}

    search(termo: string): Loan[] {
        const resultado: Loan[] = [];

        for (const emprestimo of this.emprestimos) {
            if (emprestimo.user_id === Number(termo)) {
                resultado.push(emprestimo);
            }}return resultado;
    }}

    //procurar o livro
    export class SearchLoanByBook implements SearchStrategy {
        constructor(private emprestimos: Loan[]) {}

    search(termo: string): Loan[] {
        const resultado: Loan[] = [];

        for (const emprestimo of this.emprestimos) {
            if (emprestimo.book_id === Number(termo)) {
                resultado.push(emprestimo);
            }}return resultado;
    }}