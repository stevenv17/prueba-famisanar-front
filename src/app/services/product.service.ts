import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8093/producto';

  constructor(private http: HttpClient) {}

  getProductsList() {
    return this.http.get(`${this.baseUrl}/lista`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}