import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "./auth-api.service";
import {ToastService} from "angular-toastify";
import {InfluenciadorSimplificadoModel} from "../model/influenciadorSimplificado.model";

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

  public formataValoresEmReais(valor: number): string{
    let valorFormatado = valor.toFixed(2);

    let [parteInteiros, parteDecimal] = valorFormatado.split('.');

    let parteInteirosFormatada = parteInteiros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$${parteInteirosFormatada},${parteDecimal}`;
  }

  public formataData(data: string){
    let dataQuebrada = data.split("-");

    return `${dataQuebrada.at(2)}/${dataQuebrada.at(1)}/${dataQuebrada.at(0)}`;
  }

  public formataDataMesAno(data: string){
    let dataQuebrada = data.split("-");

    return `${dataQuebrada.at(2)}/${dataQuebrada.at(1)}`;
  }

  public getDataAtualFormatadaParaComparacao(){
    let dataAtual = new Date();
    let mesAtualInt = dataAtual.getMonth()+1
    let mesAtualString = mesAtualInt < 10 ? `0${mesAtualInt}` : `${mesAtualInt}`

    return `${dataAtual.getDate()}/${mesAtualString}`
  }

  public isEmailValido(email: string): boolean{
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  public verificaVazioOuNulo(valorASerChecado: string | number | null): boolean{
    return valorASerChecado === "" || valorASerChecado === " " || valorASerChecado === null
  }

  public preencheModelInfluenciadorSimplificado(listaInfluenciadores: InfluenciadorSimplificadoModel[], listaRetorno: any[]) {
    listaRetorno.forEach( retorno => {
      let influenciadorSimplificado = new InfluenciadorSimplificadoModel();

      influenciadorSimplificado.id = retorno.id;
      influenciadorSimplificado.nome = retorno.nome;
      influenciadorSimplificado.cidadeEstado = retorno.cidadeEstado;
      influenciadorSimplificado.ativo = retorno.ativo;

      listaInfluenciadores.push(influenciadorSimplificado);
    })
  }
}
