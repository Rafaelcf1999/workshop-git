type Tipo = "premium" | "padrao"
type Status = "pago" | "pendente"

interface Nome{
    first : string
    last: string
}

interface Cliente {
    nome: Nome
    tipo: Tipo
}

interface Pedido{
    id: number
    cliente: Cliente
    valor: number
    status: Status
}

interface ProcessarPedido{
    id: string | number;
    nomeCliente: string;
    totalCalculado: number;
    pago: boolean;
}

function processarPedido(pedido: Pedido) : ProcessarPedido {
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeCliente: pedido.cliente.nome.first + ' ' + pedido.cliente.nome.last,
    totalCalculado: totalCalculado,
    pago: pedido.status === 'pago'
  };
}