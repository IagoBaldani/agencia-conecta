import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "./auth-api.service";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private route: Router, private authApiService: AuthApiService) { }

  public retornaParaPaginaDeLogin():void {
    localStorage.removeItem("tokenApi")

    this.route.navigate(["/login"]);
  }

  validarToken(){
    if(localStorage.getItem("tokenApi") === null){
      this.retornaParaPaginaDeLogin();
    }

    let token = localStorage.getItem("tokenApi");

    if(token !== null){
      this.authApiService.validarToken(token).subscribe(response => {
          console.log(response.mensagem);
        },
        error => {
          this.retornaParaPaginaDeLogin();
        })
    }
  }

  verificaVazioOuNulo(valorASerChecado: string | null): boolean{
    return valorASerChecado === "" || valorASerChecado === " " || valorASerChecado === null
  }
}
