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
        const errorData = await apiResponse.json().catch(() => ({ message: 'Failed to verify account from external API.' }));
        return NextResponse.json({ message: errorData.message || 'An error occurred during verification.' }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
