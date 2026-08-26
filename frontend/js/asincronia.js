// console.log("Inicio")
// setTimeout(() => {
//     console.log("Buscando alumnos...")
// }, 3000)
// console.log("Fin")

// function saludar(){
//     console.log("Hola")
// }
// function ejecutar(funcion){
//     funcion();
// }
// ejecutar(saludar)

// function despedirse(){
//     console.log("Hasta luego")
// }
// setTimeout(despedirse, 3000)

// setTimeout(() => {
//     console.log("Buscando docentes...")
// }, 2000);

// setTimeout(() => {
//     console.log("Buscando materias...")
// }, 4000);

// setTimeout(() => {
//     console.log("Buscando cursos...")
// }, 1000);

// console.log("Abriendo SGA")
// setTimeout(() => {
//     console.log("Alumnos cargados")
// }, 3000);

// console.log("El usuario puede seguir navegando")

// function obtenerAlumnos(){
//    return new Promise((resolve) => {
//     setTimeout(() => {
//         console.log("Ya tengo el arreglo")
//         resolve(["Ana", "Juan", "Pedro"])
//     }, 3000);
//    })
// }
// // obtenerAlumnos().then((alumnos) => {
// //     console.log(alumnos)
// // })

// // async function iniciar() {
// //     const alumnos = await obtenerAlumnos()
// //     console.log(alumnos)
// // } 
// // iniciar()

// // login(usuario).then((usuario) => {
// //     return obtenerCursos(usuario.id)
// // })
// // .then((cursos) => {
// //     return obtenerNotas(cursos)
// // })
// // .then((notas) => {
// //     console.log(notas)
// // })
// // .catch((error) => {
// //     console.log(error)
// // })

// // async function mostrarNotas(){
// //     try {
// //     const usuario = await login(usuario)
// //     const cursos = await obtnerCursos(usuario.id)
// //     const notas = await obtenerNotas(cursos)
// //     console.log(notas)
// //     }
// //     catch(error) {
// //         console.log()
// //     }
// // }

// function obtenerClima() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("22°c - Soleado")
//         }, 2000)
//     })
// }

// // con then()
// obtenerClima().then((clima) => {
//     console.log(clima)
// });

// // con async/await
// async function mostrarClima() {
//     const clima = await obtenerClima()
//     console.log(clima)
// }

// mostrarClima()

// function consultarSaldo() {
//     return new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(125000)
//     }, 3000);
// });
// }

// async function mostrarSaldo(){
//     const saldo = await consultarSaldo()
//     console.log(`Su saldo es: $${saldo}`)
// }
// mostrarSaldo()

// function iniciarSesion() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Bienvenida, Irina")
//         }, 2000)
//     })
// }
// async function mostrarInicio() {
//     const mensaje = await iniciarSesion()
//     console.log(mensaje)
// }
// mostrarInicio()

// function obtenerUsuario(){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 id: 1,
//                 nombre: "Maria",
//                 edad: 25
//             })
//         }, 3000);
//     })
// }
// async function mostrarUsuario(){
//     console.log("Consultando usuario...")
//     const usuario = await obtenerUsuario()
//     console.log(usuario)
// }
// mostrarUsuario()

async function prueba(){
const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
console.log(respuesta)
}
prueba()