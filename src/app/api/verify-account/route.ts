import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const uid = searchParams.get('uid');

  if (!region || !uid) {
    return NextResponse.json({ message: 'Region and UID are required' }, { status: 400 });
  }

  try {
    const apiResponse = await fetch(`https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region}&uid=${uid}`);
    
    if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({ message: 'A API externa não respondeu corretamente. Tente novamente mais tarde.' }));
        return NextResponse.json({ message: errorData.message || 'Ocorreu um erro durante a verificação.' }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({ message: 'Erro interno ao tentar verificar a conta.' }, { status: 500 });
  }
}
