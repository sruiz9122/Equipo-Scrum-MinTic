let numId = document.getElementById("id")
let strDescripcionProducto = document.getElementById("descripcion_producto")
let numVal = document.getElementById("valor_unitario")
let strEstado = document.getElementById("estadoproducto")
let btnbuscar = document.getElementById("buscar")
let btnlimpiar = document.getElementById("limpiar")
let strEstadoConfirm = document.getElementById("edicionEstado")
let btnConfirmar = document.getElementById("confirmar")
const NODATA = "No se encuentran datos"

/* HU_014 - Integración Backend Productos - Consulta Productos  */

/*
Usuarios
*/
// let gasolina = {
//     id: 1,
//     descripcion: `Gasolina Corriente`,
//     valorunit: 9000,
//     estado: `Disponible`
// }

// let gasolina_extra = {
//     id: 2,
//     descripcion: `Gasolina extra`,
//     valorunit: 10000,
//     estado: `No Disponible`
// }

// let gas_natural_vehicular = {
//     id: 3,
//     descripcion: `Gas natural vehicular`,
//     valorunit: 1500,
//     estado: `Disponible`
// }

// let Aditivo_gasolina = {
//     id: 4,
//     descripcion: `Aditivo Gasolina`,
//     valorunit: 15000,
//     estado: `Disponible`
// }

// let usuarios = [gasolina, gasolina_extra, gas_natural_vehicular, Aditivo_gasolina]


const db = firebase.firestore();
let productos = [];

// Carga los datos de Firestore
async function loadItems() {
    productos = [];
    try {

        const response = await db.collection('productos').get()

        response.forEach(function (item) {
            console.log(item.data());
            productos.push(item.data())
        })
        return productos
    } catch (error) {
        console.log(error);
    }
}


/*
Botones
*/
btnbuscar.addEventListener("click", getSearch)
btnlimpiar.addEventListener("click", clearSearch)
btnConfirmar.addEventListener("click", getConfirm)

/*
Funciones que pintan en pantalla
*/
//  function fmostrar() { //HU_014 - Integración Backend Productos - Consulta Productos
async function fmostrar() { //HU_014 - Integración Backend Productos - Consulta Productos

    let contenido = ``;

    //HU_014 - Integración Backend Productos - Consulta Productos 
    // usuarios.forEach(element => {
    //     contenido += `<tr><th scope="row">${element.id}</th><th>${element.descripcion}</th><th>${element.valorunit}</th><th>${element.estado}</th><th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
    //     $('#bodyTabla').html(contenido)
    // });

    productos = await loadItems()
    productos.forEach(element => {
        contenido += `<tr><th scope="row">${element.id}</th><th>${element.descripcion}</th><th>${element.valor}</th><th>${element.estado}</th></tr>`
        $('#bodyTabla').html(contenido)
    });
    //HU_014 - Integración Backend Productos - Consulta Productos 

}

function fmostrarFiltradoid(filtered) {

    let pintarTabla = ``;

    filtered.forEach(usuario => {
        pintarTabla += `<tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
        feditar(usuario.id)
        $('#bodyTabla').html(pintarTabla)
    });

}

function fmostrarFiltrado(filtered) {

    let pintarTabla = ``;

    filtered.forEach(usuario => {
        pintarTabla += `<tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
        $('#bodyTabla').html(pintarTabla)
    });

}

/*
Funcion de búsqueda
*/
function getSearch() {

    console.clear()

    let id = numId.value
    let descripcion = strDescripcionProducto.value
    let valor = numVal.value
    let estado = strEstado.value



    if (id == '' && descripcion == '' && valor == '' && estado == '') {
        fmostrar()
    } /* else if (id > 0 && id <= usuarios.length) {

        const filtered = usuarios.filter(function (element) {
            return element.id == id;
        });

        fmostrarFiltradoid(filtered)

    } else if (descripcion != '') {

        const filtered = usuarios.filter(function (element) {
            return element.nombre.toUpperCase() == nombreUsuario.toUpperCase();
        });

        if (filtered == '') {
            alert(NODATA)
        } else {
            fmostrarFiltradoid(filtered)
        }

    } else if (valor != '') {

        const filtered = usuarios.filter(function (element) {
            return element.correo == correo;
        });

        if (filtered == '') {
            alert(NODATA)
        } else {
            fmostrarFiltradoid(filtered)
        }

    }  else if (estado != '') {

        if (estado === "noautorizado") {
            estado = "No Autorizado"
        }

        const filtered = usuarios.filter(function (element) {
            return element.estado.toUpperCase() == estado.toUpperCase();
        });

        if (filtered == '') {
            alert(NODATA)
        } else {
            fmostrarFiltrado(filtered)
        }

    } */else {
        alert(NODATA)
    }

}

/*
Función que permite limpiar la pantalla
*/
function clearSearch() {
    let usuarioFilter = document.getElementById("bodyTabla")
    let lblUsuariEdit = document.getElementById("usuarioeditar")
    let pintarLabel = `<h3 align="center"></h3>`

    //Limpia filtros de consulta
    numId.value = ''
    strDescripcionProducto.value = ''
    numVal.value = ''
    strEstado.value = ''


    //Limpia la tabla
    usuarioFilter.innerHTML = ''

    //Limpiar campos de edición
    lblUsuariEdit.innerHTML = pintarLabel

}

/*
Función que permite Editar
*/
function feditar(varEntrada) {
    let lblUsuariEdit = document.getElementById("usuarioeditar")
    let ajustaArr = varEntrada - 1
    let usuarioEdit = usuarios[ajustaArr]
    let pintarLabel = `<h3 align="center">Usuario: ${usuarioEdit.nombre}</h3>`
    lblUsuariEdit.innerHTML = pintarLabel
}

/*
 Función que permite confirmar cambios
 */
function getConfirm() {
    console.clear()
    let estado = strEstadoConfirm.value
    let rol = strRolConfirm.value

    console.log(rol)
    console.log(estado)

    alert("Botón no configurado, lo siento!")
}