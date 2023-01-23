import { Impuesto } from "./impuesto.model";
import { Prestacion } from "./prestacion.model";

export class DetallePedido {
    id:number;
    cantidad:number;
    prestacion:Prestacion;
    garantia:number;
    impuestos:Impuesto[];
    costoProducto:number;
    costoNeto:number;

    constructor(id:number, cantidad:number, prestacion:Prestacion, garantia:number, impuestos:Impuesto[], costoProducto:number, costoNeto:number){
        this.id = id;
        this.cantidad = cantidad;
        this.prestacion = prestacion;
        this.garantia = garantia;
        this.impuestos = impuestos;
        this.costoProducto = costoProducto;
        this.costoNeto = costoNeto;
    }
}