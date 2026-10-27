import { Box, Typography } from "@mui/material"

export function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: 1,
                borderColor: "divider",
                backgroundColor: "background.paper",
                py: 2.5,
                px: { xs: 2, md: 3 }
            }}
        >
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                    textAlign: { xs: "center", sm: "left" }
                }}
            >
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                    Sistema de Gestión Académica
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Axel Diego Ochoa · SGA · Proyecto Programación IV
                </Typography>
            </Box>
        </Box>
    )
}