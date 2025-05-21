
import React from 'react';
import { Processo } from '@/types/cnj';
import ProcessoDetail from './ProcessoDetail';
import ProcessosList from './ProcessosList';

interface ResultsDisplayProps {
  resultados: Processo[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ resultados }) => {
  if (resultados.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {resultados.length} Processo{resultados.length > 1 ? 's' : ''} Encontrado{resultados.length > 1 ? 's' : ''}
      </h3>
      
      {resultados.length === 1 ? (
        <ProcessoDetail processo={resultados[0]} />
      ) : (
        <ProcessosList processos={resultados} />
      )}
    </div>
  );
};

export default ResultsDisplay;
