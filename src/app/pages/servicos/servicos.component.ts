import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {UtilService} from "../../service/util.service";
import {InfluenciadorApiService} from "../../service/influenciador-api.service";
import {ServicoApiService} from "../../service/servico-api.service";
import {ServicoModel} from "../../model/servico.model";
import {InfluenciadorSimplificadoModel} from "../../model/influenciadorSimplificado.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    MenuComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent implements OnInit{
  listaServicos: ServicoModel[] = [];
  listaInfluenciadores: InfluenciadorSimplificadoModel[] = [];
  idInfluenciadorSelecionado: number | null = null;
  statusSelecionado: string | null = null;

  private token = this.utilService.validarToken();

  constructor(public utilService: UtilService, private toastService: ToastService,
              private influenciadorApiService: InfluenciadorApiService, private servicoApiService: ServicoApiService) {
  }

  ngOnInit(){
    this.getServicos(this.token, "true", null);
    this.preencheSelectInfluenciadores();
  }

  pesquisarServicos(){
    if(this.statusSelecionado === null && this.idInfluenciadorSelecionado === null){
      this.toastService.error("Favor selecionar uma das opções para realizar a pesquisa de serviços.");
    }
    else{
      this.getServicos(this.token, this.statusSelecionado, this.idInfluenciadorSelecionado);
    }
  }

  private getServicos(token: string, ativos: string | null, idInfluenciador: number | null){
    this.servicoApiService.getServicos(token, ativos, idInfluenciador).subscribe(response => {
      this.preencheListaServicos(response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }

  private preencheListaServicos(listaRetorno: any[]){
    this.listaServicos = [];

    listaRetorno.forEach( retorno => {
      let servico: ServicoModel = new ServicoModel();

      servico.id = retorno.id;
      servico.dataFim = retorno.dataFim;
      servico.dataInicio = retorno.dataInicio;
      servico.nomeContratante = retorno.nomeContratante;
      servico.emailContratante = retorno.emailContratante;
      servico.celularContratante = retorno.celularContratante;
      servico.influenciadorId = retorno.influenciador.id;
      servico.nomeInfluenciador = retorno.influenciador.nome;
      servico.proposta = retorno.proposta;
      servico.porcentagem = retorno.porcentagem;
      servico.valor = retorno.valor;
      servico.descricaoTipoPagamento = retorno.descricaoTipoPagamento;
      servico.ativo = retorno.ativo;
      servico.impulsionamento = retorno.impulsionamento;
      servico.usoImagem = retorno.usoImagem;
      servico.exclusividade = retorno.exclusividade;
      servico.declaravel = retorno.declaravel;

      this.listaServicos.push(servico);
    });
  }

  private preencheSelectInfluenciadores(){
    this.influenciadorApiService.getInfluenciadoresAtivos(this.token).subscribe(response => {
      this.utilService.preencheModelInfluenciadorSimplificado(this.listaInfluenciadores, response.retorno);

    }, responseError => {
      this.utilService.tratarException(responseError);
    });
  }
}
