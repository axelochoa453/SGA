const express = require("express") 
// const alumnosController = require("../controllers/alumnos.controller")
const { 
    obtenerMaterias, 
    obtenerMateria, 
    crearMateria, 
    actualizarMateria, 
    eliminarMateria } = require("../controllers/materia.controller")
const router = express.Router() 

router.get("/", obtenerMaterias) 

router.get("/:id", obtenerMateria) 

router.post("/", crearMateria) 

router.put("/:id", actualizarMateria) 

router.delete("/:id", eliminarMateria) 

module.exports = router