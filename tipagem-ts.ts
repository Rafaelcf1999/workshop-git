export interface Pedido {
  id: number;
  valor: any; 
  status: string;
  cliente: {
    tipo: string;
    nome: {
      first: string;
      last?: string;
    };
  };
}

export function processarPedido(pedido: Pedido) {
  let desconto = 0;
  
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  let valorCerto = Number(pedido.valor);
  let total = valorCerto - (valorCerto * desconto);

  let nomeCompleto = pedido.cliente.nome.first;
  if (pedido.cliente.nome.last) {
    nomeCompleto = nomeCompleto + ' ' + pedido.cliente.nome.last;
  }

  return {
    id: pedido.id,
    nomeCliente: nomeCompleto,
    totalCalculado: total,
    pago: pedido.status.trim() === 'pago'
  };
}