import Alumnos from "./page/Alumnos"
import { FAQ } from "./page/FAQ"
import { Routes, Route } from "react-router-dom"
import LayoutPpal from "./layouts/LayoutPpal"
import Inicio from "./page/Inicio"
import Docentes from "./page/Docentes"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPpal />}>
        <Route index element={<Inicio />} />
        <Route path="alumnos" element={<Alumnos />} />
        <Route path="docentes" element={<Docentes />} />
        <Route path="ayuda" element={<FAQ />} />
      </Route>
    </Routes>
  )
}

export default App