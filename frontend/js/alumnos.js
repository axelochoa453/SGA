const formulario = document.querySelector("#formulario")
// const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoLegajo = null // Variable para almacenar el legajo del alumno que se está editando
let alumnoEditar = null // Variable para almacenar los datos del alumno que se está editando
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"  // Ocultar el botón de cancelar al inicio
const btnGuardar = document.querySelector("#btnGuardar")
const API_ALUMNOS = "http://localhost:3000/alumnos" // URL de la API de alumnos

formulario.addEventListener("submit", async function (event) { // hacemos async la función para poder usar await dentro de ella
    event.preventDefault();

    // Cargamos los valores de los campos del formulario
    const legajo = document.querySelector("#legajo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    // validaciones de los campos del formulario
    if (legajo === "" || nombre === "" || carrera === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    // Si alumnoEditandoLegajo es null, significa que estamos creando un nuevo alumno, por lo que hacemos un POST.
    if (alumnoEditandoLegajo === null) {
        const alumno = { // Creamos un objeto con los datos del alumno
            legajo: Number(legajo),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        const respuesta = await fetch(API_ALUMNOS, { // Hacemos un POST a la API de alumnos
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alumno) // Convertimos el objeto alumno a JSON
        })
        if (!respuesta.ok) { // Si la respuesta no es ok, mostramos un mensaje de error
            mostrarMensaje("No se pudo guardar el alumno", "mje-error")
            return
        }
        mostrarMensaje("Alumno guardado correctamente", "mje-exito")
    } else { // Si alumnoEditandoLegajo no es null, significa que estamos editando un alumno existente, por lo que hacemos un PUT.
        const datosActuales = { // Creamos un objeto con los datos actuales del alumno que estamos editando
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)){ // Comparamos los datos actuales con los datos del alumno que estamos editando, si son iguales, mostramos un mensaje de advertencia y salimos de la función
            mostrarMensaje("No se realizaron cambios", "mje-adv")
            return
        }
        const respuesta = await fetch(`${API_ALUMNOS}/${alumnoEditandoLegajo}`, { // Hacemos un PUT a la API de alumnos con el legajo del alumno que estamos editando
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre, // Enviamos los datos actualizados del alumno
                carrera: carrera,
                correo: correo
            })
        })
        if (!respuesta.ok) {
            mostrarMensaje("No se pudo actualizar el alumno", "mje-error")
            return
        }
        alumnoEditandoLegajo = null // Reiniciamos la variable alumnoEditandoLegajo a null para indicar que ya no estamos editando ningún alumno
        alumnoEditar = null // Reiniciamos la variable alumnoEditar a null para indicar que ya no estamos editando ningún alumno
        btnGuardar.textContent = "Guardar Alumno" // Cambiamos el texto del botón de guardar a "Guardar Alumno"
        document.querySelector("#legajo").disabled = false // Habilitamos el campo de legajo para que se pueda editar
        
        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }
    await actualizarListaAlumnos() // Actualizamos la lista de alumnos después de guardar o actualizar un alumno
    formulario.reset()
});


async function obtenerAlumnos() { // Función para obtener la lista de alumnos desde la API
    const respuesta = await fetch(API_ALUMNOS)  // Hacemos un GET a la API de alumnos
    if (!respuesta.ok) { // Si la respuesta no es ok, mostramos un mensaje de error
        mostrarMensaje("No se pudo obtener la lista de alumnos", "mje-error")
        return []
    }
    const alumnos = await respuesta.json() // Convertimos la respuesta a JSON y la guardamos en la variable alumnos
    return alumnos // Devolvemos la lista de alumnos
}

