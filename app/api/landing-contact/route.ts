import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // 1. Leer el JSON enviado desde el formulario
    const body = await request.json()

    // 2. Aquí es donde normalmente guardarías los datos en una base de datos
    // o los enviarías a un CRM / servicio de correo.
    // Por ahora, lo imprimiremos en la consola del servidor para depurar.
    console.log('--- Nuevo Lead Recibido ---')
    console.log('Datos:', body)
    
    // Ejemplo de validación simple (opcional)
    if (!body.first_name || !body.phone) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // 3. Simular un pequeño retraso (opcional, para ver la animación de carga)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // 4. Devolver respuesta de éxito (200 OK)
    return NextResponse.json(
      { message: 'Formulario recibido correctamente', success: true },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error procesando el formulario:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}