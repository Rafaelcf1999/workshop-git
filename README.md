# Sistema de Gerenciamento de Biblioteca
Uma aplicação desenvolvida em TypeScript para gerenciamento de biblioteca, aplicando Clean Architecture, princípios SOLID e padrões de projeto para garantir consistência de estoque e controle de empréstimos.

----
## Funcionalidades

- **Cadastro de livros e usuários**: Armazenamento seguro de dados com validação de IDs duplicados
- **Controle de empréstimos**: Empréstimo de livros com verificação de estoque e prevencão de duplicidade
- **Devolução de livros**: Remoção de registro de empréstimo e restauração automática do estoque
- **Busca por estratégias**: Pesquisa desacoplada por autor, categoria ou novas estratégias de filtro
- **Tratamento defensivo de erros**: Captura de exceções usando `instanceof Error`
- **Consistência de dados**: Operações com garantia de atomicidade no estoque em caso de falhas

----
## Tecnologias utilizadas

- TypeScript
- Node.js (com suporte a módulos ESM nativos)
- Map & Array (Estruturas de dados em memória)

----
## Estrutura do Projeto

```
biblioteca/
├── src/
│   ├── entities/
│   │   ├── Book.ts            # Modelo e regras de quantidade do livro
│   │   ├── User.ts            # Modelo de usuário
│   │   └── Loan.ts            # Modelo de registro de empréstimo
│   ├── repositories/
│   │   ├── interfaces/        # Contratos dos repositórios
│   │   ├── BookRepository.ts  # Armazenamento em memória 
│   │   ├── UserRepository.ts  # Armazenamento em memória 
│   │   └── LoanRepository.ts  # Armazenamento em memória 
│   ├── strategies/
│   │   ├── SearchStrategy.ts  # Interface para o padrão Strategy
│   │   ├── SearchByAuthor.ts  # Busca filtrada por autor
│   │   └── SearchByCategory.ts# Busca filtrada por categoria
│   ├── services/
│   │   └── LibraryService.ts  # Camada de orquestração das regras de negócio
│   └── index.ts               # Ponto de entrada e cenários de uso da aplicação
├── package.json
├── tsconfig.json
└── README.md
```
