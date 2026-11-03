const formulario = document.querySelector("#formulario")
// const mensaje = document.querySelector("#mensaje")
const listaMaterias = document.querySelector("#listaMaterias")
let materiaEditandoId = null 
let materiaEditar = null 
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none" 
const btnGuardar = document.querySelector("#btnGuardar")
const API_MATERIAS = "http://localhost:3000/materias" 

formulario.addEventListener("submit", async function (event) { 
    event.preventDefault();

    // Cargamos los valores de los campos del formulario
    const codigo = document.querySelector("#codigo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const descripcion = document.querySelector("#descripcion").value.trim()
    const cargahoraria = document.querySelector("#cargahoraria").value.trim()
    const estado = document.querySelector("#estado").value.trim()

    // validaciones de los campos del formulario
    if (codigo === "" || nombre === "" || estado === "" || cargahoraria === "") {
        mostrarMensaje("Los campos codigo, nombre, estado y carga horaria son obligatorios", "mje-error")
        return
    }

    if (cargahoraria <= 0 || !Number.isInteger(Number(cargahoraria))) {
        mostrarMensaje("La carga horaria debe ser un número entero positivo", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    if (estado !== "activa" && estado !== "inactiva" && estado !== "ACTIVA" && estado !== "INACTIVA" && estado !== "Activa" && estado !== "Inactiva") {
        mostrarMensaje("El estado debe ser 'activa' o 'inactiva'", "mje-error")
        return
    }

    if (codigo.length > 7) {
        mostrarMensaje("El código no puede tener más de 7 caracteres", "mje-error")
        return
    }
try {
    // Si materiaEditandoId es null, significa que estamos creando una nueva materia, por lo que hacemos un POST.
    if (materiaEditandoId === null) {
        const materia = { 
            codigo: codigo,
            nombre: nombre,
            descripcion: descripcion,
            cargahoraria: Number(cargahoraria),
            estado: estado
        }
        const respuesta = await fetch(API_MATERIAS, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(materia) 
        })
        if (!respuesta.ok) { 
            throw new Error("La API respondió con un error.")
        }
        mostrarMensaje("Materia guardada correctamente", "mje-exito")
    } else { 
        const datosActuales = { 
            nombre: nombre,
            descripcion: descripcion,
            cargahoraria: Number(cargahoraria),
            estado: estado
        }
        if (JSON.stringify(datosActuales) === JSON.stringify(materiaEditar)){ 
            mostrarMensaje("No se realizaron cambios", "mje-adv")
            return
        }
        const respuesta = await fetch(`${API_MATERIAS}/${materiaEditandoId}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                cargahoraria: Number(cargahoraria),
                estado: estado
            })
        })
        if (!respuesta.ok) {
            throw new Error("La API respondió con un error")
        }
        materiaEditandoId = null 
        materiaEditar = null 
        btnGuardar.textContent = "Guardar Materia" 
        document.querySelector("#id").disabled = false 
        
        mostrarMensaje("Materia actualizada correctamente", "mje-exito")
    }
    await actualizarListaMaterias() 
    formulario.reset()
} catch (error){
    console.error(error.message)
    mostrarMensaje("No fue posible realizar la operación", "mje-error")
}
});


async function obtenerMaterias() { 
    try{
    const respuesta = await fetch(API_MATERIAS)  
    const materias = await respuesta.json() 
    return materias
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

function mostrarMaterias(materias) {
    listaMaterias.innerHTML = ""
    for (const materia of materias) {
        listaMaterias.innerHTML += `
        <tr>
            <td>${materia.id}</td>
            <td>${materia.nombre}</td>
            <td>${materia.descripcion}</td>
            <td>${materia.cargahoraria}</td>
            <td>${materia.estado}</td>
            <td>
                <button 
                class="btn-editar" 
                data-id="${materia.id}" // Agregamos un atributo data-id al botón de editar para poder identificar qué materia se está editando
                title="Editar materia">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-id="${materia.id}"
                title="Eliminar materia">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

 async function eliminarMateria(id) { 
    const respuesta = await fetch(`${API_MATERIAS}/${id}`, { 
        method: "DELETE"
    })    
    if (!respuesta.ok) {
        mostrarMensaje("No se pudo eliminar la materia", "mje-error")
        return
    }
    
    if (materiaEditandoId === id){ 
        formulario.reset()
        materiaEditar = null
        materiaEditandoId = null
        btnGuardar.textContent = "Guardar materia"
        document.querySelector("#id").disabled = false
        btnCancelar.style.display = "none"
    }
    mostrarMensaje("Materia eliminada correctamente", "mje-exito")
    await actualizarListaMaterias()
}

async function actualizarListaMaterias() { 
    try {
    const materias = await obtenerMaterias()
    mostrarMaterias(materias)
    } catch (error) {
        mostrarMensaje("No se pudo cargar la lista de materias", "mje-error")
    }
}

listaMaterias.addEventListener("click", (e) => { 
    const boton_el = e.target.closest(".btn-eliminar") 
    if (boton_el) { 
        const id = Number(boton_el.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar esta materia?")
        if (confirmar) {
        eliminarMateria(id)
        }
    }
    const boton_ed = e.target.closest(".btn-editar") 
    if (boton_ed) { 
        const id = Number(boton_ed.dataset.id)
        editarMateria(id)
    }
})

async function editarMateria(id) { 
    const materias = await obtenerMaterias()
    const materia = materias.find(materia => materia.id === id) 

    if (!materia) { 
        mostrarMensaje("Materia no encontrada", "mje-error")
        return
    }
    document.querySelector("#id").value = materia.id; 
    document.querySelector("#id").disabled = true; 
    document.querySelector("#nombre").value = materia.nombre;
    document.querySelector("#descripcion").value = materia.descripcion;
    document.querySelector("#cargahoraria").value = materia.cargahoraria;
    document.querySelector("#estado").value = materia.estado;

    materiaEditar = { 
        nombre: materia.nombre,
        descripcion: materia.descripcion,
        cargahoraria: materia.cargahoraria,
        estado: materia.estado
    }

    materiaEditandoId = materia.id; 
    btnCancelar.style.display ="inline-block" 
    btnGuardar.textContent = "Actualizar Materia" 
    document.querySelector("#nombre").focus() 
}

function cancelarEdicion(){ 
    formulario.reset()
    materiaEditandoId = null
    materiaEditar = null
    btnGuardar.textContent = "Guardar Materia"
    document.querySelector("#id").disabled = false
    btnCancelar.style.display = "none" 
    document.querySelector("#id").focus() 
}

btnCancelar.addEventListener("click", cancelarEdicion) 

async function iniciar(){ 
    await actualizarListaMaterias()
}

iniciar() 