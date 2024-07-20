import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCardInfluenciadores(token: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/card/influenciador`, {headers});
  }

  getCardFinancasTotais(token: string, mes: number, ano: number): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/card/financa/totais?mes=${mes}&ano=${ano}`, {headers});
  }

  getCardFinancasDescricao(token: string, mes: number, ano: number): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/card/financa?mes=${mes}&ano=${ano}`, {headers});
  }

  getCardProximosAniversarios(token: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/card/aniversarios`, {headers});
  }

  getCardProximosContratosVencendo(token: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/card/vencimentosContrato`, {headers});
  }

  private getHeaders(token: string){
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
