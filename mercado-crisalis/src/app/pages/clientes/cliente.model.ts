import { Empresa } from "./empresa.model";

export class Cliente{
    id:number;
    dni:number;
    nombre:string;
    apellido:string;
    empresa:Empresa;
    tipo:string;

    constructor(id:number, dni:number, nombre:string, apellido:string, empresa:Empresa){
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        if(this.empresa != null && this.empresa.id > 0){
            this.tipo = "Representante empresa";
        } else {
            this.tipo = "Consumidor final";
        }
    }
}