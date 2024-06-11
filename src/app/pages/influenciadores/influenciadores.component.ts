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
      this.utilService.tratarException(responseError);
    });
  }

  private getInfluenciadores(token: string) {
    this.influenciadorApiService.getInfluenciadores(token).subscribe(response => {
     this.utilService.preencheModelInfluenciadorSimplificado(this.listaInfluenciadorSimplificado, response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private preencheModelCardInfluenciadores(retorno: any) {
    this.cardInfluenciadores.influenciadorMaisAntigo = retorno.influenciadorMaisAntigo;
    this.cardInfluenciadores.influenciadorMaisRecente = retorno.influenciadorMaisRecente;
    this.cardInfluenciadores.qtdInfluenciadoresAtivos = retorno.qtdInfluenciadoresAtivos;
  }

}
