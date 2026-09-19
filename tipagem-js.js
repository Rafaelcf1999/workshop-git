function processarPedido(pedido) {
    let desconto = 0;
    if (pedido.cliente.tipo === 'premium') {
        desconto = 0.15;
    }

    const totalCalculado = pedido.valor - (pedido.valor * desconto);

    return {
        id: pedido.id,
        nomeCliente: pedido.cliente.nome.first + ' ' + pedido.cliente.nome.last,
        totalCalculado: totalCalculado,
        pago: pedido.status === 'pago'
    };
}