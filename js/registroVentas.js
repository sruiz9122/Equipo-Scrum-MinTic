import { getUUID } from './utils.js'

/* Setear Fecha Maxima el día de Hoy */
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("inputFechaVenta").setAttribute("max", today);

/*
Inserción a la BD - SR
*/

let tbxValorTotal = document.getElementById("inputValorTotal")
let tbxIdProducto = document.getElementById("inputIdProducto")
let tbxCantidad = document.getElementById("inputCantidad")
let tbxPrecioUnitPrd = document.getElementById("inputPrecioUnitario")
let tbxFechaVenta = document.getElementById("inputFechaVenta")
let tbxEstadoVenta = document.getElementById("inputEstadoVenta")
let tbxDocIdCliente = document.getElementById("inputDocumentoIdentidadCliente")
let tbxNombreCliente = document.getElementById("inputNombreCliente")
let tbxIdVendedorAsignado = document.getElementById("inputidvendedor")
const btnRegistrarVenta = document.getElementById("btnregistrarventa")

const db = firebase.firestore();

let productos = [];

// Carga los datos de Firestore
async function loadItems() {
    productos = [];
    try {
        const response = await db.collection('productos').get()
        response.forEach(function (item) {
            //console.log(item.data()); 
            productos.push(item.data())
        })
        return productos
    } catch (error) {
        console.log(error);
    }
}


async function fmostrarIdProducto() {
    let pintarTabla = `<option value="producto">Seleccione un ID de producto</option>`;
    productos = await loadItems()

    productos.forEach(element => {
        pintarTabla += `<option value="${element.id}">${element.id}</option>`
        tbxIdProducto.innerHTML = pintarTabla
    });
}

fmostrarIdProducto()

tbxIdProducto.addEventListener("input", fEnviaDatosCalculos)
tbxCantidad.addEventListener("input", fEnviaDatosCalculos);


export async function fEnviaDatosCalculos() {

    let pintarTabla = ``
    let pintarLabel = ``
    let pintalValTotal = ``

    let dtIdProducto = tbxIdProducto.value
    let dtCantidad = tbxCantidad.value
    //console.log(dtIdProducto)
    console.log(dtCantidad)

    productos = await loadItems()
    productos.forEach(element => {
        if (dtIdProducto == `${element.id}`) {
            //console.log(element.descripcion)
            //console.log(element.valor)
            let valTotal = (dtCantidad * element.valor)
            //console.log(valTotal)

            pintarTabla = `<label for="inputPrecioUnitario" class="form-label">Precio Unitario/Producto</label>
                            <input type="number" placeholder="${element.valor}" class="form-control" min="0" id="inputPrecioUnitario" readonly="readonly" required> <br>`
            pintarLabel = `<h3 align="center">Producto: ${element.descripcion}</h3> <br>`

            pintalValTotal = `<input type="number" placeholder="${valTotal}" class="form-control" min="0" id="inputValorTotal" readonly="readonly" required> <br>`

            document.getElementById("productoventa").innerHTML = pintarLabel
            document.getElementById("preciounitario").innerHTML = pintarTabla
            document.getElementById("valtotal").innerHTML = pintalValTotal
        }
    })
}


export async function insert(item) {
    try {
        const response = await db.collection("ventas").add(item)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

btnRegistrarVenta.addEventListener('click', datosEntrada)


async function datosEntrada() {
    console.clear()

    let dtValorTotal = tbxValorTotal.value
    let dtIdProducto = tbxIdProducto.value
    let dtCantidad = tbxCantidad.value
    let dtPrecioUnitPrd = tbxPrecioUnitPrd.value
    let dtFechaVenta = tbxFechaVenta.value
    let dtEstadoVenta = tbxEstadoVenta.value
    let dtDocIdCliente = tbxDocIdCliente.value
    let dtNombreCliente = tbxNombreCliente.value
    let dtIdVendedorAsignado = tbxIdVendedorAsignado.value

    let convertEstado = dtEstadoVenta

    if (dtEstadoVenta == 1) {
        convertEstado = `En progreso`
    } else if (dtEstadoVenta == 2) {
        convertEstado = `Cancelada`
    } else if (dtEstadoVenta == 3) {
        convertEstado = `Entregada`
    }

    productos = await loadItems()
    productos.forEach(element => {
        if (dtIdProducto == `${element.id}`) {
            dtPrecioUnitPrd = element.valor
            dtValorTotal = (dtCantidad * dtPrecioUnitPrd)
        }
    })

    console.log(
        dtValorTotal,
        dtIdProducto,
        dtCantidad,
        dtPrecioUnitPrd,
        dtFechaVenta,
        convertEstado,
        dtDocIdCliente,
        dtNombreCliente,
        dtIdVendedorAsignado
    )

    if (dtValorTotal != '' &&
        dtIdProducto != '' &&
        dtFechaVenta != '' &&
        dtCantidad != '' &&
        dtPrecioUnitPrd != '' &&
        dtEstadoVenta != '' &&
        dtDocIdCliente != '' &&
        dtNombreCliente != '' &&
        dtIdVendedorAsignado != '') {

        try {
            const prod = {
                id: getUUID(),
                valortotal: dtValorTotal,
                idproducto: dtIdProducto,
                fechaventa: dtFechaVenta,
                cantidad: dtCantidad,
                preciounitarioproducto: dtPrecioUnitPrd,
                estadoventa: convertEstado,
                docidcliente: dtDocIdCliente,
                nombrecliente: dtNombreCliente,
                idvendedorasignado: dtIdVendedorAsignado
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
