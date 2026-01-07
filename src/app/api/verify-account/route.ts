
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  const region = 'BR'; // Focar apenas na região BR

  if (!uid) {
    return NextResponse.json({ message: 'UID da conta é obrigatório.' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout

    // Endpoint correto conforme a documentação da API
    const apiResponse = await fetch(`https://free-ff-api.onrender.com/api/v1/account?region=${region}&uid=${uid}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await apiResponse.json();

    // Verificação correta baseada na estrutura de resposta da nova API
    if (apiResponse.ok && data && data.basicInfo && data.basicInfo.nickname) {
        return NextResponse.json({ 
          nickname: data.basicInfo.nickname,
          level: data.basicInfo.level,
          server: data.basicInfo.region || region
        });
    }
    
    const errorMessage = data.message || 'Conta não encontrada no servidor brasileiro com o ID fornecido.';
    return NextResponse.json({ message: errorMessage }, { status: apiResponse.status < 500 ? apiResponse.status : 404 });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json({ message: 'A verificação da conta demorou demais para responder. Tente novamente.' }, { status: 408 });
    }
    console.error(`Erro ao verificar região ${region} para o UID ${uid}:`, error);
    return NextResponse.json({ message: 'Não foi possível conectar ao serviço de verificação. Tente mais tarde.' }, { status: 500 });
  }
}
