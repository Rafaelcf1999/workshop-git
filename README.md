# Sistema de Gerenciamento de Biblioteca

Desafio de backend desenvolvido em TypeScript aplicando boas práticas de Programação Orientada a Objetos, Padrões de Projeto (Repository e Strategy), Injeção de Dependências e Tratamento de Erros.

## Tecnologias

- **Node.js**
- **TypeScript**

## Arquitetura e Padrões de Projeto

- **Entities (`src/entities/`)**: Representações do domínio (`Book`, `User`, `Loan`).
- **Repository Pattern (`src/repositories/`)**: Desacoplamento entre persistência de dados e regras de negócio (`IBookRepository`, `IUserRepository`, `ILoanRepository`).
- **Strategy Pattern (`src/strategies/`)**: Permite adicionar novos critérios de busca sem alterar o código existente (Open/Closed Principle).
- **Dependency Injection (`src/services/LibraryService.ts`)**: O serviço principal depende exclusivamente de abstrações (interfaces dos repositórios).
- **Tratamento de Erros**: Erros lançados nas camadas de repositório/entidade e capturados internamente pelo serviço via `console.error`.

## Como Executar

### Pré-requisitos
- Node.js v24.10+

### Execução

```bash
npm start
```

Para rodar com live-reload (watch mode):

```bash
npm run dev
```

