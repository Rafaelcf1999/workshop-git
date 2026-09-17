type PedidoStatus = "pago" | "cancelado" | "pendente";
type TipoCliente = "normal" | "premium";

interface Nome {
  first: string;
  last: string;
}

interface Cliente {
  tipo: TipoCliente;
  nome: Nome;
}

interface PedidoInput {
  id: number | string;
  cliente: Cliente;
  valor: number;
  status: PedidoStatus;
}

interface PedidoProcessado {
  id: number | string;
  nomeCliente: string;
  totalCalculado: number;
  pago: boolean;
}

function processandoPedido(pedido: PedidoInput): PedidoProcessado {
  const desconto = pedido.cliente.tipo === "premium" ? 0.15 : 0;
  const totalCalculado = pedido.valor - pedido.valor * desconto;

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
    totalCalculado: totalCalculado,
    pago: pedido.status === "pago",
  };
}

const pedido1: PedidoInput = {
  id: 1,
  cliente: {
    tipo: "normal",
    nome: {
      first: "Gustavo",
      last: "Savi",
    },
  },
  valor: 100,
  status: "pendente",
};

console.log(processandoPedido(pedido1));
