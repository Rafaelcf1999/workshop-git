type TipoCliente = 'premium' | 'comum';
type StatusPedido = 'pago' | 'pendente' | 'cancelado';

interface NomeCliente {
  first: string;
  last?: string;
}

interface Cliente {
  tipo: TipoCliente;
  nome: NomeCliente;
}

interface Pedido {
  id: string | number;
  cliente: Cliente;
  valor: number;
  status: StatusPedido;
}

interface PedidoProcessado {
  id: string | number;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processarPedido(pedido: Pedido): PedidoProcessado {
  const desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;

  const totalCalculado =
    pedido.valor - pedido.valor * desconto;

  const nomeCliente = [
    pedido.cliente.nome.first,
    pedido.cliente.nome.last
  ]
    .filter((nome): nome is string => Boolean(nome?.trim()))
    .join(' ');

  return {
    id: pedido.id,
    nomeCliente,
    totalCalculado,
    pago: pedido.status === 'pago'
  };
}

export {};