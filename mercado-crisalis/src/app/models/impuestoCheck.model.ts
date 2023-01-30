import { Impuesto } from "./impuesto.model";

export class ImpuestoCheck {
    impuesto: Impuesto;
    activado: boolean;
  
    constructor(impuesto: Impuesto){
      this.impuesto = impuesto;
      this.activado = false;
    }
  }
  