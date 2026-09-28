# Desafio: Sistema de Gerenciamento de Biblioteca

Projeto desenvolvido como desafio do bootcamp, utilizando TypeScript e conceitos de orientação a objetos e padrões de projeto.

## Tecnologias

- Node.js
- TypeScript
- Git e GitHub

## Funcionalidades

O sistema possui funcionalidades para:

- Cadastro de livros
- Cadastro de usuários
- Empréstimo de livros
- Devolução de livros
- Busca de livros por autor
- Busca de livros por categoria

## Estrutura do projeto

```text
src/
├── entities/
│   ├── Book.ts
│   ├── Loan.ts
│   └── User.ts
├── repositories/
│   ├── interfaces/
│   │   ├── IBookRepository.ts
│   │   ├── ILoanRepository.ts
│   │   └── IUserRepository.ts
│   ├── BookRepository.ts
│   ├── LoanRepository.ts
│   └── UserRepository.ts
├── services/
│   └── LibraryService.ts
├── strategies/
│   ├── SearchByAuthor.ts
│   ├── SearchByCategory.ts
│   └── SearchStrategy.ts
└── index.ts
```

## Como executar

### Instalar as dependências

```bash
npm install
```

### Executar o projeto

```bash
npm start
```

### Executar em modo de desenvolvimento

```bash
npm run dev
```

## Sobre o projeto

O projeto foi desenvolvido com o objetivo de aplicar conceitos de TypeScript, orientação a objetos, interfaces, repositórios, serviços e Strategy Pattern na construção de um sistema simples de gerenciamento de biblioteca.
