import { useState } from "react";

function CambiarTitulo() {
    const [titulo, setTitulo] = useState("Inicio")

    return (
        <>
        <h2>{titulo}</h2>
        <div style={{display: "flex", justifyContent: "center", gap: "15px" }}>
            <button onClick={() => setTitulo("Alumnos")} style={{
                fontSize: "20px",
                color: "lightgreen",
                padding: "5px"
            }}>
                Alumnos
            </button>
            <button onClick={() => setTitulo("Docentes")} style={{
                fontSize: "20px",
                color: "lightgreen",
                padding: "5px"
            }}>
                Docentes
            </button>
            <button onClick={() => setTitulo("Materias")} style={{
                fontSize: "20px",
                color: "lightgreen",
                padding: "5px"
            }}>
                Materias
            </button>
            <button onClick={() => setTitulo("Ayuda")} style={{
                fontSize: "20px",
                color: "lightgreen",
                padding: "5px"
            }}>
                Ayuda
            </button>
        </div>
        </>
    )
}
export default CambiarTitulo