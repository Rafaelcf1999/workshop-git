interface Pedido {
    id: number;
    cliente: Cliente;
    valor: number;
    status: 'pago' | 'pendente';
}

interface Cliente {
    nome: Nome;
    tipo: 'premium' | 'normal';
}

interface Nome {
    first: string;
    last: string;
}

interface Compra {
    id: number;
    nomeCliente: string;
    totalCalculado: number;
    pago: boolean;
}

function processarPedido(pedido: Pedido): Compra {
    const desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;

    const totalCalculado = pedido.valor * (1 - desconto);

    return {
        id: pedido.id,
        nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
        totalCalculado,
        pago: pedido.status === 'pago'
    };
}