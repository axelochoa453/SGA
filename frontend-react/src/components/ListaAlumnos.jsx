import { useEffect, useState } from "react"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos() {
    const [alumnos, setAlumnos] = useState([])

    useEffect(() => {
        async function cargarAlumnos(){
            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
        }
    }
        cargarAlumnos()
    }, [])

    return (
    <>
    <h2>Alumnos</h2>
    {alumnos.map(alumno => (
        <p key={alumno.legajo}>
            {alumno.legajo} - {alumno.nombre} - {alumno.carrera}
        </p>
    ))}
    </>
    )
}