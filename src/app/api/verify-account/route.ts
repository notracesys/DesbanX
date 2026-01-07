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

    const apiResponse = await fetch(`https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region}&uid=${uid}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const responseText = await apiResponse.text();
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (e) {
        // Se a resposta não for um JSON válido, é um erro.
        console.error("API externa retornou resposta não-JSON:", responseText);
        return NextResponse.json({ message: 'A API externa não respondeu como esperado. Tente mais tarde.' }, { status: 502 });
    }

    if (apiResponse.ok && data && data.basicInfo && data.basicInfo.nickname) {
        return NextResponse.json({ 
          nickname: data.basicInfo.nickname,
          level: data.basicInfo.level,
          server: data.basicInfo.region || region
        });
    }
    
    // Se a resposta da API não for OK ou não tiver os dados esperados.
    const errorMessage = data.message || 'Conta não encontrada no servidor brasileiro com o ID fornecido.';
    return NextResponse.json({ message: errorMessage }, { status: apiResponse.status < 500 ? apiResponse.status : 404 });

  } catch (error: any) {
    // Trata erros de rede, como timeout
    if (error.name === 'AbortError') {
      return NextResponse.json({ message: 'A verificação da conta demorou demais para responder. Tente novamente.' }, { status: 408 });
    }
    console.error(`Erro ao verificar região ${region} para o UID ${uid}:`, error);
    return NextResponse.json({ message: 'Não foi possível conectar ao serviço de verificação. Tente mais tarde.' }, { status: 500 });
  }
}
