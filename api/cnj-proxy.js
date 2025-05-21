
// Este é um exemplo de função serverless que pode ser implantada em plataformas como Vercel ou Netlify
// Para usar, você precisará configurar a variável de ambiente CNJ_API_KEY no seu provedor serverless

export default async function handler(req, res) {
  // Verifica se o método é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas método POST é permitido' });
  }

  try {
    const { tribunal, numeroProcesso, documento } = req.body;

    // Validação básica
    if (!tribunal) {
      return res.status(400).json({ message: 'Tribunal é obrigatório' });
    }

    if (!numeroProcesso && !documento) {
      return res.status(400).json({ message: 'Informe o número do processo ou documento' });
    }

    // Constroi a consulta para a API do CNJ
    let query = {};
    if (numeroProcesso) {
      query = { match: { numeroProcesso } };
    } else if (documento) {
      query = { match: { "partes.numeroDocumento": documento } };
    }

    const apiPayload = {
      size: 100,
      query: query
    };

    // Obtém a chave da API do ambiente (configurada no provedor serverless)
    const apiKey = process.env.CNJ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Chave de API não configurada' });
    }

    // URL da API do CNJ
    const url = `https://api-publica.datajud.cnj.jus.br/${tribunal}/_search`;

    // Faz a requisição para a API do CNJ
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `APIKey ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(apiPayload)
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('Erro na resposta da API CNJ:', apiResponse.status, errorText);
      return res.status(apiResponse.status).json({ 
        message: `Erro na requisição à API do CNJ: ${apiResponse.status}`,
        details: errorText
      });
    }

    // Obtém e retorna os dados
    const data = await apiResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro no proxy da API CNJ:', error);
    return res.status(500).json({ 
      message: 'Erro interno no servidor',
      details: error.message 
    });
  }
}
