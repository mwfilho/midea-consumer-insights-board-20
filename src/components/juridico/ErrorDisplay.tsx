
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
          {erro.includes("variável") && (
            <>
              <p>A variável de ambiente CNJ_API_KEY não está configurada no servidor.</p>
              <p className="mt-1 font-semibold">Como configurar:</p>
              <ol className="list-decimal ml-5 mt-1">
                <li>Acesse as Configurações do seu projeto Lovable</li>
                <li>Vá para a seção "Variáveis de Ambiente"</li>
                <li>Adicione a variável CNJ_API_KEY com o valor: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==</code></li>
                <li>Salve as alterações e reimplante o projeto</li>
              </ol>
            </>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
