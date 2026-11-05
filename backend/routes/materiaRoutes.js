const express = require("express") 
const { 
    obtenerMaterias, 
    obtenerMateria, 
    crearMateria, 
    actualizarMateria, 
    eliminarMateria } = require("../controllers/materias.controller")
const router = express.Router() 

router.get("/", obtenerMaterias) 

router.get("/:id", obtenerMateria) 

router.post("/", crearMateria) 

router.put("/:id", actualizarMateria) 

router.delete("/:id", eliminarMateria) 

module.exports = router