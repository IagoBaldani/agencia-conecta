import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {UtilService} from "../../service/util.service";
import {CardApiService} from "../../service/card-api.service";
import {ToastService} from "angular-toastify";
import {CardFinancasTotaisModel} from "../../model/cardFinancasTotais.model";
import {CardFinancasDescricaoModel} from "../../model/cardFinancasDescricao.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-financas',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule
  ],
  templateUrl: './financas.component.html',
  styleUrl: './financas.component.scss'
})
export class FinancasComponent implements OnInit{
  cardFinancasTotais: CardFinancasTotaisModel = new CardFinancasTotaisModel();
  listaCardFinancasDescricao: CardFinancasDescricaoModel[] = [];

  private dataAtual: Date = new Date();

  constructor(private utilService: UtilService, private cardApiService: CardApiService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    let token = this.utilService.validarToken();

    if (token !== null) {
      this.getCardFinancasTotais(token);
      this.getCardFinancasDescricao(token);
    }
  }

  getCardFinancasTotais(token: string){
      this.cardApiService.getCardFinancasTotais(token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear()).subscribe(response => {
        this.preencheModelCardFinancasTotais(response.retorno);
        console.log(this.cardFinancasTotais);

      }, responseError => {
        console.log(responseError);
        this.toastService.error(responseError.error.mensagem);
      });
  }

  getCardFinancasDescricao(token: string){
    this.cardApiService.getCardFinancasDescricao(token, this.dataAtual.getMonth() + 1, this.dataAtual.getFullYear()).subscribe(response => {
      this.preencheModelCardFinancasDescricao(response.retorno);
      console.log(this.listaCardFinancasDescricao);

    }, responseError => {
      console.log(responseError);
      this.toastService.error(responseError.error.mensagem);
    });
  }

  preencheModelCardFinancasTotais(retorno: any) {
    this.cardFinancasTotais.ganhosAcessor = retorno.ganhosAcessor;
    this.cardFinancasTotais.totalContratos = retorno.totalContratos;
  }

  preencheModelCardFinancasDescricao(listaRetorno: any[]) {
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
