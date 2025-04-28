"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
function page() {
  const router = useRouter();

  router.push('/formulario') // redirecciona a la ruta /juegos

  return (
    <>
      <div className='bg-gray-800 text-white text-center h-screen flex justify-center items-center'>
        <h1>cargando...</h1>
      </div>
    </>
  )
}

export default page