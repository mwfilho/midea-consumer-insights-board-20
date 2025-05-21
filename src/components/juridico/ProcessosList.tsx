
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Processo } from '@/types/cnj';
import ProcessoDetail from './ProcessoDetail';

interface ProcessosListProps {
  processos: Processo[];
}

const ProcessosList: React.FC<ProcessosListProps> = ({ processos }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {processos.map((processo, index) => (
        <Card key={index} className="overflow-hidden">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50" 
            onClick={() => toggleExpand(index)}
          >
            <div className="flex-1">
              <div className="font-medium">{processo.numeroProcesso}</div>
              <div className="text-sm text-gray-500">
                {processo.classe?.nome && `${processo.classe.nome} • `}
                {processo.orgaoJulgador?.nome}
              </div>
            </div>
            <Button variant="ghost" size="sm">
              {expandedIndex === index ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>
          
          {expandedIndex === index && (
            <CardContent className="border-t pt-3 bg-gray-50">
              <ProcessoDetail processo={processo} />
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProcessosList;
