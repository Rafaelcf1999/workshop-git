# Sistema de Gerenciamento de Biblioteca

Backend de gerenciamento de biblioteca desenvolvido em **TypeScript**, seguindo boas práticas de **Orientação a Objetos**, princípios **SOLID** e **Design Patterns** (Repository, Strategy e Injeção de Dependências). O projeto é executado de forma nativa no **Node.js 24+** sem necessidade de compilação externa.

---

## 🏛️ Arquitetura em Camadas

A aplicação foi estruturada em camadas bem definidas e desacopladas:

```text
src/
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
├── strategies/
│   ├── SearchStrategy.ts
│   ├── AuthorSearchStrategy.ts
│   └── CategorySearchStrategy.ts
├── services/
│   └── LibraryService.ts
└── index.ts
```

---

## 💎 Princípios SOLID Aplicados

### 1. Single Responsibility Principle (SRP)
- Cada classe possui uma única responsabilidade. As entidades cuidam de seus atributos e integridade de domínio, os repositórios são responsáveis pelo armazenamento e recuperação em memória, as estratégias cuidam exclusivamente de filtros de busca e o serviço orquestra as regras de negócio.

### 2. Open/Closed Principle (OCP)
- Implementado através do **Strategy Pattern** na busca de livros. Para adicionar novos critérios de busca (ex: busca por título ou por ano), basta criar uma nova classe que implemente a interface `SearchStrategy`, sem a necessidade de modificar o `LibraryService` ou qualquer código existente.

### 3. Liskov Substitution Principle (LSP)
- As implementações concretas dos repositórios e estratégias podem ser substituídas por qualquer outra classe que atenda a seus respectivos contratos (`IBookRepository`, `IUserRepository`, `ILoanRepository`, `SearchStrategy`) sem quebrar o comportamento do sistema.

### 4. Interface Segregation Principle (ISP)
- As interfaces dos repositórios são segregadas e específicas para cada contexto (`IBookRepository`, `IUserRepository`, `ILoanRepository`), evitando contratos genéricos e métodos desnecessários.

### 5. Dependency Inversion Principle (DIP)
- A classe de serviço `LibraryService` depende exclusivamente das interfaces (`IBookRepository`, `IUserRepository`, `ILoanRepository`) e da abstração `SearchStrategy`. Nenhuma implementação concreta de repositório é importada pelo serviço. Todas as dependências são fornecidas externamente via construtor (Injeção de Dependência).

---

## 🎯 Padrões de Projeto (Design Patterns)

- **Repository Pattern**: Abstrai a camada de persistência em memória (`Map` e `Array`), isolando a regra de negócio dos detalhes de armazenamento e validação de existência.
- **Strategy Pattern**: Permite a seleção intercambiável de algoritmos de filtragem de livros (`AuthorSearchStrategy`, `CategorySearchStrategy`).
- **Dependency Injection**: Desacoplamento entre a criação de instâncias e a lógica do serviço, facilitando testes e manutenção.

---

## 🛡️ Regras de Negócio e Encapsulamento

- **Controle de Estoque**: A propriedade `quantity` da classe `Book` é privada. O acesso e a alteração ocorrem exclusivamente pelos métodos `increase()`, `decrease()` e `getQuantity()`.
- **Tratamento de Exceções**: Se não houver cópias disponíveis ao decrementar, a entidade lança a exceção `"No copies available"`.
- **Imutabilidade**: As entidades `User` e `Loan` possuem suas propriedades marcadas como `readonly`.
- **Resiliência do Serviço**: O `LibraryService` captura exceções internamente com `try/catch` e as exibe via `console.error`, garantindo que a aplicação permaneça estável sem propagar erros não tratados.

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js 24.10+** (com suporte nativo ao recurso `--experimental-transform-types`).

### Executando o Projeto

Para executar o ponto de entrada principal:

```bash
npm start
```

Para executar em modo de desenvolvimento com monitoramento contínuo:

```bash
npm run dev
```

