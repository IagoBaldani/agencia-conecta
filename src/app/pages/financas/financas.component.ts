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

  private dataAtual: Date = new Date();
  private token = this.utilService.validarToken();

  constructor(private utilService: UtilService, private cardApiService: CardApiService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getCardFinancasTotais(this.token);
    this.getCardFinancasDescricao(this.token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear());
  }

  getCardFinancasTotais(token: string){
      this.cardApiService.getCardFinancasTotais(token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear()).subscribe(response => {
        this.preencheModelCardFinancasTotais(response.retorno);

      }, responseError => {
        console.log(responseError);
        this.toastService.error(responseError.error.mensagem);
      });
  }

  preencheModelCardFinancasTotais(retorno: any) {
    this.cardFinancasTotais.ganhosAcessor = retorno.ganhosAcessor;
    this.cardFinancasTotais.totalContratos = retorno.totalContratos;
  }

  getCardFinancasDescricao(token: string, mes: number, ano: number){
    this.cardApiService.getCardFinancasDescricao(token, mes, ano).subscribe(response => {
      this.preencheModelCardFinancasDescricao(response.retorno);

    }, responseError => {
      console.log(responseError);
      this.toastService.error(responseError.error.mensagem);
    });
  }

  preencheModelCardFinancasDescricao(listaRetorno: any[]) {
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

  pesquisaPorData(){

    if(this.mesAno !== '' && this.mesAno !== null){

      let ano = Number(this.mesAno.split("-").at(0));
      let mes = Number(this.mesAno.split("-").at(1));

      this.getCardFinancasDescricao(this.token, mes, ano);
    }
    else{
      this.toastService.error("Por favor informe o mês e o ano desejado.");
    }

  }
}
