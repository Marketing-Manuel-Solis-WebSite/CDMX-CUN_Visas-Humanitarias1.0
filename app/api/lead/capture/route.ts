import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Recibir los datos del cliente (ya vienen en snake_case desde el componente)
    const body = await request.json();

    // 2. Definir el endpoint y el token proporcionados
    const EXTERNAL_ENDPOINT = 'https://solisjobrunner.com/api/external-app/lead/capture';
    const BEARER_TOKEN = '489|OmFmTkLx6SfsDaJu2169dZ26pJTWui34s0MlCxsmcd84d25b';

    console.log('Enviando payload a Solis Job Runner:', JSON.stringify(body, null, 2));

    // 3. Enviar la petición al servicio externo
    const response = await fetch(EXTERNAL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 4. Manejar la respuesta del servicio externo
    const data = await response.json();

    if (!response.ok) {
      console.error('Error en Solis Job Runner:', data);
      return NextResponse.json(
        { error: 'Error al enviar datos al CRM externo', details: data },
        { status: response.status }
      );
    }

    // 5. Retornar éxito al frontend
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error interno del servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}