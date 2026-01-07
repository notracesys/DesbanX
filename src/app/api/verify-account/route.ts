import { NextResponse } from 'next/server';

const regions = ['BR', 'EU', 'ID', 'MENA', 'NA', 'SA', 'SG', 'TH', 'TW', 'VN'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ message: 'UID da conta é obrigatório.' }, { status: 400 });
  }

  for (const region of regions) {
    try {
      const apiResponse = await fetch(`https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region}&uid=${uid}`);
      
      if (apiResponse.ok) {
        const data = await apiResponse.json();
        // A API pode retornar sucesso mesmo sem encontrar, então verificamos se tem nickname
        if(data && data.nickname) {
            return NextResponse.json(data);
        }
      }
      // Se a resposta não for ok, ou não tiver nickname, continuamos para a próxima região
    } catch (error) {
      // Ignoramos erros individuais de fetch para uma região e continuamos tentando as outras
      console.log(`Erro ao verificar região ${region} para o UID ${uid}:`, error);
    }
  }

  // Se o loop terminar e nenhuma conta for encontrada
  return NextResponse.json({ message: 'Conta não encontrada em nenhuma região com o ID fornecido.' }, { status: 404 });
}
