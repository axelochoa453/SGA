import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Footer } from "../components/Footer"

export default function LayoutPpal() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background: (theme) =>
                    theme.palette.mode === "dark"
                        ? "linear-gradient(180deg, rgba(23,28,34,0.96), rgba(17,20,25,1))"
                        : "linear-gradient(180deg, #f6f2eb 0%, #f8f9fb 100%)"
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: 1200,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 3, md: 5 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}