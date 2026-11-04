import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
const API_MATERIAS = "http://localhost:3000/materias"

function FormularioM({ onMateriaCreada, materiaEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        codigo: String(materiaEditar?.codigo ?? ""),
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: materiaEditar?.cargaHoraria ?? "",
        estado: materiaEditar?.estado ?? ""
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
        
    const materia = {
        ...formulario,
        cargaHoraria: Number(formulario.cargaHoraria)
    }
    const editando = Boolean(materiaEditar)
    const url = editando 
                ? `${API_MATERIAS}/${materiaEditar.codigo}`
                : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                let detalle = ""
                try {
                    const data = await respuesta.json()
                    detalle = data.mensaje || data.message || JSON.stringify(data)
                } catch {
                    detalle = ""
                }
                    throw new Error(detalle || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: ""
            })
            onMateriaCreada()
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
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>
            <Box component="form" onSubmit={guardar} sx={{ display: "grid", gap: 2.5 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        id="codigo"
                        name="codigo"
                        label="Código"
                        value={formulario.codigo}
                        onChange={manejarCambio}
                        required
                        disabled={Boolean(materiaEditar)}
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
                        id="descripcion"
                        name="descripcion"
                        label="Descripción"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    />
                    <TextField
                        fullWidth
                        id="cargaHoraria"
                        name="cargaHoraria"
                        label="Carga Horaria"
                        value={formulario.cargaHoraria}
                        onChange={manejarCambio}
                        required
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    />
                    <TextField
                        select
                        fullWidth
                        id="estado"
                        name="estado"
                        label="Estado"
                        value={formulario.estado}
                        onChange={manejarCambio}
                        required
                        sx={{"& .MuiOutlinedInput-root": { borderRadius: 3 }}}
                    >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>
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
                        : materiaEditar 
                            ? "Guardar cambios"
                            : "Guardar"}
                    </Button>
                    {materiaEditar && (
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
export default FormularioM