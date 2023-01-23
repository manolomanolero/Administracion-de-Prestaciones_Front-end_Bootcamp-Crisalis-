import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Impuesto } from '../models/impuesto.model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  constructor(private httpClient: HttpClient) { }

  getImpuestos() {
    return this.httpClient.get(`${baserUrl}/impuestos`);
  }

  saveImpuesto(impuesto: Impuesto) {
    return this.httpClient.post(`${baserUrl}/impuestos`, impuesto);
  }

  updateImpuesto(impuesto: Impuesto) {
    return this.httpClient.put(`${baserUrl}/impuestos`, impuesto);
  }

  findImpuesto(id:number) {
    return this.httpClient.get(`${baserUrl}/impuestos/search?id=` + id);
  }

  deleteImpuesto(id: number) {
    return this.httpClient.delete(`${baserUrl}/impuestos?id=`+ id);
  }
}
