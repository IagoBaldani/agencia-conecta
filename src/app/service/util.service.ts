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
    let token = localStorage.getItem("tokenApi");

    if(token === null){
      this.retornaParaPaginaDeLogin();
      return "";
    }
    else{
      this.authApiService.validarToken(token).subscribe(response => {
          console.log(response.mensagem);
        },
        error => {
          this.retornaParaPaginaDeLogin();
        })

      return token;
    }
  }

  verificaVazioOuNulo(valorASerChecado: string | null): boolean{
    return valorASerChecado === "" || valorASerChecado === " " || valorASerChecado === null
  }
}
