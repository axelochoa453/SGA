// controllers maneja la lógica de negocio de la aplicación, es decir, las funciones que se ejecutan cuando se reciben las peticiones HTTP en las rutas definidas en routes

const Alumno = require("../models/Alumno") // Importamos el modelo de datos de los alumnos para poder usarlo en las funciones del controlador

async function obtenerAlumnos(req, res) { // Función para obtener todos los alumnos de la base de datos
    const alumnos = await Alumno.find() // Usamos el método find() del modelo Alumno para obtener todos los documentos de la colección de alumnos en la base de datos
    res.json(alumnos) // Respondemos con un JSON que contiene todos los alumnos obtenidos de la base de datos
}

async function obtenerAlumno(req, res) {
    const alumno = await Alumno.findOne({ // Usamos el método findOne() del modelo Alumno para obtener un documento de la colección de alumnos en la base de datos que coincida con el legajo proporcionado en los parámetros de la ruta
        legajo: Number(req.params.id)
    }) // Convertimos el parámetro id a número para poder compararlo con el campo legajo de los documentos de la colección de alumnos
    if (!alumno) { // Si no se encuentra un alumno con el legajo proporcionado, respondemos con un mensaje de error y un código de estado 404
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    res.json(alumno) // Si se encuentra un alumno con el legajo proporcionado, respondemos con un JSON que contiene los datos del alumno obtenido de la base de datos
}

async function crearAlumno(req, res) {
    const { legajo, nombre, carrera, correo } = req.body // Desestructuramos los datos del alumno que se envían en el cuerpo de la petición para poder usarlos en la creación del nuevo alumno
    if (!legajo || !nombre || !carrera || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }
    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser un texto"
        })
    }
    if (typeof legajo !== "number") {
        return res.status(400).json({
            mensaje: "El legajo debe ser un número"
        })
    }
    const existe = await Alumno.findOne({ // Usamos el método findOne() del modelo Alumno para verificar si ya existe un alumno con el mismo legajo en la base de datos
        legajo
    })
    if (existe) { // Si ya existe un alumno con el mismo legajo, respondemos con un mensaje de error y un código de estado 400
        return res.status(400).json({
            mensaje: "El legajo ya existe"
        })
    }
    const nuevoAlumno = await Alumno.create({ // Usamos el método create() del modelo Alumno para crear un nuevo documento en la colección de alumnos en la base de datos con los datos proporcionados en el cuerpo de la petición
        legajo,
        nombre,
        carrera,
        correo
    })
    res.status(201).json(nuevoAlumno) // Respondemos con un JSON que contiene los datos del nuevo alumno creado en la base de datos y un código de estado 201
}

async function actualizarAlumno(req, res) {
    const { nombre, carrera, correo } = req.body
    const alumno = await Alumno.findOneAndUpdate( // Usamos el método findOneAndUpdate() del modelo Alumno para actualizar un documento de la colección de alumnos en la base de datos que coincida con el legajo proporcionado en los parámetros de la ruta
        { legajo: Number(req.params.id) }, // Convertimos el parámetro id a número para poder compararlo con el campo legajo de los documentos de la colección de alumnos
        { nombre, carrera, correo }, // Los datos que se enviarán en el cuerpo de la petición para actualizar el alumno
        { returnDocument: "after" } // La opción returnDocument: "after" indica que queremos que el método findOneAndUpdate() nos devuelva el documento actualizado después de la actualización
    )
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no econtrado"
        })
    }

    res.json(alumno)
}

async function eliminarAlumno(req, res) {
    const alumno = await Alumno.findOneAndDelete( // Usamos el método findOneAndDelete() del modelo Alumno para eliminar un documento de la colección de alumnos en la base de datos que coincida con el legajo proporcionado en los parámetros de la ruta
        { legajo: Number(req.params.id) } // Convertimos el parámetro id a número para poder compararlo con el campo legajo de los documentos de la colección de alumnos
    )
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no econtrado"
        })
    }

    res.json({ mensaje: "Alumno eliminado correctamente" })
}

module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} // Exportamos las funciones del controlador de alumnos para poder usarlas en las rutas de la API