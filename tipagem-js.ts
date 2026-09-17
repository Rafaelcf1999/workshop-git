type TipoCliente = 'regular' | 'premium';
type StatusPedido = 'pago' | 'pendente' | 'cancelado';

interface NomeCliente {
  primeiro: string;
  ultimo: string;
}

interface Cliente {
  nome: NomeCliente;
  tipo: TipoCliente;
}
interface PedidoInput {
  id: number;
  valor: number;
  cliente: Cliente;
  status: StatusPedido | string;
}


function processarPedido(pedido: PedidoInput) {
  const valorNumero = Number(pedido.valor) || 0;
  let desconto = 0;
  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  const totalCalculado = valorNumero - (valorNumero * desconto);

  const primeiroNome = pedido.cliente.nome.primeiro || '';
  const ultimoNome = pedido.cliente.nome.ultimo || '';
  const nomeCompleto = `${primeiroNome} ${ultimoNome}`.trim();

  const statusLimpo = typeof pedido.status === 'string' ? pedido.status.trim() : '';
  const Pago = statusLimpo === 'pago';

  return {
    id: pedido.id,
    nomeCliente: nomeCompleto,
    totalCalculado: totalCalculado,
    pago: Pago,
  };
}