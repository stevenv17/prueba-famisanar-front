import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://localhost:8093/pedido';

  constructor(private http: HttpClient) {}

  hacerPedido(data: any) {
    return this.http.post(`${this.baseUrl}/nuevo-pedido`, data);
  }

}