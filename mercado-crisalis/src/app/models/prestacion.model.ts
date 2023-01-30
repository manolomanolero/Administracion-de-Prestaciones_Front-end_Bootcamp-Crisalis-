export class Prestacion{
    id:number;
    nombre:string;
    costo:number;
    costoSoporte:number;
    tipo:string;

    constructor(id:number, nombre:string, costo:number, costoSoporte:number, tipo:string){
        this.id = id;
        this.nombre = nombre;
        this.costo = costo;
        this.costoSoporte = costoSoporte;
        this.tipo = tipo;
    }
}