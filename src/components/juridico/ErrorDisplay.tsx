
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorDisplayProps {
  erro: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ erro }) => {
  if (!erro) return null;
  
  return (
    <Alert variant="destructive" className="bg-red-50 border-red-300">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Erro na consulta</AlertTitle>
      <AlertDescription>
        {erro}
        <div className="mt-2 text-sm">
          Nota: A API pública do CNJ tem restrições de CORS que impedem o acesso direto via navegador. 
          Em um ambiente de produção, essas chamadas devem ser feitas através de um servidor backend.
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
