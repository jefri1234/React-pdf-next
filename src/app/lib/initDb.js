// src/app/lib/initDb.js
import { openDb } from './db.js';

const initDb = async () => {
  const db = await openDb();

  // Crear la tabla de usuarios si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      dni TEXT UNIQUE NOT NULL
    );
  `);

  // Insertar algunos usuarios para probar (esto solo se ejecutará si no están ya insertados)
  await db.run(`
    INSERT OR IGNORE INTO usuarios (nombre, dni) VALUES
    ('JEFFERSON MAX OBREGON MEJIA', '12345678'),
    ('MARIA PEREZ LOPEZ', '23456789'),
    ('JUAN PABLO GARCIA', '34567890'),
    ('ANA ISABEL GOMEZ', '45678901'),
    ('LUIS MIGUEL RIVERA', '56789012'),
    ('MARVIN ALIPIO OBREGON MEJIA', '72469331');
  `);

  console.log('Base de datos inicializada');
};

// Ejecutar la inicialización
initDb();
