import { useEffect, useState } from "react"
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
const API_MATERIAS = "http://localhost:3000/materias"

export function ListaMaterias({ actualizar, onMateriaCreada, onEditarMateria }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarMateria(codigo){
        const confirmar = window.confirm("¿Seguro que querés eliminar esta materia?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_MATERIAS}/${encodeURIComponent(codigo)}`,
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onMateriaCreada()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo eliminar materia")
        }
    }
    useEffect(() => {
        async function cargarMaterias(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_MATERIAS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setMaterias(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de materias.")
        } finally {
            setCargando(false)
        }
    }
        cargarMaterias()
    }, [actualizar])

    if (cargando) {
        return <Typography sx={{ fontWeight: 600 }}>Cargando materias...</Typography>
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
            Materias
        </Typography>
        {materias.length === 0 
        ? (<Typography color="text.secondary">No hay materias registradas.</Typography>)
        : ( 
            <Stack component="ul" spacing={2} sx={{ listStyle: "none", p: 0, m: 0 }}>
            {materias.map(materia => (
                <Box
                    component="li"
                    key={materia.codigo}
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
                            {materia.nombre}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip label={`Código ${materia.codigo}`} size="small" />
                            <Chip
                                label={`${materia.cargaHoraria ?? "-"} hs`}
                                size="small"
                                variant="outlined"
                            />
                        <Chip
                            label={materia.estado ?? "Sin estado"}
                            size="small"
                            variant="outlined"
                            color={materia.estado?.toLowerCase() === "activa" ? "success" : "default"}
                            sx={{ textTransform: "capitalize" }}
                        />
                        </Stack>
                        {materia.descripcion && (
                            <Typography variant="body2" color="text.secondary">
                                {materia.descripcion}
                            </Typography>
                        )}
                    </Stack>
                    <Stack direction={{ xs: "row", sm: "row" }} spacing={1}>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => onEditarMateria(materia)}
                            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
                        >
                            Editar
                        </Button>
                        <Button 
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={()=> eliminarMateria(materia.codigo)}
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