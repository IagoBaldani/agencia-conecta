import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GastoModel} from "../model/gasto.model";

@Injectable({
  providedIn: 'root'
})
export class GastoApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGastosPorMesAno(token: string, mes: number, ano: number): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/gasto?mes=${mes}&ano=${ano}`, {headers});
  }

  getGastoPorId(token: string, id: string): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/gasto/${id}`, {headers})
  }

  getGastosFixos(token: string): Observable<any> {
    let headers = this.getHeaders(token);

    return this.http.get(`${this.apiUrl}/gasto/fixos`, {headers});
  }

  createGasto(token: string, gasto: GastoModel): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.post(`${this.apiUrl}/gasto`, gasto, {headers});
  }

  updateGasto(token: string, gasto: GastoModel): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.put(`${this.apiUrl}/gasto/${gasto.id}`, gasto, {headers});
  }

  deleteGasto(token: string, id: string): Observable<any>{
    let headers = this.getHeaders(token);

    return this.http.delete(`${this.apiUrl}/gasto/${id}`, {headers});
  }

  private getHeaders(token: string){
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
