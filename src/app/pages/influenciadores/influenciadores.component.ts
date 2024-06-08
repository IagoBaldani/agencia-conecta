import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {NgxMaskDirective} from "ngx-mask";
import {ReactiveFormsModule} from "@angular/forms";
import {UtilService} from "../../service/util.service";
import {CardApiService} from "../../service/card-api.service";
import {CardInfluenciadoresModel} from "../../model/cardInfluenciadores.model";
import {ToastService} from "angular-toastify";
import {InfluenciadorApiService} from "../../service/influenciador-api.service";
import {InfluenciadorSimplificadoModel} from "../../model/influenciadorSimplificado.model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-influenciadores',
  standalone: true,
  imports: [MenuComponent, NgxMaskDirective, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './influenciadores.component.html',
  styleUrl: './influenciadores.component.scss'
})
export class InfluenciadoresComponent implements OnInit {
  cardInfluenciadores: CardInfluenciadoresModel = new CardInfluenciadoresModel();
  listaInfluenciadorSimplificado: InfluenciadorSimplificadoModel[] = [];

  constructor(private utilService: UtilService, private cardApiService: CardApiService,
              private influenciadorApiService: InfluenciadorApiService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    let token = this.utilService.validarToken();

    this.getCardInfluenciadores(token);
    this.getInfluenciadores(token);
  }

  private getCardInfluenciadores(token: string) {
    this.cardApiService.getCardInfluenciadores(token).subscribe(response => {
      this.preencheModelCardInfluenciadores(response.retorno);

    }, responseError => {
      console.log(responseError);
      this.toastService.error(responseError.error.mensagem);
    });
  }

  private getInfluenciadores(token: string) {
    this.influenciadorApiService.getInfluenciadores(token).subscribe(response => {
     this.preencheModelInfluenciadorSimplificado(response.retorno);

    }, responseError => {
      console.log(responseError);
      this.toastService.error(responseError.error.mensagem);
    });
  }

  preencheModelCardInfluenciadores(retorno: any) {
    this.cardInfluenciadores.influenciadorMaisAntigo = retorno.influenciadorMaisAntigo;
    this.cardInfluenciadores.influenciadorMaisRecente = retorno.influenciadorMaisRecente;
    this.cardInfluenciadores.qtdInfluenciadoresAtivos = retorno.qtdInfluenciadoresAtivos;
  }

  preencheModelInfluenciadorSimplificado(listaRetorno: any[]) {
    listaRetorno.forEach( retorno => {
      let influenciadorSimplificado = new InfluenciadorSimplificadoModel();

      influenciadorSimplificado.id = retorno.id;
      influenciadorSimplificado.nome = retorno.nome;
      influenciadorSimplificado.cidadeEstado = retorno.cidadeEstado;
      influenciadorSimplificado.ativo = retorno.ativo;

      this.listaInfluenciadorSimplificado.push(influenciadorSimplificado);
    })
  }
}
