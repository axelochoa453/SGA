// El modelo Alumno define la estructura de los documentos de la colección de alumnos en la base de datos, y nos permite interactuar con la base de datos a través de métodos como find(), findOne(), create(), findOneAndUpdate() y findOneAndDelete().

const mongoose = require("mongoose") // Importamos mongoose para poder definir el modelo de datos de los alumnos

const alumnoSchema = new mongoose.Schema({ // Definimos el esquema de datos de los alumnos, que es la estructura que tendrán los documentos en la colección de alumnos en la base de datos
    legajo: {
        type: Number, // Definimos el tipo de dato del campo legajo como Number
        unique: true // Definimos el campo legajo como único, para que no se puedan crear dos alumnos con el mismo legajo
    },
    nombre: String,
    carrera: String,
    correo: String
},
{ 
    versionKey: false // Deshabilitamos la versión de los documentos, para que no se cree el campo __v en los documentos de la colección de alumnos
}
)

const Alumno = mongoose.model("Alumno", alumnoSchema) // Creamos el modelo de datos de los alumnos a partir del esquema definido, y lo exportamos para poder usarlo en otras partes de la aplicación

module.exports = Alumno 