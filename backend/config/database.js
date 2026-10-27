const mongoose = require("mongoose")

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/SGA"

async function conectarBD() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Base de datos conectada")
    } catch (error) {
        console.log("Error de conexión a MongoDB:", error.message)
    }
}

module.exports = conectarBD