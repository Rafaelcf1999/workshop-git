type tipo = 'premium' | 'comum';
type status = 'pago' | 'pendente';

interface Nome {
  first: string;
  last: string ; 
}

interface Cliente {
  tipo: tipo;
  nome: Nome;
}

interface Pedido {
  id: number;
  cliente: Cliente;
  valor: number;
  status: status;
}

interface PedidoProcessado {
  id: number;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processarPedido(pedido: Pedido): PedidoProcessado {
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - (pedido.valor * desconto);

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`.trim(),
    totalCalculado: totalCalculado,
    pago: pedido.status === 'pago'
  };
}

const pedido : Pedido = {
  id: 1,
  cliente: {
    tipo: 'premium',
    nome: {
      first: 'Pedro',
      last: 'Silva'
    }
  },
  valor: 100,
  status: 'pago'
};

console.log(processarPedido(pedido));
