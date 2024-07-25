import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {ActivatedRoute} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GastoModel} from "../../model/gasto.model";
import {UtilService} from "../../service/util.service";
import {ToastService} from "angular-toastify";
import {GastoApiService} from "../../service/gasto-api.service";

@Component({
  selector: 'app-cadastrar-visualizar-gasto',
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
  templateUrl: './cadastrar-visualizar-gasto.component.html',
  styleUrl: './cadastrar-visualizar-gasto.component.scss'
})
export class CadastrarVisualizarGastoComponent implements OnInit{
  tipoPagina: string | null = null;
  idGasto: string | null = null;
  isVisualizar: boolean = false;
  isAlterar: boolean = false;
  isCadastrar: boolean = false;
  gastoFixoSelecionado: GastoModel = new GastoModel();

  token: string = this.utilService.validarToken();
  gasto: GastoModel = new GastoModel();
  listaGastosFixos: GastoModel[] =[];

  constructor(private route: ActivatedRoute, public utilService: UtilService, private toastService: ToastService,
              private gastoApiService: GastoApiService) {}

  ngOnInit() {
    this.preencheAtributosPagina();
    if(this.isCadastrar){
      this.preencheSelectGastosFixos();
    }

    if (this.idGasto !== null && (this.isVisualizar || this.isAlterar)) {
      this.getGasto(this.token, this.idGasto);
    }
  }

  redirecionaParaPaginaAlterar() {
    window.location.href = `/cadastrar-visualizar-gasto/alterar?id=${this.gasto.id}`;
  }

  preencherGastoFixo(){
    this.gasto.descricao = this.gastoFixoSelecionado.descricao;
    this.gasto.valor = this.gastoFixoSelecionado.valor;
    this.gasto.fixo = this.gastoFixoSelecionado.fixo;
  }

  cadastrarGasto(){
    if(this.isGastoValido()){
      console.log(this.gasto);
      this.createGasto(this.token, this.gasto);

      setTimeout(()=>{
        window.location.href = `/gastos`;
      }, 2000);
    }
  }

  alterarGasto(){
    if(this.isGastoValido()){
      this.updateGasto(this.token, this.gasto);

      setTimeout(()=>{
        window.location.href = `/cadastrar-visualizar-gasto/visualizar?id=${this.gasto.id}`;
      }, 2000);
    }
  }

  excluirGasto(){
    if(confirm("Você realmente deseja excluir este gasto? Este processo é irrecuperável.")){
      this.deleteGasto(this.token, this.gasto.id);

      setTimeout(() => {
        window.location.href = '/gastos';
      }, 2000)
    }
  }

  private getGasto(token: string, id: string){
    this.gastoApiService.getGastoPorId(token, id).subscribe(response => {
      this.preencheModelGasto(response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private createGasto(token: string, gasto: GastoModel){
    this.gastoApiService.createGasto(token, gasto).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private updateGasto(token: string, gasto: GastoModel){
    this.gastoApiService.updateGasto(token, gasto).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private deleteGasto(token: string, id: string){
    this.gastoApiService.deleteGasto(token, id).subscribe(response => {
      this.toastService.success(response.mensagem);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private isGastoValido(){
    if(this.utilService.verificaVazioOuNulo(this.gasto.descricao) ||
    this.utilService.verificaVazioOuNulo(this.gasto.valor) ||
    this.utilService.verificaVazioOuNulo(this.gasto.data)){
      this.toastService.error("Favor informar todos os campos obrigatórios.");

      return false;
    }

    return true;
  }

  private preencheModelGasto(retorno: any){
    this.gasto.id = retorno.id;
    this.gasto.valor = retorno.valor;
    this.gasto.data = retorno.data;
    this.gasto.descricao = retorno.descricao;
    this.gasto.fixo = retorno.fixo;
  }

  private preencheListaGastosFixos(listaRetorno: any[]){

    listaRetorno.forEach( gasto => {
      let gastoFixo = new GastoModel();

      gastoFixo.id = gasto.id;
      gastoFixo.valor = gasto.valor;
      gastoFixo.descricao = gasto.descricao;
      gastoFixo.fixo = gasto.fixo;

      this.listaGastosFixos.push(gastoFixo);
    })
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
      this.idGasto = params.get("id");
    });
  }

  private preencheSelectGastosFixos(){
    this.gastoApiService.getGastosFixos(this.token).subscribe(response => {
      this.preencheListaGastosFixos(response.retorno);
    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }
}
