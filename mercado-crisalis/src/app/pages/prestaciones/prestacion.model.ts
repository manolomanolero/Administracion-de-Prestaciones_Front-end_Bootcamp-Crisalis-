export class Prestacion{
    id:number;
    nombre:string;
    costo:number;
    tipo:string;

    constructor(id:number, nombre:string, costo:number, tipo:string){
        this.id = id;
        this.nombre = nombre;
        this.costo = costo;
        this.tipo = tipo;
    }
}