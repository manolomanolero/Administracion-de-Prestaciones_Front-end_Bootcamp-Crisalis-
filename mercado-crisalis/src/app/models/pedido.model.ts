import { Cliente } from "./cliente.model";
import { DetallePedido } from "./detallePedido.model";

export class Pedido{
    id:number;
    cliente:Cliente;
    fecha:Date;
    costoBruto:number;
    costoFinal:number;
    detallesPedidos:DetallePedido[];
    
    constructor(id:number, cliente:Cliente, fecha:Date, costoBruto:number, costoFinal:number, detallesPedidos:DetallePedido[]){
        this.id = id;
        this.cliente = cliente;
        this.fecha = fecha;
        this.costoBruto = costoBruto;
        this.costoFinal = costoFinal;
        this.detallesPedidos = detallesPedidos;
    }
}