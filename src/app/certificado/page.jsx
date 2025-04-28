"use client";
import { useState, useEffect } from "react";
import { Document, Page, Text, StyleSheet, View, Image, PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { useSearchParams } from "next/navigation"; // Importa useSearchParams de Next.js
import Link from "next/link";

// Estilos del documento PDF
const style = StyleSheet.create({
  contenedor: { padding: 20 },
  texto: { fontSize: 45, color: 'black', textAlign: 'center', marginBottom: 120, marginLeft:340 },
  page: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', width: 1600, height: 1132, marginBottom: 100 },
  imagen: { position: 'absolute', width: '100%', height: '100%' }
});

// Componente para crear el certificado en formato PDF
const CrearCertificado = ({ alumno }) => {
  return (
    <Document>
      <Page size={[1600, 1132]} style={style.page}>
        <Image src="./certificado-municipal.jpg" style={style.imagen} />
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Text  style={style.texto} >{alumno}</Text>
        </View>
      </Page>
    </Document>
  );
};

function Certificado() {
  // extraemos de la ruta el parameter dni para la busqueda en el servidor 
  const searchParams = useSearchParams();
  const dni = searchParams.get("dni");



  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de los datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/usuarios/${dni}`);
        if (!res.ok) {
          throw new Error('error en el servidor , en el usuario buscado debio pasar un usuario');
        }
        //convierto el ser en formato json  
        const data = await res.json();
        //asigno los datos al estado del componente 
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (dni) {
      fetchUsuario();
    }
  }, [dni]);

  // Si está cargando o hay un error
  if (loading) {
    return <div className="bg-gray-800 p-2 text-white text-center flex flex-col gap-5 justify-center items-center h-screen">Cargando...</div>;
  }

  if (!usuario) {
    return <div className="bg-gray-800 p-2 text-white text-center flex flex-col gap-5 justify-center items-center h-screen">
      <p>No se encontró un usuario con el DNIs</p>
      <Link href='/formulario' className="bg-red-600 py-2 px-4 rounded-md">Regresar</Link>
      </div>;
  }
  

  // Renderizamos el PDF si encontramos al usuario
  return (
    <div className="bg-gray-800 p-2 text-white text-center flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl text-yellow-500">Felicitaciones tu Certificado Está Listo</h1>
      <p className="text-yellow-500 py-2 text-2xl">Descarga y obten tu Certificado</p>

      <PDFViewer height={600} width={700} className="bg-gray-900 p-5 rounded-lg">
        <CrearCertificado alumno={usuario.nombres} />
      </PDFViewer>

      <div className="mt-5 flex gap-2">
        <PDFDownloadLink
          document={<CrearCertificado alumno={usuario.nombres} />}
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
        <Link href='/formulario' className="bg-red-600 py-2 px-4 rounded-md">Regresar</Link>
      </div>
    </div>
  );
}

export default Certificado;
