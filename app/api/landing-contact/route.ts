import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // 1. Leer el JSON enviado desde el formulario
    const body = await request.json()
    console.log('--- Nuevo Lead Recibido ---')
    console.log('Datos:', body)
    
    // Ejemplo de validación simple (opcional)
    if (!body.first_name || !body.phone) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
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