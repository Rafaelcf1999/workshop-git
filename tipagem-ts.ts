interface Nome {
    first: string;
    last: string;
}

interface Cliente {
    tipo: 'regular' | 'premium';
    nome: Nome;
}

interface PedidoInput {
    id: number | string;
    cliente: Cliente;
    valor: number;
    status: 'pago' | 'pendente' | 'cancelado';
}

interface PedidoProcessado {
    id: number | string;
    nomeCliente: string;
    totalCalculado: number;
    pago: boolean;
}

function processarPedido(pedido: PedidoInput): PedidoProcessado {
    let desconto = 0;
    if (pedido.cliente.tipo === 'premium') {
        desconto = 0.15;
    }

    const totalCalculado = pedido.valor - (pedido.valor * desconto);

    return {
        id: pedido.id,
        nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
        totalCalculado: totalCalculado,
        pago: pedido.status === 'pago'
    };
}