import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  public url: string = 'http://localhost:5198/api/UserApi';
  public loginUrl = `${this.url}/login`;

  constructor(private httpObj: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.httpObj.get<User[]>(this.url);
  }

  public create(obj: User): Observable<string> {
    return this.httpObj.post<string>(this.url, obj);
  }

  public login(obj:User): Observable<any> {

    return this.httpObj.post<any>(this.loginUrl,obj);
  }
}
