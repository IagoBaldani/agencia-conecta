import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InfluenciadorModel} from "../model/influenciador.model";

@Injectable({
  providedIn: 'root'
})
export class ServicoApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServicos(token: string, ativos: string | null, idInfluenciador: number | null): Observable<any> {
    let headers = this.getHeaders(token);

    if(ativos !== null && idInfluenciador === null){
      return this.http.get(`${this.apiUrl}/servico?ativos=${ativos}`, {headers});
    }
    else if(idInfluenciador !== null && ativos === null){
      return this.http.get(`${this.apiUrl}/servico?idInfluenciador=${idInfluenciador}`, {headers});
    }
    else if(idInfluenciador !== null && ativos !== null){
      return this.http.get(`${this.apiUrl}/servico?ativos=${ativos}&idInfluenciador=${idInfluenciador}`, {headers});
    }
    else{
      return this.http.get(`${this.apiUrl}/servico`, {headers});
    }
  }

  // updateInfluenciador(token: string, influenciador: InfluenciadorModel): Observable<any>{
  //   let headers = this.getHeaders(token);
  //
  //   return this.http.put(`${this.apiUrl}/influenciador/${influenciador.id}`, influenciador, {headers})
  // }
  //
  // updateStatusInfluenciador(token: string, id: string): Observable<any>{
  //   let headers = this.getHeaders(token);
  //
  //   return this.http.put(`${this.apiUrl}/influenciador/status/${id}`, null,{headers})
  // }

  private getHeaders(token: string){
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
