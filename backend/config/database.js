const mongoose = require("mongoose") // Importamos mongoose para poder conectarnos a la base de datos de MongoDB

async function conectarBD(){
    try {
        await mongoose.connect(process.env.MONGO_URI) // Usamos el método connect() de mongoose para conectarnos a la base de datos de MongoDB, tomando la URI de conexión de la variable de entorno MONGO_URI definida en el archivo .env
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error)
    }
}

module.exports = conectarBD