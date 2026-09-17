type TipoDoCliente = 'premium' | 'comum';
type StatusDoPedido = 'pago' | 'pendente' | 'cancelado';

interface Nome {
  primeiro: string;
  ultimo: string;
}

interface Cliente {
  tipo: TipoDoCliente;
  nome: Nome;
}

interface Pedido {
  id: number
  valor: number
  status: StatusDoPedido
  cliente: Cliente
}

interface PedidoSendoProcessado {
  id: number;
  nomeDoCliente: string
  totalCalculado: number
  pago: boolean
}

function processarPedido(
    pedido: Pedido
): PedidoSendoProcessado {
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeDoCliente: `${pedido.cliente.nome.primeiro} ${pedido.cliente.nome.ultimo}`,
    totalCalculado,
    pago: pedido.status === 'pago',
  };
}