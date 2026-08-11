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

    formulario.addEventListener("submit", function(event){
        event.preventDefault();


    const nombre = document.querySelector("#nombre").value 
    const carrera = document.querySelector("#carrera").value
    const correo = document.querySelector("correo").value

    const alumno = {
        id: Date.now(),
        nombre: nombre,
        carrera: carrera,
        correo: correo
    }
    const alumnos = obtenerAlumnos()
    alumnos.push(alumno)

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

const listaAlumnos = document.querySelector("#listaAlumnos")

function mostrarAlumnos(alumnos){
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <li>
        $(alumno.nombre) - 
        $(alumno.carrera) -
        $(alumno.correo)
        </li>`;
    }
}