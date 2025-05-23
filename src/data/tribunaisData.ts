
export interface Tribunal {
  nome: string;
  alias: string;
}

export const TRIBUNAIS: Tribunal[] = [
  // Superiores
  { nome: 'Tribunal Superior do Trabalho (TST)', alias: 'api_publica_tst' },
  { nome: 'Tribunal Superior Eleitoral (TSE)', alias: 'api_publica_tse' },
  { nome: 'Tribunal Superior de Justiça (STJ)', alias: 'api_publica_stj' },
  { nome: 'Tribunal Superior Militar (STM)', alias: 'api_publica_stm' },
  // Justiça Federal
  { nome: 'TRF 1ª Região', alias: 'api_publica_trf1' },
  { nome: 'TRF 2ª Região', alias: 'api_publica_trf2' },
  { nome: 'TRF 3ª Região', alias: 'api_publica_trf3' },
  { nome: 'TRF 4ª Região', alias: 'api_publica_trf4' },
  { nome: 'TRF 5ª Região', alias: 'api_publica_trf5' },
  { nome: 'TRF 6ª Região', alias: 'api_publica_trf6' },
  // Justiça Estadual
  { nome: 'TJ Acre (AC)', alias: 'api_publica_tjac' },
  { nome: 'TJ Alagoas (AL)', alias: 'api_publica_tjal' },
  { nome: 'TJ Amazonas (AM)', alias: 'api_publica_tjam' },
  { nome: 'TJ Amapá (AP)', alias: 'api_publica_tjap' },
  { nome: 'TJ Bahia (BA)', alias: 'api_publica_tjba' },
  { nome: 'TJ Ceará (CE)', alias: 'api_publica_tjce' },
  { nome: 'TJ Distrito Federal e Territórios (DF)', alias: 'api_publica_tjdft' },
  { nome: 'TJ Espírito Santo (ES)', alias: 'api_publica_tjes' },
  { nome: 'TJ Goiás (GO)', alias: 'api_publica_tjgo' },
  { nome: 'TJ Maranhão (MA)', alias: 'api_publica_tjma' },
  { nome: 'TJ Minas Gerais (MG)', alias: 'api_publica_tjmg' },
  { nome: 'TJ Mato Grosso do Sul (MS)', alias: 'api_publica_tjms' },
  { nome: 'TJ Mato Grosso (MT)', alias: 'api_publica_tjmt' },
  { nome: 'TJ Pará (PA)', alias: 'api_publica_tjpa' },
  { nome: 'TJ Paraíba (PB)', alias: 'api_publica_tjpb' },
  { nome: 'TJ Pernambuco (PE)', alias: 'api_publica_tjpe' },
  { nome: 'TJ Piauí (PI)', alias: 'api_publica_tjpi' },
  { nome: 'TJ Paraná (PR)', alias: 'api_publica_tjpr' },
  { nome: 'TJ Rio de Janeiro (RJ)', alias: 'api_publica_tjrj' },
  { nome: 'TJ Rio Grande do Norte (RN)', alias: 'api_publica_tjrn' },
  { nome: 'TJ Rondônia (RO)', alias: 'api_publica_tjro' },
  { nome: 'TJ Roraima (RR)', alias: 'api_publica_tjrr' },
  { nome: 'TJ Rio Grande do Sul (RS)', alias: 'api_publica_tjrs' },
  { nome: 'TJ Santa Catarina (SC)', alias: 'api_publica_tjsc' },
  { nome: 'TJ Sergipe (SE)', alias: 'api_publica_tjse' },
  { nome: 'TJ São Paulo (SP)', alias: 'api_publica_tjsp' },
  { nome: 'TJ Tocantins (TO)', alias: 'api_publica_tjto' },
  // Justiça do Trabalho
  { nome: 'TRT 1ª Região', alias: 'api_publica_trt1' },
  { nome: 'TRT 2ª Região', alias: 'api_publica_trt2' },
  { nome: 'TRT 3ª Região', alias: 'api_publica_trt3' },
  { nome: 'TRT 4ª Região', alias: 'api_publica_trt4' },
  { nome: 'TRT 5ª Região', alias: 'api_publica_trt5' },
  { nome: 'TRT 6ª Região', alias: 'api_publica_trt6' },
  { nome: 'TRT 7ª Região', alias: 'api_publica_trt7' },
  { nome: 'TRT 8ª Região', alias: 'api_publica_trt8' },
  { nome: 'TRT 9ª Região', alias: 'api_publica_trt9' },
  { nome: 'TRT 10ª Região', alias: 'api_publica_trt10' },
  { nome: 'TRT 11ª Região', alias: 'api_publica_trt11' },
  { nome: 'TRT 12ª Região', alias: 'api_publica_trt12' },
  { nome: 'TRT 13ª Região', alias: 'api_publica_trt13' },
  { nome: 'TRT 14ª Região', alias: 'api_publica_trt14' },
  { nome: 'TRT 15ª Região', alias: 'api_publica_trt15' },
  { nome: 'TRT 16ª Região', alias: 'api_publica_trt16' },
  { nome: 'TRT 17ª Região', alias: 'api_publica_trt17' },
  { nome: 'TRT 18ª Região', alias: 'api_publica_trt18' },
  { nome: 'TRT 19ª Região', alias: 'api_publica_trt19' },
  { nome: 'TRT 20ª Região', alias: 'api_publica_trt20' },
  { nome: 'TRT 21ª Região', alias: 'api_publica_trt21' },
  { nome: 'TRT 22ª Região', alias: 'api_publica_trt22' },
  { nome: 'TRT 23ª Região', alias: 'api_publica_trt23' },
  { nome: 'TRT 24ª Região', alias: 'api_publica_trt24' },
  // Justiça Eleitoral
  { nome: 'TRE Acre (AC)', alias: 'api_publica_tre-ac' },
  { nome: 'TRE Alagoas (AL)', alias: 'api_publica_tre-al' },
  { nome: 'TRE Amazonas (AM)', alias: 'api_publica_tre-am' },
  { nome: 'TRE Amapá (AP)', alias: 'api_publica_tre-ap' },
  { nome: 'TRE Bahia (BA)', alias: 'api_publica_tre-ba' },
  { nome: 'TRE Ceará (CE)', alias: 'api_publica_tre-ce' },
  { nome: 'TRE Distrito Federal (DF)', alias: 'api_publica_tre-dft' },
  { nome: 'TRE Espírito Santo (ES)', alias: 'api_publica_tre-es' },
  { nome: 'TRE Goiás (GO)', alias: 'api_publica_tre-go' },
  { nome: 'TRE Maranhão (MA)', alias: 'api_publica_tre-ma' },
  { nome: 'TRE Minas Gerais (MG)', alias: 'api_publica_tre-mg' },
  { nome: 'TRE Mato Grosso do Sul (MS)', alias: 'api_publica_tre-ms' },
  { nome: 'TRE Mato Grosso (MT)', alias: 'api_publica_tre-mt' },
  { nome: 'TRE Pará (PA)', alias: 'api_publica_tre-pa' },
  { nome: 'TRE Paraíba (PB)', alias: 'api_publica_tre-pb' },
  { nome: 'TRE Pernambuco (PE)', alias: 'api_publica_tre-pe' },
  { nome: 'TRE Piauí (PI)', alias: 'api_publica_tre-pi' },
  { nome: 'TRE Paraná (PR)', alias: 'api_publica_tre-pr' },
  { nome: 'TRE Rio de Janeiro (RJ)', alias: 'api_publica_tre-rj' },
  { nome: 'TRE Rio Grande do Norte (RN)', alias: 'api_publica_tre-rn' },
  { nome: 'TRE Rondônia (RO)', alias: 'api_publica_tre-ro' },
  { nome: 'TRE Roraima (RR)', alias: 'api_publica_tre-rr' },
  { nome: 'TRE Rio Grande do Sul (RS)', alias: 'api_publica_tre-rs' },
  { nome: 'TRE Santa Catarina (SC)', alias: 'api_publica_tre-sc' },
  { nome: 'TRE Sergipe (SE)', alias: 'api_publica_tre-se' },
  { nome: 'TRE São Paulo (SP)', alias: 'api_publica_tre-sp' },
  { nome: 'TRE Tocantins (TO)', alias: 'api_publica_tre-to' },
  // Justiça Militar Estadual
  { nome: 'TJM Minas Gerais (MG)', alias: 'api_publica_tjmmg' },
  { nome: 'TJM Rio Grande do Sul (RS)', alias: 'api_publica_tjmrs' },
  { nome: 'TJM São Paulo (SP)', alias: 'api_publica_tjmsp' }
];
