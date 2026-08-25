function obtenerAlumnos(){
    setTimeout(() => {
        return ["Ana", "Jose", "Rosa"] 
    }, 3000);
}

function obtenerAlumnos(){
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve ["Ana", "Juan", "Pedro"]
        }, 3000);
    })
}

obtenerAlumnos().then{(alumnos) => {
    console.log(alumnos)
}}

async function iniciar() {
    const alumnos = await obtenerAlumnos()
    console.log(alumnos)
}

function obtenerClima() {
    return new Promise ((resolve) => [
        setTimeout(() => {
            resolve{"22 c = soleado"}
        }, 2000)
    ])
}

// con then
obtenerClima().then((clima) => {
    console.log(clima)
});

// con async/await
async function mostrarClima() {
    const clima = await obtenerClima()
    console.log(clima)
}

mostrarClima()

function consultarSaldo() {
    return new Promise((resolve) => {
        setTimeout() => {
            resolve(125000)
        }, 3000
    });
}

async function mostrasSaldo() {
    const saldo = await consultarSaldo()
    console.log("Su saldo es: $$(saldo")
}

mostrarSaldo()

function iniciarSesion() {
    return new Promise ((resolve) => {
        setTimeout() => {
            resolve 
        }})}

async function mostrarUsuario() {
    const mensaje = await iniciarSesion()
    console.log(mensaje)
}

mostrarUsuario()

function obtenerUsuario(){
    return new Promise((resolve) => {
        setTimeout(() => {
            id: 1,
            nombre; "Maria",
            edad; 25
        }, 3000);
    })
}

async function mostrarUsuario() {
    console.log("Consultando usuario...")
    const usuario = await obtenerUsuario()
    console.log(usuario)
}
mostrarUsuario()