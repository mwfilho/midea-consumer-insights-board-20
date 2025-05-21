
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Processo } from '@/types/cnj';

interface ProcessoDetailProps {
  processo: Processo;
}

const ProcessoDetail: React.FC<ProcessoDetailProps> = ({ processo }) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Número do Processo</p>
              <p className="font-medium">{processo.numeroProcesso}</p>
            </div>
            {processo.classe && (
              <div>
                <p className="text-sm font-medium text-gray-500">Classe</p>
                <p className="font-medium">
                  {processo.classe.nome}
                  {processo.classe.codigo && <span className="text-sm text-gray-500 ml-1">(cód. {processo.classe.codigo})</span>}
                </p>
              </div>
            )}
            {processo.orgaoJulgador && (
              <div>
                <p className="text-sm font-medium text-gray-500">Órgão Julgador</p>
                <p className="font-medium">{processo.orgaoJulgador.nome}</p>
              </div>
            )}
            {processo.dataAjuizamento && (
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Ajuizamento</p>
                <p className="font-medium">{new Date(processo.dataAjuizamento).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {processo.assuntos && processo.assuntos.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500">Assuntos</p>
              <p className="font-medium">{processo.assuntos.map(a => a.nome).join(', ')}</p>
            </div>
          )}

          {processo.partes && processo.partes.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Partes do Processo</p>
              <div className="bg-gray-50 p-3 rounded-md">
                {processo.partes.map((parte, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <span className="font-medium">
                      {parte.tipoParte ? `${parte.tipoParte}: ` : ''}
                      {parte.nomeParte || parte.nome || 'Nome não informado'}
                    </span>
                    {parte.numeroDocumento && (
                      <span className="text-sm text-gray-500 ml-2">
                        (CPF/CNPJ: {parte.numeroDocumento})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {processo.movimentos && processo.movimentos.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Movimentações</p>
              <div className="bg-gray-50 p-3 rounded-md max-h-[400px] overflow-y-auto">
                {processo.movimentos.map((mov, index) => (
                  <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                    <div className="text-sm text-gray-500">
                      {mov.dataHora && new Date(mov.dataHora).toLocaleString()}
                    </div>
                    <div>{mov.nome}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessoDetail;
