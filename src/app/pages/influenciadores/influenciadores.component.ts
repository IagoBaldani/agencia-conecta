import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {NgxMaskDirective} from "ngx-mask";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthApiService} from "../../service/auth-api.service";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-influenciadores',
  standalone: true,
  imports: [MenuComponent, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './influenciadores.component.html',
  styleUrl: './influenciadores.component.scss'
})
export class InfluenciadoresComponent implements OnInit{

  constructor(private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.utilService.validarToken();
  }

}
