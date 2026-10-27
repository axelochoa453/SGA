import { useEffect, useState } from "react"
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
const API_DOCENTES = "http://localhost:3000/docentes"

export function ListaDocentes({ actualizar, onDocenteCreado, onEditarDocente }) {
    const [docentes, setDocentes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarDocente(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este docente?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_DOCENTES}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onDocenteCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo eliminar docente")
        }
    }
    useEffect(() => {
        async function cargarDocentes(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_DOCENTES)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setDocentes(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de docentes.")
        } finally {
            setCargando(false)
        }
    }
        cargarDocentes()
    }, [actualizar])

    if (cargando) {
        return <Typography sx={{ fontWeight: 600 }}>Cargando docentes...</Typography>
    }
    if (error) {
        return <Typography role="alert" color="error.main">{error}</Typography>
    }
    return (
    <Paper
        elevation={0}
        sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            border: 1,
            borderColor: "divider",
            backgroundColor: "background.paper",
            boxShadow: (theme) =>
                theme.palette.mode === "dark"
                    ? "0 16px 40px rgba(8,12,16,0.32)"
                    : "0 12px 28px rgba(82,109,130,0.08)"
        }}
    >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 3 }}>
            Docentes
        </Typography>
        {docentes.length === 0 
        ? (<Typography color="text.secondary">No hay docentes registrados.</Typography>)
        : ( 
            <Stack component="ul" spacing={2} sx={{ listStyle: "none", p: 0, m: 0 }}>
            {docentes.map(docente => (
                <Box
                    component="li"
                    key={docente.legajo}
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                        gap: 2,
                        p: 2,
                        borderRadius: 3,
                        border: 1,
                        borderColor: "divider",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(34,42,51,0.9)"
                                : "rgba(247,250,252,0.9)"
                    }}
                >
                    <Stack spacing={0.5}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {docente.nombre}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip label={`Legajo ${docente.legajo}`} size="small" />
                            <Chip label={docente.especialidad} size="small" variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">{docente.correo}</Typography>
                    </Stack>
                    <Stack direction={{ xs: "row", sm: "row" }} spacing={1}>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => onEditarDocente(docente)}
                            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
                        >
                            Editar
                        </Button>
                        <Button 
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={()=> eliminarDocente(docente.legajo)}
                            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </Box>)
            )}
            </Stack>
        )}
    </Paper>
    )
}