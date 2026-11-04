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
        enum: ["activa", "inactiva", "ACTIVA", "INACTIVA", "Activa", "Inactiva", "inactiva", "INACTIVA"],
        default: "activa",
        required: true,
        uppercase: true,
        trim: true
    }
},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia 