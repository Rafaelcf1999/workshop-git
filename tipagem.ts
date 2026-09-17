interface NomeCliente {
  first: string;
  last: string;
}

type TipoCliente = 'standard' | 'premium';
type StatusPedido = 'pendente' | 'pago' | 'cancelado';

interface Cliente {
  nome: NomeCliente;
  tipo: TipoCliente;
}

interface Pedido {
  id: string | number;
  valor: number;
  status: StatusPedido;
  cliente: Cliente;
}

interface ResultadoPedido {
  id: string | number;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}


function processarPedido(pedido: Pedido): ResultadoPedido {

    let desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;
    const totalCalculado = pedido.valor - (pedido.valor * desconto);

    return {
        id: pedido.id,
        nomeCliente: `${pedido.cliente.nome.first}${pedido.cliente.nome.last}`,
        totalCalculado,
        pago: pedido.status === 'pago'
    };
}

const pedidoPremium: Pedido = {
  id: 'PED-265',
  valor: 200,
  status: 'pago',
  cliente: {
    nome: { first: 'Agnes', last: ' Ludmila' },
    tipo: 'premium'
  }
};

console.log(processarPedido(pedidoPremium));
