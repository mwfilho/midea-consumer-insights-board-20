
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
          {erro.includes("404") && "O endpoint do proxy API não pôde ser encontrado. Verifique se a função serverless está implantada corretamente."}
          {erro.includes("500") && "Ocorreu um erro interno no servidor. A chave de API pode estar configurada incorretamente ou expirada."}
          {erro.includes("401") && "Acesso não autorizado. A chave de API pode estar inválida ou expirada."}
          {erro.includes("403") && "Acesso proibido. Verifique as permissões da chave de API."}
          {erro.includes("variável") && "A variável de ambiente CNJ_API_KEY não está configurada no servidor."}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
