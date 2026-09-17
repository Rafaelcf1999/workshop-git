type TipoCliente = 'premium' | 'comum';
type StatusPedido = 'pago' | 'pendente';

interface Nome { first: string; last: string; }

interface Cliente { nome: Nome; tipo: TipoCliente; }

interface Pedido { id: number; cliente: Cliente; valor: number; status: StatusPedido; }
