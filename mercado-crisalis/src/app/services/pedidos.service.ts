import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private httpClient:HttpClient) { }

  getPedidos() {
    return this.httpClient.get(`${baserUrl}/pedidos`);
  }

  savePedido(pedido: Pedido) {
    return this.httpClient.post(`${baserUrl}/pedidos`, pedido);
  }

  updatePedido(pedido: Pedido) {
    return this.httpClient.put(`${baserUrl}/pedidos`, pedido);
  }

  findPedido(id:number) {
    return this.httpClient.get(`${baserUrl}/pedidos/search?id=` + id);
  }


  findPedidoCompleto(id:number) {
    return this.httpClient.get(`${baserUrl}/pedidos/completo?id=` + id);
  }

  deletePedido(id: number) {
    return this.httpClient.delete(`${baserUrl}/pedidos?id=`+ id);
  }
}
