import { Component } from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {FormsModule} from "@angular/forms";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";

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

  valor: number | null = null;
  porcentagem: number | null = null;
  valorAcessor: number | null = null;
  valorInfluenciador: number | null = null;

  calcular(){
    if(this.valor !== null && this.porcentagem !== null){
      this.valorAcessor = this.valor * (this.porcentagem / 100);

      this.valorInfluenciador = this.valor - this.valorAcessor;
    }

    if(this.valor == null){
      alert("Favor informar o valor.")
    }
    if(this.porcentagem == null){
      alert("Favor informar a porcentagem.")
    }
  }

}
