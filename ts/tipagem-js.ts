import { Pedido } from './Pedido';
import { PedidoProcessado } from './PedidoProcessado';

function processarPedido(pedido: Pedido): PedidoProcessado {
  let desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado: totalCalculado,
    pago: pedido.status === 'pago'
  };
}