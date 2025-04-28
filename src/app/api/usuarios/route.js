import { openDb } from '../../lib/db';

export async function GET() {
  try {
    // Abre la base de datos
    const db = await openDb();

    // Consulta los usuarios
    const usuarios = await db.all('SELECT * FROM usuarios');

    // Retorna los usuarios como respuesta
    return new Response(JSON.stringify(usuarios), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return new Response('Error al obtener usuarios', { status: 500 });
  }
}
