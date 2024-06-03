import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {ActivatedRoute} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-cadastrar-visualizar-servico',
  standalone: true,
  imports: [
    MenuComponent,
    NgIf,
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgxMaskPipe
  ],
  providers:[
    provideNgxMask()
  ],
  templateUrl: './cadastrar-visualizar-servico.component.html',
  styleUrl: './cadastrar-visualizar-servico.component.scss'
})
export class CadastrarVisualizarServicoComponent implements OnInit{
  tipoPagina: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if(this.route.snapshot.paramMap.has('tipoPagina')){
      this.tipoPagina = this.route.snapshot.paramMap.get('tipoPagina');
    }
  }
}
