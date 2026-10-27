import { ListaDocentes } from "../components/ListaDocentes"
import { useState } from "react"
import FormularioD from "../components/FormularioD"

export default function docentes()
{
const [actualizar, setActualizar] = useState(0)
const [docenteEditar, setDocenteEditar] = useState(null)

function docenteCreado() {
    setActualizar(valor => valor + 1)
    setDocenteEditar(null)
}

function seleccionarDocente(docente) {
    setDocenteEditar(docente)
}

return (
    <>
    <FormularioD key={docenteEditar?.legajo ?? "nuevo"}
    onDocenteCreado={docenteCreado}
    docenteEditar={docenteEditar}
    onCancelar={() => setDocenteEditar(null)}
    />
    <ListaDocentes 
    actualizar={actualizar} 
    onDocenteCreado={docenteCreado}
    onEditarDocente={seleccionarDocente} 
    /> 
    </>
    )
}