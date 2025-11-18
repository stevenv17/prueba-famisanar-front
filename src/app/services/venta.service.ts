import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private baseUrl = 'http://localhost:8093/venta';

  constructor(private http: HttpClient) {}

  venderProducto(data: any) {
    return this.http.post(`${this.baseUrl}/vender-producto`, data);
  }

}