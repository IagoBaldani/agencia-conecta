import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InfluenciadorModel} from "../model/influenciador.model";

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

  getInfluenciador(token: string, id: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/influenciador/${id}`, {headers});
  }

  postInfluenciador(token: string, influenciador: InfluenciadorModel): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.post(`${this.apiUrl}/influenciador`, influenciador, {headers})
  }

  updateInfluenciador(token: string, influenciador: InfluenciadorModel): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.put(`${this.apiUrl}/influenciador/${influenciador.id}`, influenciador, {headers})
  }

  updateStatusInfluenciador(token: string, id: string): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.put(`${this.apiUrl}/influenciador/status/${id}`, null,{headers})
  }


  deleteInfluenciador(token: string, id: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.delete(`${this.apiUrl}/influenciador/${id}`, {headers});
  }

  private getHeaders(token: string){
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
