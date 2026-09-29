# Desafio: Sistema de Gerenciamento de Biblioteca

**Thiago Henrique Markendorf**

## Contexto
Você foi contratado para desenvolver o backend de um sistema de
gerenciamento de biblioteca. O sistema deve permitir o cadastro de
livros e usuários, o controle de empréstimos e a busca de livros por
diferentes critérios.
O foco deste desafio não é apenas fazer o código funcionar, mas sim
escrever código TypeScript limpo, bem tipado e seguindo boas práticas
e padrões de projeto.

## Requisitos Funcionais
O sistema deve ser capaz de:
1. Cadastrar livros, cada um com: id, título, autor,
categoria e quantidade de cópias disponíveis.
2. Cadastrar usuários, cada um com: id e nome.
3. Realizar empréstimos de um livro para um usuário,
decrementando a quantidade de cópias disponíveis.
4. Registrar devoluções de um livro por um usuário,
incrementando a quantidade de cópias disponíveis.
5. Buscar livros por autor ou por categoria, de forma extensível
(novos critérios de busca devem poder ser adicionados sem
alterar o código existente).