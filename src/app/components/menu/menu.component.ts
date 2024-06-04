import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {MenuMobileFullscreenComponent} from "../menu-mobile-fullscreen/menu-mobile-fullscreen.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgClass,
    MenuMobileFullscreenComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  @Input() pagina: string = '';

  isInfluenciadores: boolean = false;
  isServicos: boolean = false;
  isFinancas: boolean = false;
  isCalculadora: boolean = false;

  menuMobileEstaAberto: boolean = false;

  ngOnInit(): void {
    this.isInfluenciadores = this.pagina === 'influenciadores'
    this.isServicos = this.pagina === 'servicos';
    this.isFinancas = this.pagina === 'financas';
    this.isCalculadora = this.pagina === 'calculadora';
  }

  toggleMenuMobileFullscreen(){
    this.menuMobileEstaAberto = !this.menuMobileEstaAberto;
  }

  recebeValorDoComponenteFilho(value: string) {
    this.menuMobileEstaAberto = value === 'S';
  }
}
