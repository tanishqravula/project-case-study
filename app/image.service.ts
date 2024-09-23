import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'https://localhost:7272/api/Product'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getProduct(productId:number): Observable<object> {
    return this.http.get<object>(`${this.apiUrl}/${productId}`);
  }
}
