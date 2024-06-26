import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AuthApiService} from "../../service/auth-api.service";
import {UsuarioModel} from "../../model/usuario.model";
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
export class LoginComponent implements OnInit{
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private authApiService: AuthApiService, private router: Router,
              private toastService: ToastService, private utilService: UtilService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("tokenApi") !== null){
      localStorage.removeItem("tokenApi")
    }
  }


  login(){
    if(this.utilService.verificaVazioOuNulo(this.usuario.login) || this.utilService.verificaVazioOuNulo(this.usuario.senha)){
      this.toastService.error("Favor inserir o usuário e a senha.");
    }
    else{
      this.authApiService.auth(this.usuario).subscribe(response => {
        localStorage.setItem("tokenApi", response.retorno);
        this.router.navigate(["/influenciadores"]);

      }, responseError => {
        this.utilService.tratarException(responseError);
      })
    }
  }
}
