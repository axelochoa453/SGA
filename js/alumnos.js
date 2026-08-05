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
            resolve(alumnos)
        }, 2000);
    })
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
            resolve(alumnos)
        }, 2000);
    })
}

async function mostrarMaterias() {
    const datos = await obtenerMaterias()
    console.table(datos)
}
iniciar()