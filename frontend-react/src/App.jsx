import alumnos from "./page/Alumnos"
import { FAQ } from "./page/FAQ"
import SelectorTema from "./components/SelectorTema"
import { Routes, Route } from "react-router-dom"
import LayoutPpal from "./layouts/LayoutPpal"
import Inicio from "../page/Inicio"

function App()
{

return (
    <Routes>
      <Route path="/" element= {<LayoutPpal/>}>
      <Route index element={<Inicio/>} />
      <Route path="alumnos" element={<alumnos/>} />
      <Route path="ayuda" element={<FAQ/>} />
      </Route>
    </Routes>
  )
}
export default App