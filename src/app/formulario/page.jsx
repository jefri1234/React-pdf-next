"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Importar el hook 'useRouter'
import { z } from "zod"
import Image from "next/image";
import ejecutivo from '../../../public/img/ejecutivos.png'

function Formulario() {

  const dniRef = useRef(null);
  const [error, setError] = useState(""); // Estado para manejar errores
  const router = useRouter(); // Inicializamos useRouter para redirigir

  // Definimos el esquema de validación
  const dniSchema = z
    .string()
    .min(1, { message: "El DNI no puede estar vacío" })
    .length(8, { message: "El DNI debe ser un número de 8 dígitos" });


  function handleClick() {
    const valor = dniRef.current.value;
    // Validamos el valor(dato) con Zod 
    const result = dniSchema.safeParse(valor);

    // Si la validación falla, mostramos el mensaje de error
    if (!result.success) {
      setError(result.error.errors[0].message); // Mostramos el primer error
    } else {
      // Si la validación es exitosa, redirigimos
      setError(""); // Limpiamos el error
      // Redirigimos a la página de certificado con el DNI ingresado en la URL
      //pasomos un parametro en la url
      router.push(`/certificado?dni=${valor}`);
    }
  }

  return (
    <>

      <div className="bg-gray-800 h-screen flex flex-col justify-center items-center text-white text-center gap-5">
       
        <Image
          src={ejecutivo}
          width={300}
          height={300}
          alt="ejecutivos"
        />
        <form className="bg-gray-800 py-10 px-20  pb-20 flex flex-col  text-white text-center rounded-lg">
          <div className="flex flex-col gap-5">
            <label className="text-xl">INGRESA TU DNI:</label>
            <input type="text" name="dni" ref={dniRef} className="text-gray-700 p-1 rounded-md text-center" placeholder="ingresa tu DNI" />
          </div>

          {/* Mostrar el mensaje de error, si hay */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="button"
            onClick={handleClick}
            className="bg-green-600 px-20 py-1 rounded-md max-w-min m-auto mt-2 "
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

export default Formulario;
