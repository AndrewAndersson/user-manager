import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { LoginRequestData } from './../models/login-data.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  requestUrl: string = 'https://test-api.ci.gbksoft.net/rest/v1/user'


  constructor(
    private http: HttpClient
  ) { }

  registerUser(body: LoginRequestData){
    return this.http.post(this.requestUrl + '/register', body); 
  }

  loginUser(body: LoginRequestData){
    return this.http.post(this.requestUrl + '/login', body); 
  }

  logout() {
    return this.http.post(this.requestUrl + '/logout', {}); 
  }

  getAllUsers(token: string) {
    console.log(token);
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.requestUrl, {
      headers: headers
    }); 
  }
}
