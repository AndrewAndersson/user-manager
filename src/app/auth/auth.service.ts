import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequestData, LoginResponseData } from '../models/login-data.model';

@Injectable()
export class AuthService {
  private requestUrl: string = 'https://test-api.ci.gbksoft.net/rest/v1/user';

  constructor(private http: HttpClient) { }

  login(body: LoginRequestData): Observable<boolean> {
    return this.http.post<{token: string}>(this.requestUrl + '/login', body)
      .pipe(
        map((res: any) => {          
          localStorage.setItem('access_token', res.result.token);
          return true;
        })
      );
  }

  register(body: LoginRequestData): Observable<boolean> {
    return this.http.post<{token: string}>(this.requestUrl + '/register', body)
      .pipe(
        map((res: any) => {
          localStorage.setItem('access_token', res.result.token);
          return true;
        })
      );
  }

  logout() {
    return this.http.post(this.requestUrl + '/logout', {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    }); 
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}