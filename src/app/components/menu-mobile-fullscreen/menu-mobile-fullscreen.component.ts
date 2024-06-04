import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-menu-mobile-fullscreen',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './menu-mobile-fullscreen.component.html',
  styleUrl: './menu-mobile-fullscreen.component.scss'
})
export class MenuMobileFullscreenComponent implements OnInit{
  @Input() pagina: string = '';
  @Input() estaAberto: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  isInfluenciadores: boolean = false;
  isServicos: boolean = false;
  isFinancas: boolean = false;
  isCalculadora: boolean = false;

  ngOnInit(): void {
    this.verificaPagina();
  }

  private verificaPagina() :void{
    this.isInfluenciadores = this.pagina === 'influenciadores'
    this.isServicos = this.pagina === 'servicos';
    this.isFinancas = this.pagina === 'financas';
    this.isCalculadora = this.pagina === 'calculadora';
  }

  toggleMenuMobile(){
    this.estaAberto = !this.estaAberto;

    this.valueChange.emit(this.estaAberto ? 'S' : 'N');
  }

}
