import { Cliente } from "./cliente.model";
import { DetallePedido } from "./detallePedido.model";
import { DetallesImpuestosPedidos } from "./detallesImpuestosPedidos.model";

export class PedidoCompleto{
    id:number;
    cliente:Cliente;
    fecha:Date;
    costoBruto:number;
    costoConImpuestos: number;
    tieneDescuento:boolean;
    totalDescuento:number;
    costoFinal:number;
    detallesPedidos:DetallePedido[];
    detallesImpuestosPedidos:DetallesImpuestosPedidos[];

    constructor(id:number, cliente:Cliente, fecha:Date, costoBruto:number, costoFinal:number, costoConImpuestos: number, tieneDescuento:boolean, totalDescuento:number, 
        detallesPedidos:DetallePedido[], detallesImpuestosPedidos:DetallesImpuestosPedidos[]){

        this.id = id;
        this.cliente = cliente;
        this.fecha = fecha;
        this.costoBruto = costoBruto;
        this.costoConImpuestos = costoConImpuestos;
        this.tieneDescuento = tieneDescuento;
        this.totalDescuento = totalDescuento;
        this.costoFinal = costoFinal;
        this.detallesPedidos = detallesPedidos;
        this.detallesImpuestosPedidos = detallesImpuestosPedidos;
    }

}