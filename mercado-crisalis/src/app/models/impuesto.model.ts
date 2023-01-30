export class Impuesto {
  id: number;
  nombre: string;
  porcentaje: number;
  activado: boolean;

  constructor(id:number, nombre:string, porcentaje:number){
    this.id = id;
    this.nombre = nombre;
    this.porcentaje = porcentaje;
    this.activado = false;
  }
}
