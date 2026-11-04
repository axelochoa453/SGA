const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        trim: true,
        required: true,
        minlegth: 3,
        maxlength: 40
    },
    descripcion: {
        type: String,
        trim: true
    },
    cargaHoraria: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ["activa", "inactiva"],
        default: "activa",
        required: true,
        texttransform: "uppercase",
        trim: true
    }
},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia 