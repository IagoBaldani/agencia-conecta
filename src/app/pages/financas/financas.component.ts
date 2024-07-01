import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {UtilService} from "../../service/util.service";
import {CardApiService} from "../../service/card-api.service";
import {ToastService} from "angular-toastify";
import {CardFinancasTotaisModel} from "../../model/cardFinancasTotais.model";
import {CardFinancasDescricaoModel} from "../../model/cardFinancasDescricao.model";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-financas',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './financas.component.html',
  styleUrl: './financas.component.scss'
})
export class FinancasComponent implements OnInit{
  cardFinancasTotais: CardFinancasTotaisModel = new CardFinancasTotaisModel();
  listaCardFinancasDescricao: CardFinancasDescricaoModel[] = [];
  mesAno: string = '';
  mesAtual: number = 0;
  anoAtual: number = 0;

  dataAtual: Date = new Date();
  private token = this.utilService.validarToken();

  constructor(public utilService: UtilService, private cardApiService: CardApiService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.mesAtual = this.dataAtual.getMonth() + 1;
    this.anoAtual = this.dataAtual.getFullYear() - 2000;

    this.getCardFinancasTotais(this.token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear());
    this.getCardFinancasDescricao(this.token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear());
  }

  pesquisaPorData(){
    if(this.mesAno !== '' && this.mesAno !== null){
      this.anoAtual = Number(this.mesAno.split("-").at(0));
      this.mesAtual = Number(this.mesAno.split("-").at(1));

      this.getCardFinancasTotais(this.token, this.mesAtual, this.anoAtual);
      this.getCardFinancasDescricao(this.token, this.mesAtual, this.anoAtual);

      this.anoAtual -= 2000;
    }
    else{
      this.toastService.error("Por favor informe o mês e o ano desejado.");
    }

  }

  private getCardFinancasTotais(token: string, mes: number, ano: number){
      this.cardApiService.getCardFinancasTotais(token, mes, ano).subscribe(response => {
        this.preencheModelCardFinancasTotais(response.retorno);

      }, responseError => {
        this.utilService.tratarException(responseError);
      });
  }

  private getCardFinancasDescricao(token: string, mes: number, ano: number){
    this.cardApiService.getCardFinancasDescricao(token, mes, ano).subscribe(response => {
      this.preencheModelCardFinancasDescricao(response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private preencheModelCardFinancasTotais(retorno: any) {
    this.cardFinancasTotais.ganhosAcessor = retorno.ganhosAcessor;
    this.cardFinancasTotais.totalContratos = retorno.totalContratos;
  }

  private preencheModelCardFinancasDescricao(listaRetorno: any[]) {
    this.listaCardFinancasDescricao = [];

    listaRetorno.forEach(retorno => {
      let cardFinancasDescricaoModel = new CardFinancasDescricaoModel();

      cardFinancasDescricaoModel.nomeInfluenciador = retorno.nomeInfluenciador;
      cardFinancasDescricaoModel.qtdServicos = retorno.qtdServicos;
      cardFinancasDescricaoModel.valorInfluenciador = retorno.valorInfluenciador;
      cardFinancasDescricaoModel.valorAcessor = retorno.valorAcessor;

      this.listaCardFinancasDescricao.push(cardFinancasDescricaoModel);
    })
  }
}
