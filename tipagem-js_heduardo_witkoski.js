// --- INTERFACES ---

interface NomeCliente {
  first: string;
  last?: string; //para evitar o Bug 1
}

interface Cliente {
  nome: NomeCliente;
  tipo: 'comum' | 'premium' | string;
}

interface PedidoInput {
  id: string | number;
  cliente: Cliente;
  valor: number | string; // Permite string para podermos tratar o Bug 2
  status: string;
}

interface PedidoProcessado {
  id: string | number;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

// --- FUNÇÃO REFATORADA ---

function processarPedido(pedido: PedidoInput): PedidoProcessado {
  let desconto = 0;

  if (pedido.cliente.tipo === 'premium') {
    desconto = 0.15;
  }

  // Bug 2: Garante conversão de valor para número
  const valorNum = Number(pedido.valor) || 0;
  const total = valorNum - (valorNum * desconto);

  // Bug 1: Trata sobrenome omitido para não retornar "undefined"
  const nomeCompleto = pedido.cliente.nome.last
    ? `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`
    : pedido.cliente.nome.first;

  // Bug 3: Remove espaços em branco extras do status antes da checagem
  const estaPago = pedido.status.trim().toLowerCase() === 'pago';

  return {
    id: pedido.id,
    nomeCliente: nomeCompleto,
    totalCalculado: total,
    pago: estaPago
  };
}
