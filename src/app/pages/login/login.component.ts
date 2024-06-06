import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AuthApiService} from "../../service/auth-api.service";
import {Usuario} from "../../model/usuario.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularToastifyModule, ToastService} from "angular-toastify";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    AngularToastifyModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: Usuario = new Usuario();

  constructor(private authApiService: AuthApiService, private route: Router,
              private toastService: ToastService, private utilService: UtilService) {
  }

  login(){
    if(this.utilService.verificaVazioOuNulo(this.usuario.login) || this.utilService.verificaVazioOuNulo(this.usuario.senha)){
      this.toastService.error("Favor inserir o usuário e a senha.");
    }
    else{
      this.authApiService.auth(this.usuario).subscribe(response => {
        localStorage.setItem("tokenApi", response.retorno);
        this.route.navigate(["/influenciadores"]);

      }, responseError => {
        this.toastService.error(responseError.error.mensagem);
      })
    }
  }



}
