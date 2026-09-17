type TipoCliente = 'regular' | 'premium';
type StatusPedido = 'pago' | 'pendente' | 'cancelado';

interface Cliente {
  nome: { first: string; last: string };
  tipo: TipoCliente;
}

interface PedidoInput {
  id: number | string;
  valor: number;
  cliente: Cliente;
  status: StatusPedido;
}

interface PedidoProcessado {
  id: number | string;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processarPedido(pedido: PedidoInput): PedidoProcessado {
  let desconto = 0;

  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado,
    pago: pedido.status === 'pago'
  };
}