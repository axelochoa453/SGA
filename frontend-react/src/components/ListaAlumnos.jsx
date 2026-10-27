import { useEffect, useState } from "react"
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar alumno")
        }
    }
    useEffect(() => {
        async function cargarAlumnos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar])

    if (cargando) {
        return <Typography sx={{ fontWeight: 600 }}>Cargando alumnos...</Typography>
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
            Alumnos
        </Typography>
        {alumnos.length === 0 
        ? (<Typography color="text.secondary">No hay alumnos registrados.</Typography>)
        : ( 
            <Stack component="ul" spacing={2} sx={{ listStyle: "none", p: 0, m: 0 }}>
            {alumnos.map(alumno => (
                <Box
                    component="li"
                    key={alumno.legajo}
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
                            {alumno.nombre}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip label={`Legajo ${alumno.legajo}`} size="small" />
                            <Chip label={alumno.carrera} size="small" variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">{alumno.correo}</Typography>
                    </Stack>
                    <Stack direction={{ xs: "row", sm: "row" }} spacing={1}>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => onEditarAlumno(alumno)}
                            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
                        >
                            Editar
                        </Button>
                        <Button 
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={()=> eliminarAlumno(alumno.legajo)}
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