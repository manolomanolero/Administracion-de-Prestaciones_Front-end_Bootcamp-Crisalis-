import { Impuesto } from "./impuesto.model";


export class DetallesImpuestosPedidos{
    id: number;
    impuesto: Impuesto;
    monto: number;

    constructor(id: number, impuesto: Impuesto, monto: number){
        this.id = id;
        this.impuesto = impuesto;
        this.monto = monto;
    }
}