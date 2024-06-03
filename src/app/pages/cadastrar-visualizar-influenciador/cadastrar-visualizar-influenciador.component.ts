import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MenuComponent} from "../../components/menu/menu.component";
import {NgIf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cadastrar-visualizar-influenciador',
  standalone: true,
    imports: [
        FormsModule,
        MenuComponent,
        NgIf,
        NgxMaskDirective
    ],
  templateUrl: './cadastrar-visualizar-influenciador.component.html',
  styleUrl: './cadastrar-visualizar-influenciador.component.scss'
})
export class CadastrarVisualizarInfluenciadorComponent implements OnInit{

    tipoPagina: string | null = null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        if(this.route.snapshot.paramMap.has('tipoPagina')){
            this.tipoPagina = this.route.snapshot.paramMap.get('tipoPagina');
        }
    }
}
