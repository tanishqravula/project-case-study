import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = "http://localhost:5198/api/CartsApi";

  constructor(private http: HttpClient) { }

  public getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.url);
  }

  public getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.url}/${id}`);
  }

  public addToCart(productId: number, quantity: number): Observable<string> {
    return this.http.post<string>(`${this.url}/${productId}`, quantity);
  }

  public removeFromCart(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}/${id}`);
  }

  public updateCartItem(cartItemId: number, quantity: number): Observable<string> {
    return this.http.put<string>(`${this.url}/${cartItemId}`, quantity);
  }

  public checkout(): Observable<string> {
    return this.http.post<string>(`${this.url}/checkout`, {});
  }
}
