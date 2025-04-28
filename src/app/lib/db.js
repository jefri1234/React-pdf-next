// src/app/lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Función para abrir la base de datos
export const openDb = async () => {
  return open({
    filename: './mydb.sqlite', // Ruta del archivo de la base de datos
    driver: sqlite3.Database,
  });
};
