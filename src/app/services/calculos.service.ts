import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculosService {

  private baseUrl = 'http://localhost:8093/calculos';

  constructor(private http: HttpClient) {}

  getEstadisticas() {
    return this.http.get(`${this.baseUrl}/obtener-estadisticas`);
  }


}