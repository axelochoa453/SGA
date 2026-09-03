const express = require("express")
//const alumnoController = require ("../controllers/alumno.controller")

const { obtenerAlumnos, obtenerAlumno, eliminarAlumno, actualizarAlumno, crearAlumno } = require("../controllers/alumnos.controller")
const router = express.Router()

router.get("/", obtenerAlumnos)

router.get("/:id", obtenerAlumno)

router.post("/", crearAlumno)

router.put("/:id", actualizarAlumno)

router.put("/:id", eliminarAlumno)

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    alumnos = alumnos.filter(alumno => alumno.id !== id)
    res.json({mensaje: "Alumno eliminado correctamente"})
})

module.exports = router