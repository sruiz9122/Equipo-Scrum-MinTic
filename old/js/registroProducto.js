import { getUUID } from './utils.js'

let strDescPrd = document.getElementById("inputDescripcionProducto")
let numValor = document.getElementById("inputValorUnitarioProducto")
let strEstado = document.getElementById("inputEstadoProducto")
let boton = document.getElementById('botonRegistrarProducto')
const db = firebase.firestore();

export async function insert(item) {
    try {
        const response = await db.collection("productos").add(item)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

boton.addEventListener('click', datosEntrada)

async function datosEntrada() {
    console.clear()

    let descProd = strDescPrd.value
    let valorUni = numValor.value
    let estado = strEstado.value

    if (estado == 1) {
        estado = `Disponible`
    } else if (estado == 2) {
        estado = `No Disponible`
    }


    console.log(descProd, valorUni, estado)

    if (descProd != '' && valorUni != '' && estado != '') {

        try {
            const prod = {
                id: getUUID(),
                descripcion: descProd,
                estado: estado,
                valor: valorUni
            }
            const response = await insert(prod)
            console.log(response)//Respuesta de la DB

        } catch (error) {
            console.error(error)
        }

    } else {
        alert(`Ninguno de los campos puede estar vacío`)
    }


}

//boton.click();
// boton.click()==undefined ?console.log("es undefined") : console.log("Falso")
/*if(boton.onclick){
    alert("click con datos");
}*/
//boton.onclick = () => { console.log("click", datosEntrada); }


