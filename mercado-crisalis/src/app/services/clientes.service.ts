import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Empresa } from '../models/empresa.model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpClient: HttpClient) {}

  getClientes() {
    var clientes = this.httpClient.get(`${baserUrl}/clientes`);
    return clientes;
  }

  saveCliente(cliente: Cliente) {
    return this.httpClient.post(`${baserUrl}/clientes`, cliente);
  }

  updateCliente(cliente: Cliente) {
    return this.httpClient.put(`${baserUrl}/clientes`, cliente);
  }

  findCliente(id:number) {
    return this.httpClient.get(`${baserUrl}/clientes/search?id=` + id);
  }

  deleteCliente(id: number) {
    return this.httpClient.delete(`${baserUrl}/clientes?id=`+ id);
  }

  getEmpresas() {
    return this.httpClient.get(`${baserUrl}/clientes/empresas`);
  }

  findEmpresa(id:number) {
    return this.httpClient.get(`${baserUrl}/clientes/empresas/search?id=` + id);
  }

  saveEmpresa(empresa:Empresa){
    return this.httpClient.post(`${baserUrl}/clientes/empresas`, empresa);
  }

  updateEmpresa(empresa:Empresa){
    return this.httpClient.put(`${baserUrl}/clientes/empresas`, empresa);
  }

  deleteEmpresa(id: number) {
    return this.httpClient.delete(`${baserUrl}/clientes/empresas?id=`+ id);
  }
}
