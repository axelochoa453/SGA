import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import logoSga from "../assets/logo-sga.svg"
import SelectorTema from "./SelectorTema"

const navegacion = [
    { label: "Inicio", to: "/" },
    { label: "Alumnos", to: "/alumnos" },
    { label: "Ayuda", to: "/ayuda" }
]

export default function Header() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(14px)",
                color: "text.primary",
                py: 0.75
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: 1200,
                    width: "100%",
                    mx: "auto",
                    px: { xs: 2, md: 3 },
                    justifyContent: "space-between",
                    gap: 2
                }}
            >
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        textDecoration: "none",
                        color: "inherit"
                    }}
                >
                    <Box
                        component="img"
                        src={logoSga}
                        alt="Logo SGA"
                        sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2.5,
                            boxShadow: 3
                        }}
                    />
                    <Typography
                        variant="h5"
                        component="span"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: 0.8,
                            color: "text.primary"
                        }}
                    >
                        SGA
                    </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: "auto" }}>
                    {navegacion.map((item) => (
                        <Button
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            variant="text"
                            sx={{
                                borderRadius: 999,
                                px: 1.5,
                                py: 0.75,
                                fontWeight: 700,
                                color: "text.primary",
                                textTransform: "none",
                                minWidth: "auto",
                                "&:hover": {
                                    backgroundColor: "action.hover"
                                }
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}

                    <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                        <SelectorTema />
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}