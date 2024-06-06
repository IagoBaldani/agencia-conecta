import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {NgxMaskDirective} from "ngx-mask";
import {ReactiveFormsModule} from "@angular/forms";
import {UtilService} from "../../service/util.service";
import {CardApiService} from "../../service/card-api.service";
import {CardInfluenciadoresModel} from "../../model/cardInfluenciadores.model";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-influenciadores',
  standalone: true,
  imports: [MenuComponent, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './influenciadores.component.html',
  styleUrl: './influenciadores.component.scss'
})
export class InfluenciadoresComponent implements OnInit {
  cardInfluenciadores: CardInfluenciadoresModel = new CardInfluenciadoresModel();

  constructor(private utilService: UtilService, private cardApiService: CardApiService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    let token = this.utilService.validarToken();

    if (token !== null) {
      this.cardApiService.getCardInfluenciadores(token).subscribe(response => {
        this.preencheModelCardInfluenciadores(response.retorno);
        console.log(this.cardInfluenciadores);

      }, responseError => {
        console.log(responseError);
        this.toastService.error(responseError.error.mensagem);
      });
    }
  }

  preencheModelCardInfluenciadores(retorno: any) {
    this.cardInfluenciadores.influenciadorMaisAntigo = retorno.influenciadorMaisAntigo;
    this.cardInfluenciadores.influenciadorMaisRecente = retorno.influenciadorMaisRecente;
    this.cardInfluenciadores.qtdInfluenciadoresAtivos = retorno.qtdInfluenciadoresAtivos;
  }
}
