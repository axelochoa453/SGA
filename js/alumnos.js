/*
const { jsx } = require("react/jsx-runtime");

const alumnos = [
    {
        id: 1,
        nombre: "Ana",
    },
    {
        id: 2,
        nombre: "Jose",
    }
];

function obtenerAlumnos(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(materias)
        }, 2000);
    })
}

function mostrarAlumnos(alumnos){
    console.log(typeof alumnos)
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
    const datos = localStorage.getItem("alumnos")
    console.log(typeof datos)
    console.log(datos)
    const alumnosRecuperados = JSON.parse(datos)
    console.log(typeof alumnosRecuperados, )
}

async function iniciar() {
    const datos = await obtenerAlumnos()
    console.table(datos)
}
iniciar()

//crear obtenerMaterias()
//crear obtenerDocentes()
//mostrar los datos a traves de async/await

const materias = [
    {
        id: 1,
        nombre: "Matematica"
    },
    {
        id: 2,
        nombre: "Ingles"
    },
    {
        id: 3,
        nombre: "Programacion"
    }
];

function obtenerMaterias(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(materias)
        }, 2000);
    })
}

async function mostrarMaterias() {
    const datos = await obtenerMaterias()
    console.table(datos)
}
mostrarMaterias()

const docentes = [
    {
        id: 1,
        nombre: "Pedro"
    },
    {
        id: 2,
        nombre: "Maria"
    },
    {
        id: 3,
        nombre: "Alberto"
    },
    {
        id: 4,
        nombre: "Roberto"
    }
];

function obtenerDocentes(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(docentes)
        }, 2000);
    })
}

async function mostrarDocentes() {
    const datos = await obtenerMaterias()
    console.table(datos)
}
mostrarDocentes()

*/

    const formulario = document.querySelector("#formAlumno")
    const mensaje = document.querySelector("#mensaje")

    formulario.addEventListener("submit", function(event){
        event.preventDefault();


    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("correo").value.trim()

    if (nombre === "" || carrera === "" || correo === ""){
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("ingrese un correo electronico valido", "mje-error")
        return
    }

    if (nombre.length < 3){
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-erro")
        return
    }

    const alumnos = obtenerAlumnos()
    
    if (alumnoEditandoId === null){
        const alumno = {
        id: Date.now(),
        nombre: nombre,
        carrera: carrera,
        correo: correo
    }
    alumnos.push(alumno)
    mostrarMensaje("alumno guardado correctamente")
    } else {
        const alumno = alumnos.find(alumno => alumno.id === alumnoEditandoId)
        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo
        alumnoEditandoId = null
        formulario.querySelector("button").textContent = "Guardar Alumno"

        mostrarMensaje("Alumno actualizado correctamente")
    }
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
    mostrarAlumnos(alumnos)
    formulario.reset()
});

function obtenerAlumnos() {
    const datos = localStorage.getItem("alumnos")
    if (datos){
        return JSON.parse(datos)
    }
    return []
}

function mostrarMensaje(texto){
    mensaje.textContent = texto
    mensaje.className = tipo
    setTimeout(() => {
        mensaje.textContent = " ";
        mensaje.className = "oculto"
    }, 3000);
}

const listaAlumnos = document.querySelector("#listaAlumnos")

function mostrarAlumnos(alumnos){
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>$(alumno.id)</td>
            <td>$(alumno.nombre)</td>
            <td>$(alumno.carrera)</td>
            <td>$(alumno.correo)</td>
            <td>
                <button class="btn-editar" data-id="$(alumno.id)">Editar</button>
                <button class="btn-eliminar" data-id="$(alumno.id)">Eliminar</button>
            </td>
        </tr>
        `;
    }
}

function eliminarAlumno(id){
    const alumnos = obtenerAlumnos()
    const alumnoActualizados = alumnos.filter(
        alumno => alumno.id !== id
    );
    localStorage.setItem("alumno", JSON.stringify(alumnoActualizados))
    mostrarAlumnos(alumnoActualizados)
    mostrarMensaje("Alumno eliminado correctamente")
}

listaAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = Number(e.target.dataset.id)
        eliminarAlumno(id)
    }
    if (e.target.classList.contains("btn-editar")) {
        const id = Number(e.target.dataset.id)
        editarAlumno(id)
    }
})

function editarAlumno(id){
    const alumnos = obtenerAlumnos
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value;
    document.querySelector("#carrera").value;
    document.querySelector("#correo").value;
    alumnoEditandoId = id
}

