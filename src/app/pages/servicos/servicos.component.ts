import { Component } from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    MenuComponent
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {

}
