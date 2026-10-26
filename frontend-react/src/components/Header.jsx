import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
        <header>
            <h2>SGA</h2>
        </header>
        <nav>
        <Link to="/">Inicio</Link>
        {" | "}
        <Link to= "/alumnos">Alumnos</Link>
        {" | "}
        <Link to= "/ayuda" aria-label="Ayuda"></Link>
        <Link>
        <SelectorTema></SelectorTema>
        </Link>
        </nav>
        </>
    )
}