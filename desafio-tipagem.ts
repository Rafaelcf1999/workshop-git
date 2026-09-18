type TipoCliente = 'regular' | 'premium';
type StatusPedido = 'pendente' | 'pago' | 'cancelado';

let StatusAtual: StatusPedido = 'pago';

interface Nome{
    first: string;
    last: string;
}

interface Cliente{
    nome: Nome;
    tipo: TipoCliente;
}

interface Pedido{
    id: number | string;
    valor: number;
    cliente: Cliente;
    status: StatusPedido;
}

interface Compra{
    id: number | string;
    nomeCliente: string;
    totalCalculado: number;
    pago: boolean;
}

function processarPedido(pedido: Pedido): Compra {
    let desconto = 0;
    if (pedido.cliente.tipo === 'premium'){
        desconto = 0.15;
    } 

    const total = pedido.valor - (pedido.valor * desconto)

    return{
        id: pedido.id,
        nomeCliente: `${pedido.cliente.nome.first} ${pedido.cliente.nome.last}`,
        totalCalculado: total,
        pago: pedido.status === 'pago'
    };
}
