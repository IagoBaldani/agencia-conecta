import { Component } from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {NgxMaskDirective} from "ngx-mask";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-influenciadores',
  standalone: true,
    imports: [MenuComponent, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './influenciadores.component.html',
  styleUrl: './influenciadores.component.scss'
})
export class InfluenciadoresComponent {

}
