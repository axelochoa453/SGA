const Materia = require("../models/Materias") 

function validarDatosMateria(datos, { incluirCodigo = false, exigirEstado = false } = {}) {
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        return "los datos enviados no son validos"
    }

    if (incluirCodigo && (typeof datos.codigo !== "string" || !datos.codigo.trim())) {
        return "El código es obligatorio y no debe estar vacio"
    }
    if (typeof datos.nombre !== "string" || !datos.nombre.trim()) {
        return "El nombre es obligatorio y no debe ser un texto vacio"
    }
    if (typeof datos.cargaHoraria !== "number" ||
        !Number.isInteger(datos.cargaHoraria) ||
        datos.cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor a 0"
    }
    if (datos.descripcion !== undefined && typeof datos.descripcion !== "string") {
        return "La descripción debe ser un texto"
    }
    if (typeof datos.descripcion === "string" &&
        datos.descripcion.length > 0 &&
        !datos.descripcion.trim()) {
        return "La descripción no puede contener únicamente espacios"
    }
    if ((exigirEstado || datos.estado !== undefined) &&
        !["activa", "inactiva"].includes(datos.estado)) {
        return "El estado debe ser 'activa' o 'inactiva'"
    }

    return null
}

function responderError(res, error, operacion) {
    console.error(`Error al ${operacion} la materia:`, error)

    if (error.name === "ValidationError") {
        return res.status(400).json({
            mensaje: Object.values(error.errors).map(({ message }) => message).join(". ")
        })
    }
    if (error.code === 11000) {
        return res.status(409).json({ mensaje: "El código ya existe" })
    }
    return res.status(500).json({ mensaje: "Error interno del servidor" })
}

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find()
        return res.json(materias)
    } catch (error) {
        return responderError(res, error, "obtener")
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({ codigo: req.params.id })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        return res.json(materia)
    } catch (error) {
        return responderError(res, error, "obtener")
    }
}

async function crearMateria(req, res) {
    const errorValidacion = validarDatosMateria(req.body, { incluirCodigo: true })
    if (errorValidacion) {
        return res.status(400).json({ mensaje: errorValidacion })
    }

    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    try {
        const nuevaMateria = await Materia.create({
            codigo: codigo.trim(),
            nombre: nombre.trim(),
            descripcion: descripcion?.trim() ?? "",
            cargaHoraria,
            estado: estado ?? "activa"
        })
        return res.status(201).json(nuevaMateria)
    } catch (error) {
        return responderError(res, error, "crear")
    }
}

async function actualizarMateria(req, res) {
    const errorValidacion = validarDatosMateria(req.body, { exigirEstado: true })
    if (errorValidacion) {
        return res.status(400).json({ mensaje: errorValidacion })
    }

    try {
        const materia = await Materia.findOne({ codigo: req.params.id })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }

        const { nombre, descripcion, cargaHoraria, estado } = req.body
        materia.nombre = nombre.trim()
        materia.descripcion = descripcion?.trim() ?? ""
        materia.cargaHoraria = cargaHoraria
        materia.estado = estado
        await materia.save()
        return res.json(materia)
    } catch (error) {
        return responderError(res, error, "actualizar")
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({ codigo: req.params.id })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        return res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        return responderError(res, error, "eliminar")
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} 