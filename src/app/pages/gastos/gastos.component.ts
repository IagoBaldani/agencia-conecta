import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {UtilService} from "../../service/util.service";
import {ServicoModel} from "../../model/servico.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToastService} from "angular-toastify";
import {GastoModel} from "../../model/gasto.model";
import {GastoApiService} from "../../service/gasto-api.service";

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [
    MenuComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss'
})
export class GastosComponent implements OnInit{
  listaGastos: GastoModel[] = [];
  mesAno: string = '';
  mesAtual: number = 0;
  anoAtual: number = 0;

  dataAtual: Date = new Date();
  private token = this.utilService.validarToken();

  constructor(public utilService: UtilService, private toastService: ToastService,
              private gastoApiService: GastoApiService) {
  }

  ngOnInit(){
    this.mesAtual = this.dataAtual.getMonth() + 1;
    this.anoAtual = this.dataAtual.getFullYear() - 2000;

    this.getGastos(this.token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear());
  }

  pesquisaPorData(){
    if(this.mesAno !== '' && this.mesAno !== null){
      this.anoAtual = Number(this.mesAno.split("-").at(0));
      this.mesAtual = Number(this.mesAno.split("-").at(1));

      this.getGastos(this.token, this.mesAtual, this.anoAtual);

      this.anoAtual -= 2000;
    }
    else{
      this.toastService.error("Por favor informe o mês e o ano desejado.");
    }

  }

  private getGastos(token: string, mes: number, ano: number){
    this.gastoApiService.getGastosPorMesAno(token, mes, ano).subscribe(response => {
      this.preencheListaServicos(response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private preencheListaServicos(listaRetorno: any[]){
    this.listaGastos = [];

    listaRetorno.forEach( retorno => {
      let gasto: GastoModel = new GastoModel();

      gasto.id = retorno.id;
      gasto.valor = retorno.valor;
      gasto.data = retorno.data;
      gasto.descricao = retorno.descricao;
      gasto.fixo = retorno.fixo;

      this.listaGastos.push(gasto);
    });
  }
}
