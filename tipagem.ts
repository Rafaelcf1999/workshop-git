type TipoCliente = 'standard' | 'premium'
type StatusPedido = 'pago' | 'pendente' | 'cancelado'

interface Nome {
  first: string,
  last: string
}
interface CLiente{
  nome: Nome,
  tipo: TipoCliente
}
interface PedidoRecebido{
  id: number | string,
  valor: number,
  cliente: CLiente,
  status: StatusPedido
}
interface PedidoProcessado{
  id: number | string,
  nomeCliente: string,
  totalCalculado: number,
  pago: boolean
}

function processarPedido(pedido: PedidoRecebido): PedidoProcessado {
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado: totalCalculado,
    pago: pedido.status === 'pago'
  };
}