function mostrarAlumnos(alumnos) { // Función para mostrar la lista de alumnos en la tabla
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.legajo}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-legajo="${alumno.legajo}" // Agregamos un atributo data-legajo al botón de editar para poder identificar qué alumno se está editando
                title="Editar alumno">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-legajo="${alumno.legajo}"
                title="Eliminar alumno">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

 async function eliminarAlumno(legajo) { // Función para eliminar un alumno desde la API
    const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, { // Hacemos un DELETE a la API de alumnos con el legajo del alumno que queremos eliminar
        method: "DELETE"
    })    
    if (!respuesta.ok) {
        mostrarMensaje("No se pudo eliminar el alumno", "mje-error")
        return
    }
    
    if (alumnoEditandoLegajo === legajo){ // Si el alumno que estamos editando es el mismo que estamos eliminando, reiniciamos el formulario y las variables de edición
        formulario.reset()
        alumnoEditar = null
        alumnoEditandoLegajo = null
        btnGuardar.textContent = "Guardar alumno"
        document.querySelector("#legajo").disabled = false
        btnCancelar.style.display = "none"
    }
    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
    await actualizarListaAlumnos()
}

async function actualizarListaAlumnos() { // Función para actualizar la lista de alumnos en la tabla
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}

listaAlumnos.addEventListener("click", (e) => { // Escuchamos el evento click en la tabla de alumnos para poder editar o eliminar un alumno
    const boton_el = e.target.closest(".btn-eliminar") // Buscamos el botón de eliminar más cercano al elemento que se hizo click
    if (boton_el) { // Si se hizo click en un botón de eliminar, obtenemos el legajo del alumno que queremos eliminar y mostramos un mensaje de confirmación
        const legajo = Number(boton_el.dataset.legajo)
        const confirmar = confirm("¿Está seguro de eliminar este alumno?")
        if (confirmar) {
        eliminarAlumno(legajo)
        }
    }
    const boton_ed = e.target.closest(".btn-editar") // Buscamos el botón de editar más cercano al elemento que se hizo click
    if (boton_ed) { // Si se hizo click en un botón de editar, obtenemos el legajo del alumno que queremos editar y llamamos a la función editarAlumno
        const legajo = Number(boton_ed.dataset.legajo)
        editarAlumno(legajo)
    }
})

async function editarAlumno(legajo) { // Función para editar un alumno desde la API
    const alumnos = await obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.legajo === legajo) // Buscamos el alumno que queremos editar en la lista de alumnos obtenida desde la API

    if (!alumno) { // Si no encontramos el alumno, mostramos un mensaje de error y salimos de la función
        mostrarMensaje("Alumno no encontrado", "mje-error")
        return
    }
    document.querySelector("#legajo").value = alumno.legajo; // Cargamos el legajo del alumno en el campo de legajo del formulario
    document.querySelector("#legajo").disabled = true; // Deshabilitamos el campo de legajo para que no se pueda editar
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;

    alumnoEditar = { // Creamos un objeto con los datos del alumno que estamos editando para poder compararlos con los datos actuales del formulario y saber si se realizaron cambios
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }

    alumnoEditandoLegajo = alumno.legajo; // Guardamos el legajo del alumno que estamos editando en la variable alumnoEditandoLegajo para poder usarlo en la función de submit del formulario
    btnCancelar.style.display ="inline-block" // Mostramos el botón de cancelar para que el usuario pueda cancelar la edición
    btnGuardar.textContent = "Actualizar Alumno" // Cambiamos el texto del botón de guardar a "Actualizar Alumno" para indicar que estamos editando un alumno
    document.querySelector("#nombre").focus() // Ponemos el foco en el campo de nombre para que el usuario pueda empezar a editar los datos del alumno
}

function cancelarEdicion(){ // Función para cancelar la edición de un alumno
    formulario.reset()
    alumnoEditandoLegajo = null
    alumnoEditar = null
    btnGuardar.textContent = "Guardar Alumno"
    document.querySelector("#legajo").disabled = false
    btnCancelar.style.display = "none" // Ocultamos el botón de cancelar al cancelar la edición
    document.querySelector("#legajo").focus() // Ponemos el foco en el campo de legajo para que el usuario pueda empezar a ingresar un nuevo alumno
}

btnCancelar.addEventListener("click", cancelarEdicion) // Escuchamos el evento click en el botón de cancelar para llamar a la función cancelarEdicion

async function iniciar(){ // Función para iniciar la aplicación y cargar la lista de alumnos al cargar la página
    await actualizarListaAlumnos()
}

iniciar() // Llamamos a la función iniciar al cargar la página