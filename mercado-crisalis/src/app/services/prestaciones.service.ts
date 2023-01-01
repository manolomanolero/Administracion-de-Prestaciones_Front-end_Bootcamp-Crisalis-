import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestacion } from '../pages/prestaciones/prestacion.model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class PrestacionesService {
  constructor(private httpClient: HttpClient) {}

  getPrestaciones() {
    var prestaciones = this.httpClient.get(`${baserUrl}/prestaciones`);
    return prestaciones;
  }

  savePrestaciones(prestacion: Prestacion) {
    return this.httpClient.post(`${baserUrl}/prestaciones`, prestacion);
  }

  updatePrestaciones(prestacion: Prestacion) {
    return this.httpClient.put(`${baserUrl}/prestaciones`, prestacion);
  }

  findPrestaciones(id:number) {
    return this.httpClient.get(`${baserUrl}/prestaciones/search?id=` + id);
  }

  deletePrestaciones(id: number) {
    return this.httpClient.delete(`${baserUrl}/prestaciones?id=`+ id);
  }
}
