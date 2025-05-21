
export interface Movimento {
  dataHora: string;
  nome: string;
}

export interface Parte {
  tipoParte?: string;
  nome?: string;
  nomeParte?: string;
  numeroDocumento?: string;
}

export interface Assunto {
  nome: string;
  codigo?: string;
}

export interface Classe {
  nome: string;
  codigo?: string;
}

export interface OrgaoJulgador {
  nome: string;
  codigo?: string;
}

export interface Processo {
  numeroProcesso: string;
  tribunal?: string;
  classe?: Classe;
  assuntos?: Assunto[];
  orgaoJulgador?: OrgaoJulgador;
  dataAjuizamento?: string;
  movimentos?: Movimento[];
  partes?: Parte[];
}

export interface CNJApiResponse {
  hits: {
    hits: Array<{
      _source: Processo;
    }>;
  };
}
