type TipoCliente = 'premium' | 'regular';

interface Cliente {
  nome: string;
  tipo: TipoCliente;
}

interface Pedido {
    id: number;
    cliente: Cliente;
    valor: number;
    status: 'pago' | 'pendente';
}

interface PedidoProcessado { 
    id: number; 
    nomeCliente: string; 
    totalCalculado: number;
    pago: boolean }

function processarPedido(pedido: Pedido): PedidoProcessado {
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);
  return {
    id: pedido.id,
    nomeCliente: pedido.cliente.nome,
    totalCalculado: totalCalculado,
    pago: pedido.status === 'pago'
  };
}

export default processarPedido;