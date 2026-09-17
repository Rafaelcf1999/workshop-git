interface NomeCliente {
  first: string;
  last?: string;
}

interface Cliente {
  nome: NomeCliente;
  tipo: 'comum' | 'premium' | string;
}

interface Pedido {
  id: string | number;
  valor: number;
  status: 'pendente' | 'pago' | 'cancelado' | string;
  cliente?: Cliente;
}

interface PedidoProcessado {
  id: string | number;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processarPedido(pedido: Pedido): PedidoProcessado {
  const tipoCliente = pedido.cliente?.tipo?.toLowerCase();
  const desconto = tipoCliente === 'premium' ? 0.15 : 0;

  const totalBruto = pedido.valor * (1 - desconto);
  const totalCalculado = Math.round(totalBruto * 100) / 100;

  const primeiroNome = pedido.cliente?.nome?.first || 'Cliente';
  const sobrenome = pedido.cliente?.nome?.last || '';
  const nomeCompleto = `${primeiroNome} ${sobrenome}`.trim();

  return {
    id: pedido.id,
    nomeCliente: nomeCompleto,
    totalCalculado,
    pago: pedido.status?.toLowerCase() === 'pago',
  };
}
