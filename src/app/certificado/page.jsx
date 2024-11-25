"use client";
import { useState, useEffect } from "react";
import React from 'react';
import { Document, Page, Text, StyleSheet, View, Image, PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { useSearchParams } from "next/navigation"; // Importa useSearchParams de Next.js
import Link from "next/link";
//----------------------------------------------------------------------------------
// Estilos del documento PDF
const style = StyleSheet.create({
    contenedor: {
        padding: 20
    },
    texto: {
        fontSize: 45,
        color: 'black',
        textAlign: 'center',
        marginBottom: 120, // Ajusta el valor para mover el texto hacia arriba
    },
    page: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        width: 1600,
        height: 1132,
        marginBottom: 100
    },
    imagen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
});
//----------------------------------------------------------------------------------

// Componente para crear el certificado en formato PDF
export const CrearCertificado = ({ alumno }) => {
    return (
        <Document>
            <Page size={[1600, 1132]} style={style.page}>
                <Image
                    src="./certificado.jpg"
                    style={style.imagen}
                />
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Text style={style.texto}>{alumno}</Text>
                </View>
            </Page>
        </Document>
    );
};
//----------------------------------------------------------------------------------

function Certificado() {
    const searchParams = useSearchParams(); // Accede a los parámetros de la URL
    const dni = searchParams.get("dni"); // Obtén el parámetro 'dni'

    // en el formulario pasamos las validaciones dirige aqui
    //verificacion si dni no esta ,entonses mostrar "loading" POR EL MOMENTO
    if (!dni) {
        return <div>Cargando certificado...</div>;
    }

    //-------------------------------------------------------------------------------------------
    //AQUI HARIA UNA PETICION A MI API Y MI API(HACE UNA BUSQUEDA EN LA DB y me responde)

    // Datos de los usuarios, incluyendo nombre completo y dni
    const usuarios = [
        { nombre: "JEFFERSON MAX OBREGON MEJIA", dni: "12345678" },
        { nombre: "MARIA PEREZ LOPEZ", dni: "23456789" },
        { nombre: "JUAN PABLO GARCIA", dni: "34567890" },
        { nombre: "ANA ISABEL GOMEZ", dni: "45678901" },
        { nombre: "LUIS MIGUEL RIVERA", dni: "56789012" },
        {nombre:"MARVIN ALIPIO OBREGON MEJIA",dni:"72469331"}
    ];

    //-------------------------------------------------------------------------------------------
    // Buscar el usuario por el DNI
    const usuario = usuarios.find(user => user.dni === dni);

    // Si no se encuentra un usuario con ese DNI, mostramos un mensaje de error
    if (!usuario) {
        return <>
            <div className="bg-gray-900 text-white h-screen flex justify-center items-center flex-col gap-5">
                <p className="text-red-700 font-bold">No se encontró un usuario con el DNI proporcionado.</p>
                <Link
                    href='/formulario'
                    className="bg-blue-600 py-1 px-3 rounded-md min-w-min">Regresar</Link>
            </div>;
        </>
    }

    //------------------------------------------------------------------------------------------
    // Estado para garantizar que el componente se renderice solo en el cliente
    const [isClient, setIsClient] = useState(false);

    // Aseguramos que el PDFViewer solo se renderice en el cliente
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Solo renderiza el PDFViewer si estamos en el cliente
    if (!isClient) {
        return null;
    }

    //-------------------------------------------------------------------------------------------------
    return (
        <>
            <div className="bg-gray-800 p-2 text-white text-center flex flex-col justify-center items-center h-screen">
                <h1 className="text-2xl text-yellow-500">Felicitaciones tu Certificado Esta Listo</h1>
                <p className="text-yellow-500 py-2">Descarga y obten tu Certificado</p>
                <PDFViewer height={500} width={700} className="bg-gray-900 p-5 rounded-lg">
                    <CrearCertificado alumno={usuario.nombre} />
                </PDFViewer>

                <div className="mt-5 flex gap-2">
                    <PDFDownloadLink
                        document={<CrearCertificado alumno={usuario.nombre} />}
                        fileName={`certificado_${usuario.dni}.pdf`}
                    >
                        {({ loading }) =>
                            loading ? (
                                <button className="bg-blue-600 py-2 px-4 rounded-md text-white" disabled>
                                    Cargando PDF...
                                </button>
                            ) : (
                                <button className="bg-blue-700 py-2 px-4 rounded-md text-white">
                                    Descargar 
                                </button>
                            )
                        }
                    </PDFDownloadLink>
                    <Link 
                    href='/formulario'
                    className="bg-red-600 py-2 px-4 rounded-md "
                    >Regresar</Link>
                </div>

            </div>
        </>
    );
}

export default Certificado;
