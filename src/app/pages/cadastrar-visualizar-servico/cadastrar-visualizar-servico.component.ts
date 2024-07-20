import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {ActivatedRoute} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServicoModel} from "../../model/servico.model";
import {UtilService} from "../../service/util.service";
import {ServicoApiService} from "../../service/servico-api.service";
import {InfluenciadorApiService} from "../../service/influenciador-api.service";
import {InfluenciadorSimplificadoModel} from "../../model/influenciadorSimplificado.model";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-cadastrar-visualizar-servico',
  standalone: true,
  imports: [
    MenuComponent,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule
  ],
  providers:[
    provideNgxMask()
  ],
  templateUrl: './cadastrar-visualizar-servico.component.html',
  styleUrl: './cadastrar-visualizar-servico.component.scss'
})
export class CadastrarVisualizarServicoComponent implements OnInit{
  tipoPagina: string | null = null;
  idServico: string | null = null;
  isVisualizar: boolean = false;
  isAlterar: boolean = false;
  isCadastrar: boolean = false;

  token: string = this.utilService.validarToken();
  servico: ServicoModel = new ServicoModel();
  listaInfluenciadoresSimplificado: InfluenciadorSimplificadoModel[] = [];

  constructor(private route: ActivatedRoute, public utilService: UtilService, private toastService: ToastService,
              private servicoApiService: ServicoApiService, private influenciadorApiService: InfluenciadorApiService) {}

  ngOnInit() {
    this.preencheAtributosPagina();
    this.preencheSelectInfluenciadores();

    if (this.idServico !== null && (this.isVisualizar || this.isAlterar)) {
      this.getServico(this.token, this.idServico);
    }
  }

  redirecionaParaPaginaAlterar() {
    window.location.href = `/cadastrar-visualizar-servico/alterar?id=${this.servico.id}`;
  }

  cadastrarServico(){
    if(this.isServicoValido()){
      console.log(this.servico);
      this.createServico(this.token, this.servico);

      setTimeout(()=>{
        window.location.href = `/servicos`;
      }, 2000);
    }
  }

  alterarServico(){
    if(this.isServicoValido()){
      this.updateServico(this.token, this.servico);

      setTimeout(()=>{
        window.location.href = `/cadastrar-visualizar-servico/visualizar?id=${this.servico.id}`;
      }, 2000);
    }
  }

  alterarStatus(){
    this.servico.ativo = !this.servico.ativo;
    this.updateStatusServico(this.token, this.servico.id);
  }

  excluirServico(){
    if(confirm("Você realmente deseja excluir este servico? Este processo é irrecuperável.")){
      this.deleteServico(this.token, this.servico.id);

      setTimeout(() => {
        window.location.href = '/servicos';
      }, 2000)
    }
  }

  private getServico(token: string, id: string){
    this.servicoApiService.getServicoPorId(token, id).subscribe(response => {
      this.preencheModelServico(response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private createServico(token: string, servico: ServicoModel){
    this.servicoApiService.createServico(token, servico).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private updateServico(token: string, servico: ServicoModel){
    this.servicoApiService.updateServico(token, servico).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private updateStatusServico(token: string, id: string){
    this.servicoApiService.updateStatusServico(token, id).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private deleteServico(token: string, id: string){
    this.servicoApiService.deleteServico(token, id).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private isServicoValido(){
    if(this.utilService.verificaVazioOuNulo(this.servico.nomeContratante) ||
    this.utilService.verificaVazioOuNulo(this.servico.influenciadorId) ||
    this.utilService.verificaVazioOuNulo(this.servico.celularContratante) ||
    this.utilService.verificaVazioOuNulo(this.servico.proposta) ||
    this.utilService.verificaVazioOuNulo(this.servico.dataInicio) ||
    this.utilService.verificaVazioOuNulo(this.servico.dataFim) ||
    this.utilService.verificaVazioOuNulo(this.servico.porcentagem) ||
    this.utilService.verificaVazioOuNulo(this.servico.valor) ||
    this.utilService.verificaVazioOuNulo(this.servico.descricaoTipoPagamento)){
      this.toastService.error("Favor informar todos os campos obrigatórios.");

      return false;
    }

    if(!this.utilService.verificaVazioOuNulo(this.servico.emailContratante)){
      if(!this.utilService.isEmailValido(this.servico.emailContratante)){
        this.toastService.error("Favor informar um email válido.");
        return false;
      }
    }

    return true;
  }

  private preencheModelServico(retorno: any){
    this.servico.id = retorno.id;
    this.servico.dataFim = retorno.dataFim;
    this.servico.dataInicio = retorno.dataInicio;
    this.servico.nomeContratante = retorno.nomeContratante;
    this.servico.emailContratante = retorno.emailContratante;
    this.servico.celularContratante = retorno.celularContratante;
    this.servico.influenciadorId = retorno.influenciador.id;
    this.servico.nomeInfluenciador = retorno.influenciador.nome;
    this.servico.proposta = retorno.proposta;
    this.servico.porcentagem = retorno.porcentagem;
    this.servico.valor = retorno.valor;
    this.servico.descricaoTipoPagamento = retorno.descricaoTipoPagamento;
    this.servico.ativo = retorno.ativo;
    this.servico.impulsionamento = retorno.impulsionamento;
    this.servico.usoImagem = retorno.usoImagem;
    this.servico.exclusividade = retorno.exclusividade;
    this.servico.declaravel = retorno.declaravel;
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
      this.idServico = params.get("id");
    });
  }

  private preencheSelectInfluenciadores(){
    this.influenciadorApiService.getInfluenciadoresAtivos(this.token).subscribe(response => {
      this.utilService.preencheModelInfluenciadorSimplificado(this.listaInfluenciadoresSimplificado, response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }
}
