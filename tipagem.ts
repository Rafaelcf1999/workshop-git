interface Cliente {
  firstName: string;
  lastName: string;
  tipo: "preminum" | "basico";
}

type StatusDoPedido = "pago" | "pendente" | "cancelado";

interface Pedido {
  id: string | number;
  cliente: Cliente;
  valor: number;
  status: StatusDoPedido;
}

interface PedidoProcessado {
  id: string | number;
  nomeCliente: string;
  valorTotal: number;
  pago: boolean;
}

function processarPedido(pedido: Pedido): PedidoProcessado {
  let desconto = 0;
  if (pedido.cliente.tipo === "preminum") {
    desconto = 0.15;
  }

  const totalCalculado = pedido.valor - pedido.valor * desconto;

  return {
    id: pedido.id,
    nomeCliente: `${pedido.cliente.firstName} ${pedido.cliente.lastName}`,
    valorTotal: totalCalculado,
    pago: pedido.status === "pago",
  };
}
