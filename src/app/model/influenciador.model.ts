export class InfluenciadorModel {
  id: string;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  cidadeEstado: string;
  endereco: string;
  dataContrato: string;
  dataNascimento: string;
  instagram: string;
  tiktok: string;
  youtube : string;
  ativo: boolean;

  constructor() {
    this.id = "";
    this.nome = "";
    this.cidadeEstado = "";
    this.ativo = false;
    this.cpf = "";
    this.celular = "";
    this.email = "";
    this.cidadeEstado = "";
    this.endereco = "";
    this.dataContrato = "";
    this.dataNascimento = "";
    this.instagram = "";
    this.tiktok = "";
    this.youtube = "";
  }

}
