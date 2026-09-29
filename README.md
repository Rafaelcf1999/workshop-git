# 📚 Sistema de Gerenciamento de Biblioteca

Backend para gerenciamento de biblioteca desenvolvido em **TypeScript** e **Node.js**, focado em código limpo, tipagem forte, orientação a objetos e aplicação dos padrões de projeto **Repository Pattern** e **Strategy Pattern**.

---

## 🛠️ Tecnologias e Recursos

- **Node.js**: v24.10+ (com suporte nativo ao `--experimental-transform-types`)
- **TypeScript**: Tipagem estática, modulação nativa ESM e _Parameter Properties_
- **npm**: Gerenciador de pacotes

---

## 📐 Arquitetura e Padrões de Projeto

O projeto foi estruturado seguindo os princípios **SOLID**:

1. **Entidades (`src/entities/`)**: Representam os dados do domínio (`Book`, `User`, `Loan`). O controle de estoque da classe `Book` é feito com atributo privado (`quantity`) e métodos encapsulados (`increase`, `decrease`, `getQuantity`).
2. **Repository Pattern (`src/repositories/`)**:
   - **Interfaces (`src/repositories/interfaces/`)**: Isolam as abstrações de persistência de dados (`IBookRepository`, `IUserRepository`, `ILoanRepository`).
   - **Implementações Concretas**: Repositórios em memória utilizando coleções do JavaScript/TypeScript (`Map` e `Array`).
3. **Strategy Pattern (`src/strategies/`)**: Permite que novas regras de busca por livros (ex: por autor, por categoria, por título) sejam adicionadas sem alterar o código existente (**Open/Closed Principle**).
4. **Dependency Injection (`src/services/LibraryService.ts`)**: O serviço principal depende exclusivamente das _interfaces_ dos repositórios e estratégias, garantindo baixo acoplamento e facilidade para testes.
5. **Tratamento de Erros**: O `LibraryService` captura exceções lançadas pelas camadas inferiores e exibe logs via `console.error` sem propagar erros para a chamada principal.

---

## 📂 Estrutura de Pastas

```text
.
├── package.json
├── README.md
└── src/
    ├── entities/
    │   ├── Book.ts
    │   ├── User.ts
    │   └── Loan.ts
    ├── repositories/
    │   ├── interfaces/
    │   │   ├── IBookRepository.ts
    │   │   ├── IUserRepository.ts
    │   │   └── ILoanRepository.ts
    │   ├── BookRepository.ts
    │   ├── UserRepository.ts
    │   └── LoanRepository.ts
    ├── services/
    │   └── LibraryService.ts
    ├── strategies/
    │   ├── SearchStrategy.ts
    │   ├── AuthorSearchStrategy.ts
    │   └── CategorySearchStrategy.ts
    └── index.ts
```
