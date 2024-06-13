import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MenuComponent} from "../../components/menu/menu.component";
import {NgClass, NgIf} from "@angular/common";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {ActivatedRoute, Router} from "@angular/router";
import {InfluenciadorModel} from "../../model/influenciador.model";
import {InfluenciadorApiService} from "../../service/influenciador-api.service";
import {UtilService} from "../../service/util.service";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-cadastrar-visualizar-influenciador',
  standalone: true,
  imports: [
    FormsModule,
    MenuComponent,
    NgIf,
    NgxMaskDirective,
    NgClass
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastrar-visualizar-influenciador.component.html',
  styleUrl: './cadastrar-visualizar-influenciador.component.scss'
})
export class CadastrarVisualizarInfluenciadorComponent implements OnInit {

  tipoPagina: string | null = null;
  idInfluenciador: string | null = null;
  isVisualizar: boolean = false;
  isAlterar: boolean = false;
  isCadastrar: boolean = false;

  influenciador: InfluenciadorModel = new InfluenciadorModel();
  private token = this.utilService.validarToken();

  constructor(private route: ActivatedRoute, private router: Router,
              private toastService: ToastService, private utilService: UtilService, private influenciadorApiService: InfluenciadorApiService) {
  }

  ngOnInit() {
    this.preencheAtributosPagina();

    if (this.idInfluenciador !== null && (this.isVisualizar || this.isAlterar)) {
      this.getInfluenciador(this.token, this.idInfluenciador);
    }

  }

  cadastrarInfluenciador(){
    if(this.isInfluenciadorValido()){
      this.postInfluenciador(this.token, this.influenciador);

      setTimeout(()=>{
        window.location.href = '/influenciadores';
      }, 2000);
    }
  }

  alterarInfluenciador() {
    if(this.isInfluenciadorValido()){
      this.updateInfluenciador(this.token, this.influenciador);

      setTimeout(()=>{
        window.location.href = `/cadastrar-visualizar-influenciador/visualizar?id=${this.idInfluenciador}`;
      }, 2000);
    }
  }

  alterarStatusInfluenciador() {
    this.updateStatusInfluenciador(this.token, this.influenciador.id);
  }

  deletarInfluenciador(){
    if(confirm("Você realmente deseja excluir este influenciador? Este processo é irrecuperável.")){
      this.deleteInfluenciador(this.token, this.influenciador.id);

      setTimeout(()=>{
        window.location.href = '/influenciadores';
      }, 2000);
    }
  }

  redirecionaParaPaginaAlterar() {
    window.location.href = `/cadastrar-visualizar-influenciador/alterar?id=${this.idInfluenciador}`;
  }

  private getInfluenciador(token: string, id: string) {
    this.influenciadorApiService.getInfluenciador(token, id).subscribe(response => {
      this.preencheModelInfluenciador(response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private postInfluenciador(token: string, influenciador: InfluenciadorModel) {
    this.influenciadorApiService.postInfluenciador(token, influenciador).subscribe(response => {
      this.toastService.success(response.mensagem);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private updateInfluenciador(token: string, influenciador: InfluenciadorModel) {
    this.influenciadorApiService.updateInfluenciador(token, influenciador).subscribe(response => {
      this.toastService.success(response.mensagem);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private updateStatusInfluenciador(token: string, id: string) {
    this.influenciadorApiService.updateStatusInfluenciador(token, id).subscribe(response => {
      this.influenciador.ativo = !this.influenciador.ativo;
      this.toastService.success(response.mensagem);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private deleteInfluenciador(token: string, id: string) {
    this.influenciadorApiService.deleteInfluenciador(token, id).subscribe(response => {
      this.toastService.success(response.mensagem);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private isInfluenciadorValido(): boolean{
    if(this.utilService.verificaVazioOuNulo(this.influenciador.nome) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.cpf) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.celular) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.cidadeEstado) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.dataAssinaturaContrato) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.dataVencimentoContrato) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.dataNascimento) ||
    this.utilService.verificaVazioOuNulo(this.influenciador.instagram)){
      this.toastService.error("Favor informar todos os campos obrigatórios.");
      return false;
    }

    if(!this.utilService.isEmailValido(this.influenciador.email)){
      this.toastService.error("Favor informar um email válido.");
      return false;
    }

    return true;
  }

  private preencheAtributosPagina() {
    this.route.paramMap.subscribe(params => {
      this.tipoPagina = params.get("tipoPagina");

      switch (this.tipoPagina) {
        case 'visualizar':
          this.isVisualizar = true;
          break;
        case 'alterar':
          this.isAlterar = true;
          break;
        case 'cadastrar':
          this.isCadastrar = true;
          break;
      }
    });

    this.route.queryParamMap.subscribe(params => {
      this.idInfluenciador = params.get("id");
    });
  }

  private preencheModelInfluenciador(retorno: any) {
    this.influenciador.id = retorno.id;
    this.influenciador.nome = retorno.nome;
    this.influenciador.cpf = retorno.cpf;
    this.influenciador.celular = retorno.celular;
    this.influenciador.email = retorno.email;
    this.influenciador.cidadeEstado = retorno.cidadeEstado;
    this.influenciador.endereco = retorno.endereco;
    this.influenciador.dataAssinaturaContrato = retorno.dataAssinaturaContrato;
    this.influenciador.dataVencimentoContrato = retorno.dataVencimentoContrato;
    this.influenciador.dataNascimento = retorno.dataNascimento;
    this.influenciador.instagram = retorno.instagram;
    this.influenciador.tiktok = retorno.tiktok;
    this.influenciador.youtube = retorno.youtube;
    this.influenciador.ativo = retorno.ativo;
  }
}
