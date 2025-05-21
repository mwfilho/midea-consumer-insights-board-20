
# Instruções para Implementação do Proxy CNJ

## Problema de CORS

A API pública do CNJ tem restrições de CORS que impedem o acesso direto a partir de navegadores web. Para contornar este problema, é necessário implementar um proxy serverless.

## Passos para implementar o proxy serverless

### 1. Escolha uma plataforma serverless:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [AWS Lambda](https://aws.amazon.com/lambda)
- [Google Cloud Functions](https://cloud.google.com/functions)

### 2. Configure o arquivo de função serverless
O arquivo `api/cnj-proxy.js` contém o código necessário para implementar o proxy.

### 3. Configure a variável de ambiente
Adicione a seguinte variável de ambiente no seu provedor serverless escolhido:
```
CNJ_API_KEY=cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==
```

### 4. Atualize o componente ConsultasProcessuais.tsx
Após implantar a função serverless, atualize a constante `API_PROXY_URL` no componente `ConsultasProcessuais.tsx` para a URL do seu endpoint serverless.

### 5. Modifique o método handleSearch
Descomente o bloco de código que faz a chamada para o proxy e remova o código que faz a chamada direta à API do CNJ.

## Exemplo de uso após implementação

```javascript
// No componente ConsultasProcessuais.tsx
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Verificações e validações...
  
  try {
    const payload = {
      tribunal,
      numeroProcesso: numeroProcesso.replace(/\D/g, '') || undefined,
      documento: documento.replace(/\D/g, '') || undefined,
    };
    
    // Chamada para o proxy
    const response = await fetch('https://seu-site.vercel.app/api/cnj-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    // Processa os resultados normalmente...
  } catch (error) {
    // Tratamento de erros...
  }
};
```

## Segurança
Esta abordagem melhora a segurança da aplicação por:
1. Remover a chave da API do código frontend
2. Evitar a exposição direta da chave no tráfego de rede do navegador
3. Permitir implementar limites de taxa e validações adicionais no servidor
