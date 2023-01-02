export class Empresa{
    id:number;
    razonSocial:string;
    cuit:number;

    constructor(id:number, razonSocial:string, cuit:number){
        this.id = id;
        this.razonSocial = razonSocial;
        this.cuit = cuit;
    }
}