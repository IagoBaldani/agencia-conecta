import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "./auth-api.service";
import {ToastService} from "angular-toastify";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private route: Router, private authApiService: AuthApiService, private toastService: ToastService) { }

  public retornaParaPaginaDeLogin():void {
    localStorage.removeItem("tokenApi")

    this.route.navigate(["/login"]);
  }

  public validarToken(){
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

  public tratarException(responseError: any){
    console.log(responseError);

    if(responseError.error !== null){
      if(responseError.error.mensagem !== null){
        this.toastService.error(responseError.error.mensagem);
      }
      else{
        this.toastService.error(responseError.error);
      }
    }
    else{
      this.toastService.error("Erro ao realizar operação. Por favor, tente novamente mais tarde.");
    }
  }

  public verificaVazioOuNulo(valorASerChecado: string | null): boolean{
    return valorASerChecado === "" || valorASerChecado === " " || valorASerChecado === null
  }
}
