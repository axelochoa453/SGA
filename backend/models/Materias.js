const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String
    },
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    cargaHoraria: {
        type: Number
    },
    estado: {
        type: String,
        enum: ["activa", "inactiva", "ACTIVA", "INACTIVA", "Activa", "Inactiva", "inactiva", "INACTIVA"],
        default: "activa"
    }
},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia 