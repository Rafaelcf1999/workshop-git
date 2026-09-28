# Sistema de Gerenciamento de Biblioteca

Projeto em TypeScript para cadastro de livros e usuários, controle de empréstimos e devoluções e busca de livros por autor ou categoria.

Os dados ficam em memória e são reiniciados a cada execução. Livros e usuários são armazenados em `Map`, e os empréstimos em um array.

## Execução

Requisito: Node.js 24.10 ou superior, com npm.

```sh
npm ci
npm start
```

O exemplo em `src/index.ts` cadastra dois livros e dois usuários, realiza um empréstimo, busca livros por autor e categoria e registra uma devolução. Os resultados e o estoque são exibidos no console.

Em `Dom Casmurro`, o estoque começa com 2 cópias, passa para 1 após o empréstimo e volta para 2 após a devolução. A busca por `Machado de Assis` retorna os dois livros; a busca por `Romance` retorna apenas `Dom Casmurro`.

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm ci` | Instala as dependências do lockfile. |
| `npm start` | Executa a demonstração. |
| `npm run dev` | Executa a demonstração e reinicia ao alterar arquivos. |
| `npm run typecheck` | Verifica a tipagem, sem gerar arquivos JavaScript. |
| `npm test` | Executa os testes com o test runner nativo do Node. |

O Node executa TypeScript diretamente, sem etapa de build. Os imports locais usam a extensão `.ts`, e os imports usados somente na tipagem usam `import type`.

No PowerShell, se `npm` for bloqueado pela política de scripts, use `npm.cmd`.

## Estrutura

```text
src/
  entities/                  # Book, User e Loan
  repositories/
    interfaces/              # Contratos dos repositórios
    BookRepository.ts
    UserRepository.ts
    LoanRepository.ts
  services/
    LibraryService.ts        # Cadastro, empréstimo, devolução e busca
  strategies/                # Contrato de busca e estratégias por autor e categoria
  index.ts                   # Demonstração
tests/                       # Testes das entidades, repositórios, estratégias e serviço
```

## Regras

- `Book` controla o estoque pelos métodos `decrease`, `increase` e `getQuantity`. Sem cópias disponíveis, `decrease` lança `No copies available`.
- Livros e usuários não podem ter IDs repetidos. Seus repositórios lançam erros ao consultar um ID inexistente ou uma lista vazia.
- Um usuário pode ter apenas um empréstimo ativo de cada livro. Usuários diferentes podem emprestar o mesmo livro enquanto houver cópias.
- A devolução precisa corresponder ao usuário e ao livro do empréstimo. Se o registro ou a remoção do empréstimo falhar, o estoque é restaurado.
- O serviço recebe as interfaces dos repositórios pelo construtor e trata os erros com `console.error`, sem propagar exceções.
- Os cadastros em lista param no primeiro erro e mantêm os itens que já foram salvos.
- As buscas comparam o texto exato, incluindo maiúsculas, minúsculas e acentos. Retornam um array vazio quando não encontram resultados ou quando ocorre um erro no serviço.

## Buscas

```ts
library.search(new AuthorSearchStrategy(), "Machado de Assis");
library.search(new CategorySearchStrategy(), "Romance");
```

Para incluir outro critério, basta criar uma classe que implemente `SearchStrategy`, com o método `search(books: Book[], query: string): Book[]`, e passá-la ao serviço.

## Testes

```sh
npm run typecheck
npm test
```

Os testes cobrem cadastros, consultas, duplicidades, estoque esgotado, empréstimos, devoluções, tratamento de erros e a troca de estratégias de busca.
