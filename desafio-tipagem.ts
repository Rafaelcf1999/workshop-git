//Exercicio workshop 15/09

type TipoCliente = "basico" | "premium";
type StatusPedido = "pago" | "cancelado";

interface Nome {
  first: string;
  last: string;
}
interface Cliente {
  nome: Nome;
  tipo: TipoCliente;
}

interface PedidoInput {
  id: number | string;
  valor: number;
  cliente: Cliente;
  status: StatusPedido;
}
interface PedidoProcessado {
  id: number | string;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

export function processarPedido(pedido: PedidoInput): PedidoProcessado {
  let desconto = 0;
  if (pedido.cliente.tipo === "premium") {
    desconto = 0.15;
  }
  const totalCalculado = pedido.valor - pedido.valor * desconto;

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado,
    pago: pedido.status === "pago",
  };
}
