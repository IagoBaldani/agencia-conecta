import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InfluenciadorModel} from "../model/influenciador.model";
import {ServicoModel} from "../model/servico.model";

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

  getServicoPorId(token: string, id: string): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/servico/${id}`, {headers})
  }

  createServico(token: string, servico: ServicoModel): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.post(`${this.apiUrl}/servico`, servico, {headers});
  }

  updateServico(token: string, servico: ServicoModel): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.put(`${this.apiUrl}/servico/${servico.id}`, servico, {headers});
  }

  updateStatusServico(token: string, id: string): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.put(`${this.apiUrl}/servico/status/${id}`, null,{headers});
  }

  deleteServico(token: string, id: string): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.delete(`${this.apiUrl}/servico/${id}`, {headers});
  }

  private getHeaders(token: string){
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
