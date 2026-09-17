interface Nome {
  first: string;
  last?: string;
}

interface Cliente {
  nome: Nome;
  tipo: 'comum' | 'premium';
}

interface Pedido {
  id: number | string;
  cliente: Cliente;
  valor: number;
  status: 'pago' | 'pendente';
}

interface ResultadoPedido {
  id: number | string;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processarPedido(pedido: Pedido): ResultadoPedido {
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  const { first, last } = pedido.cliente.nome;
  const nomeCliente = last ? `${first} ${last}` : first;

  return {
    id: pedido.id,
    nomeCliente,
    totalCalculado,
    pago: pedido.status.trim().toLowerCase() === 'pago'
  };
}

