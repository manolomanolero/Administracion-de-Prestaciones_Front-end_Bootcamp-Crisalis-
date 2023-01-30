import { Impuesto } from "./impuesto.model";
import { Prestacion } from "./prestacion.model";

export class DetallePedido {
    id:number;
    cantidad:number;
    prestacion:Prestacion;
    garantia:number;
    soporteEspecial: boolean;
    impuestos:Impuesto[];
    costoProducto:number;
    costoNeto:number;

    constructor(id:number, cantidad:number, prestacion:Prestacion, garantia:number, soporteEspecial: boolean, impuestos:Impuesto[], costoProducto:number, costoNeto:number){
        this.id = id;
        this.cantidad = cantidad;
        this.prestacion = prestacion;
        this.garantia = garantia;
        this.soporteEspecial = soporteEspecial;
        this.impuestos = impuestos;
        this.costoProducto = costoProducto;
        this.costoNeto = costoNeto;
    }

    calcularCostoNeto() {
        this.costoProducto = this.prestacion.costo;
        let porcentajeImpuestos = this.impuestos.reduce( function(a, b) {
            return a + b.porcentaje;
        }, 0);
        this.costoNeto = this.costoProducto * this.cantidad;
        if(this.prestacion.tipo === "servicio"){
            if(this.soporteEspecial){
                this.costoNeto += this.prestacion.costoSoporte;
            }
        } else {
            this.costoNeto += this.costoNeto * this.garantia * 0.02;
        }

        this.costoNeto += this.costoNeto * porcentajeImpuestos / 100;
    }
}