export class Empresa{
    id:number;
    razonSocial:string;
    cuit:number;
    inicioActividades:Date;

    constructor(id:number, razonSocial:string, cuit:number, inicioActividades:Date){
        this.id = id;
        this.razonSocial = razonSocial;
        this.cuit = cuit;
        this.inicioActividades = inicioActividades;
    }
}