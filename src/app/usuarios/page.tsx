'use client';
import React, { useEffect, useState } from 'react';

// Definimos la interfaz para un usuario
interface Usuario {
  id: number;
  nombre: string;
  dni: string;
}

const Usuarios = () => {
  // Especificamos el tipo del estado
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch('/api/usuarios');
        if (!res.ok) {
          throw new Error('Error al cargar usuarios');
        }
        const data = await res.json();
        setUsuarios(data); // Establecemos el estado con los datos obtenidos
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <div className='bg-gray-800 text-center text-white h-screen flex justify-center items-center'>
      <p>Cargando...</p>
    </div>;
  }

  return (
    <div className='bg-gray-800 text-white p-4 h-screen flex flex-col gap-2 justify-center items-center'>
      <h1>Usuarios</h1>
      <div>
        {usuarios.map((usuario) => (
          <ol key={usuario.id}>
            <li>{usuario.nombre} - {usuario.dni}</li>
          </ol>
        ))}
      </div>
    </div>
  );
};

export default Usuarios;
