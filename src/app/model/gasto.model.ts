export class GastoModel {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  fixo: boolean;

  constructor() {
    this.id = "";
    this.descricao = "";
    this.valor = 0;
    this.data = "";
    this.fixo = false;
  }

}
