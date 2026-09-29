type TipoCliente = 'standard' | 'premium';
type StatusPedido = 'pago' | 'cancelado' | 'pendente'

interface Nome{
    first: string
    last: string
}

interface Cliente {
    nome: Nome
    tipo: TipoCliente
}

interface Pedido {
    id: number | string
    valor: number
    status: StatusPedido
    cliente: Cliente
}

interface PedidoProcessado {
    id: number | string
    nomeCliente: string 
    totalCalculado: number
    pago: boolean

}

function processarPedido(pedido: Pedido): PedidoProcessado {
    let desconto = pedido.cliente.tipo === 'premium' ? 0.15 : 0;

    const totalCalculado = pedido.valor - (pedido.valor * desconto);

    return{
        id: pedido.id,
        nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
        totalCalculado,
        pago: pedido.status === 'pago'
    }
}