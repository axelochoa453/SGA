import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
const API_DOCENTES = "http://localhost:3000/docentes"

function FormularioD({ onDocenteCreado, docenteEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        legajo: String(docenteEditar?.legajo ?? ""),
        nombre: docenteEditar?.nombre ?? "",
        especialidad: docenteEditar?.especialidad ?? "",
        correo: docenteEditar?.correo ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)
        
    const docente = {
        ...formulario,
        legajo: Number(formulario.legajo)
    }
    const editando = Boolean(docenteEditar)
    const url = editando 
                ? `${API_DOCENTES}/${docenteEditar.legajo}`
                : API_DOCENTES
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(docente)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el docente. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                legajo: "",
                nombre: "",
                especialidad: "",
                correo: ""
            })
            onDocenteCreado()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.5, md: 4 },
                borderRadius: 4,
                border: 1,
                borderColor: "divider",
                backgroundColor: "background.paper",
                boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                        ? "0 16px 40px rgba(10,14,17,0.45)"
                        : "0 12px 32px rgba(82,109,130,0.12)"
            }}
        >
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 3 }}>
                {docenteEditar ? "Editar docente" : "Nuevo Docente"}
            </Typography>
            <Box component="form" onSubmit={guardar} sx={{ display: "grid", gap: 2.5 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        id="legajo"
                        name="legajo"
                        label="Legajo"
                        value={formulario.legajo}
                        onChange={manejarCambio}
                        required
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    />
                    <TextField
                        fullWidth
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        id="especialidad"
                        name="especialidad"
                        label="Especialidad"
                        value={formulario.especialidad}
                        onChange={manejarCambio}
                        required
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    />
                    <TextField
                        fullWidth
                        id="correo"
                        name="correo"
                        label="Correo"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        required
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={guardando}
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1.25,
                            fontWeight: 700,
                            textTransform: "none"
                        }}
                    >
                        {guardando 
                        ? "Guardando..." 
                        : docenteEditar 
                            ? "Guardar cambios"
                            : "Guardar"}
                    </Button>
                    {docenteEditar && (
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={cancelar}
                            disabled={guardando}
                            sx={{
                                borderRadius: 3,
                                px: 3,
                                py: 1.25,
                                fontWeight: 700,
                                textTransform: "none"
                            }}
                        >
                            Cancelar
                        </Button>
                    )}
                </Stack>
                {error && <Typography role="alert" color="error.main" sx={{ fontWeight: 600 }}>{error}</Typography>}
            </Box>
        </Paper>
    )
}
export default FormularioA