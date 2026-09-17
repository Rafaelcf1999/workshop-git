type TipoCliente = 'free' | 'premium'
type StatusPedido = 'pago' | 'pendente' | 'cancelado'

interface Nome { first: string; last: string}
interface Cliente { nome: Nome; tipo: TipoCliente}
interface FazerPedido {id: number | string; cliente: Cliente; status: StatusPedido;}
interface PedidoFeito {id: number | string; nomeCliente: string; totalCalculado: number; pago: boolean;}

function processarPedido(pedido: FazerPedido): PedidoFeito {
  let desconto = pedido.cliente.tipo === 'premium'? 0.15 : 0;
  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado: totalCalculado,
    pago: pedido.status === 'pago'
  };
}
