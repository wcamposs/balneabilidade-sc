export interface IAnalise {
  DATA: string;
  CONDICAO: string;
}

export interface IPonto {
  CODIGO: string;
  MUNICIPIO: string;
  PONTO_NOME: string;
  BALNEARIO: string;
  LOCALIZACAO: string;
  LATITUDE: string;
  LONGITUDE: string;
  ANALISES: Array<IAnalise>;
}
