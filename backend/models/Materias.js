const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "El código es obligatorio"]
    },
    nombre: {
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio"],
        minlength: [5, "El nombre debe tener al menos 5 caracteres"],
        maxlength: [30, "El nombre no puede superar los 30 caracteres"]
    },
    descripcion: {
        type: String,
        validate: {
            validator: valor => valor == null || valor === "" || valor.trim().length > 0,
            message: "La descripción no puede contener únicamente espacios"
        }
    },
    cargaHoraria: {
        type: Number,
        required: [true, "La carga horaria es obligatoria"],
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "La carga horaria debe ser un número entero"
        }
    },
    estado: {
        type: String,
        enum: {
            values: ["activa", "inactiva"],
            message: "El estado debe ser 'activa' o 'inactiva'"
        },
        default: "activa",
        trim: true,
        required: [true, "El estado es obligatorio"]
    }
},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia 