
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url:string = "http://localhost:5198/api/ProductsApi";

   constructor(private httpObj:HttpClient){
  }

  public getAll():Observable<Product[]>
  {
    return  this.httpObj.get<Product[]>(this.url);
  }

  public getProductById(id:number):Observable<Product>
  {
    return  this.httpObj.get<Product>(this.url + "/" +  id);
  }

  public create(obj:Product):Observable<string>
  {
    return this.httpObj.post<string>(this.url, obj);
  }

  public update(obj:Product):Observable<string>
  {
    return this.httpObj.put<string>(this.url, obj);
  }

  public delete(id:number):Observable<string>
  {
    return  this.httpObj.delete<string>(this.url + "/" +  id);
  }
}