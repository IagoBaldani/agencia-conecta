import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfluenciadorApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInfluenciadores(token: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/influenciador?buscaSimplificada=true`, {headers});
  }

  private getHeaders(token: string){
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
