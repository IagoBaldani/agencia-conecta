import { Component } from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";

@Component({
  selector: 'app-financas',
  standalone: true,
  imports: [
    MenuComponent
  ],
  templateUrl: './financas.component.html',
  styleUrl: './financas.component.scss'
})
export class FinancasComponent {

}
