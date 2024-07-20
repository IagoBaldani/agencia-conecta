export class ServicoModel{
  id: string;
  nomeContratante: string;
  influenciadorId: string;
  nomeInfluenciador: string;
  celularContratante: string;
  emailContratante: string;
  proposta: string;
  dataInicio: string;
  dataFim: string;
  porcentagem: number;
  valor: number;
  descricaoTipoPagamento: string;
  usoImagem: boolean;
  impulsionamento: boolean;
  exclusividade: boolean;
  declaravel: boolean;
  ativo: boolean;

  constructor() {
    this.id = "";
    this.nomeContratante = "";
    this.influenciadorId = "";
    this.nomeInfluenciador = "";
    this.celularContratante = "";
    this.emailContratante = "";
    this.proposta = "";
    this.dataInicio = "";
    this. dataFim = "";
    this.porcentagem = 0;
    this.valor = 0;
    this.descricaoTipoPagamento = "";
    this.usoImagem = false;
    this.impulsionamento = false;
    this.exclusividade = false;
    this.declaravel = false;
    this.ativo = false;
  }

}
