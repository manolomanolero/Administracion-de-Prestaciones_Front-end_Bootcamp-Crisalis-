import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PrestacionesService {
  constructor(private httpClient:HttpClient) { }

  getPrestaciones(){
    var prestaciones = this.httpClient.get(`${baserUrl}/prestaciones`);
    return prestaciones;
  }
}
