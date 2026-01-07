import { NextResponse } from 'next/server';

const regions = ['BR', 'EU', 'ID', 'MENA', 'NA', 'SA', 'SG', 'TH', 'TW', 'VN', 'IND'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ message: 'UID da conta é obrigatório.' }, { status: 400 });
  }

  for (const region of regions) {
    try {
      // O timeout é importante para não ficarmos presos em uma região que não responde.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
      
      const apiResponse = await fetch(`https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region}&uid=${uid}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        // A API pode retornar sucesso mesmo sem encontrar, então verificamos a estrutura.
        // Com base no seu exemplo, os dados estão em `basicInfo`.
        if (data && data.basicInfo && data.basicInfo.nickname) {
            return NextResponse.json({ 
              nickname: data.basicInfo.nickname,
              level: data.basicInfo.level,
              server: data.basicInfo.region || region // Prioriza a região da API, se disponível
            });
        }
      }
      // Se a resposta não for ok, ou não tiver a estrutura esperada, continuamos.
    } catch (error) {
      // Ignoramos erros individuais (como timeout) e continuamos tentando as outras regiões.
      console.log(`Erro ao verificar região ${region} para o UID ${uid}:`, error);
    }
  }

  // Se o loop terminar e nenhuma conta for encontrada
  return NextResponse.json({ message: 'Conta não encontrada em nenhuma região com o ID fornecido.' }, { status: 404 });
}
