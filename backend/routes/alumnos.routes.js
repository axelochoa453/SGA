const express = require("express")
//const alumnoController = require ("../controllers/alumno.controller")

const { obtenerAlumnos, obtenerAlumno, eliminarAlumno, actualizarAlumno, crearAlumno } = require("../controllers/alumnos.controller")
const router = express.Router()

router.get("/", obtenerAlumnos)

router.get("/:id", obtenerAlumno)

router.post("/", crearAlumno)

router.put("/:id", actualizarAlumno)

router.put("/:id", eliminarAlumno)

module.exports = router