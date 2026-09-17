interface Identificavel {
  id: number;
}

interface Nome {
  first: string;
  last: string;
}

interface Cliente {
  tipo: string;
  nome: Nome;
}

interface Pedido extends Identificavel {
  valor: number;
  status: string;
  cliente: Cliente;
}

interface PedidoProcessado extends Identificavel {
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processarPedido(pedido: Pedido): PedidoProcessado {
  let desconto = 0;

  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - pedido.valor * desconto;

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado,
    pago: pedido.status === 'pago',
  };
}