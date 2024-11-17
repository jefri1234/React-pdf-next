"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation"; // Importar el hook 'useRouter'

function Formulario() {

  const dniRef = useRef(null);
  const router = useRouter(); // Inicializamos useRouter para redirigir

  function handleClick() {

    const valor = dniRef.current.value;    
    // Redirige a la ruta "/certificado" pasando 'dni' como query parameter
    router.push(`/certificado?dni=${valor}`);
    
  }

  return (
    <>
      <h1 className="text-center text-2xl">FORM</h1>
      <form className="bg-gray-700 p-5 flex flex-col max-w-min m-auto text-white text-center rounded-lg">
        <label>ENTER YOUR DNI:</label>
        <input type="text" name="dni" ref={dniRef} className="text-gray-700" />

        <button
          type="button"
          onClick={handleClick}
          className="bg-green-600 px-3 py-1 rounded-md max-w-min m-auto mt-2"
        >
          SEND
        </button>
      </form>
    </>
  );
}

export default Formulario;
