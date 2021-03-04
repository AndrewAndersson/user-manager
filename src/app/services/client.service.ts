import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  requestUrl: string = 'https://test-api.ci.gbksoft.net/rest/v1/user'


  constructor(
    private http: HttpClient
  ) { }

  private getAuthHeaders() {    
    return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  }

  getAllUsers() {
    return this.http.get(this.requestUrl, {
      headers: this.getAuthHeaders()
    }).pipe(map((res: any) => res.result)); 
  }
}
