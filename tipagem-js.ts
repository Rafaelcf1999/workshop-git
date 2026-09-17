interface Nome {
  first: string;
  last?: string; 
}

interface Cliente {
  nome: Nome;
  tipo: 'premium' | 'comum';
}

interface Pedido {
  id: number | string;
  cliente: Cliente;
  valor: number | string; 
  status: string;
}

interface PedidoProcessado {
  id: number | string;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

const desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;
  
  };

  const desconto = regrasDesconto[pedido.cliente.tipo];
  }

  const valorCorrigido = Number(pedido.valor);
  const total = valorCorrigido - (valorCorrigido * desconto);

  const nomeCompleto = pedido.cliente.nome.last 
    ? `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}` 
    : pedido.cliente.nome.first;

  const isPago = pedido.status.trim().toLowerCase() === 'pago';

  return {
    id: pedido.id,
    nomeCliente: nomeCompleto,
    totalCalculado: total,
    pago: isPago
  };
}
