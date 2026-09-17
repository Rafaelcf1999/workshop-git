export interface Nome {
    first: string;
    last?: string;
}

export type TipoCliente = 'comum' | 'premium';
export type statusPedido = 'pago' | 'pendente' | 'cancelado';

export interface Cliente {
    nome: Nome;
    tipo: TipoCliente;
}

export interface Pedido {
    id: string | number;
    cliente: Cliente;
    valor: number;
    status: statusPedido;
}

export interface PedidoProcessado {
    id: string | number;
    nomeCliente: string;
    totalCalculado: number;
    pago: boolean;
}

//formatar pra só adicionar o last name se ele existir
export function formatarNomeCliente(nome: Nome): string {
    if (!nome.last) {
        return nome.first.trim();
    }
    return `${nome.first.trim()} ${nome.last.trim()}`;
}


export function processarPedido(pedido: Pedido): PedidoProcessado {
    let desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;
    const totalCalculado = pedido.valor - (pedido.valor * desconto);

    return {
        id: pedido.id,
        nomeCliente: formatarNomeCliente(pedido.cliente.nome),
        totalCalculado: totalCalculado,
        pago: pedido.status === 'pago'
    }
}