import { Component } from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {FormsModule} from "@angular/forms";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {ToastService} from "angular-toastify";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    MenuComponent,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers:[
    provideNgxMask()
  ],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss'
})
export class CalculadoraComponent {

  valor: number = 0;
  porcentagem: number = 0;
  valorAcessor: number = 0;
  valorInfluenciador: number = 0;

  constructor(private toastService: ToastService, public utilService: UtilService) {
  }

  calcular(){
    if(!this.utilService.verificaVazioOuNulo(this.valor) && !this.utilService.verificaVazioOuNulo(this.porcentagem)){
      this.valorAcessor = this.valor * (this.porcentagem / 100);

      this.valorInfluenciador = this.valor - this.valorAcessor;
    }
    else{
      this.toastService.error("Favor informar o valor e a porcentagem.");
    }
  }

}
