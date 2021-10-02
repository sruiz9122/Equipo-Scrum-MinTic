let numId = document.getElementById("id")
let strIdCliente = document.getElementById("idcliente")
let numIdVendedor = document.getElementById("idVendedor")
let strCorreo = document.getElementById("correo")
let strRol = document.getElementById("rol")
let btnbuscar = document.getElementById("buscar")
let btnlimpiar = document.getElementById("limpiar")
let strEstadoConfirm = document.getElementById("edicionEstado")
let strRolConfirm = document.getElementById("edicionRol")
let btnConfirmar = document.getElementById("confirmar")
const NODATA = "No se encuentran datos"

/*
Usuarios
*/
let regVenta1 = {
    id:100000001,
    estado:`Entregado`,
    valorTo:`$180000`,
    idprod:5248,
    cantProd:10,
    precioUni:1526,
    fechaVenta:`02/10/2021`,
    docIdCliente: 10325612,
    idVendedor: 1346
}

let regVenta2 = {
    id:100000002,
    estado:`Cancelado`,
    valorTo:`$80000`,
    idprod:5249,
    cantProd:10,
    precioUni:1801,
    fechaVenta:`03/10/2021`,
    docIdCliente: 10336612,
    idVendedor: 1346
}

let regVenta3 = {
    id:100000003,
    estado:`Procesando`,
    valorTo:`$181000`,
    idprod:5250,
    cantProd:10,
    precioUni:1800,
    fechaVenta:`04/10/2021`,
    docIdCliente: 10125612,
    idVendedor: 1346
}

let regVenta4 = {
    id:100000004,
    estado:`Entregado`,
    valorTo:`$180300`,
    idprod:5251,
    cantProd:10,
    precioUni:1800,
    fechaVenta:`05/10/2021`,
    docIdCliente: 3526816,
    idVendedor: 1346
}


let usuarios = [regVenta1,regVenta2,regVenta3,regVenta4]

/*
Botones
*/
btnbuscar.addEventListener("click", getSearch)
btnlimpiar.addEventListener("click", clearSearch)
//btnConfirmar.addEventListener("click", getConfirm)

/*
Funciones que pintan en pantalla
*/ 
function fmostrar() {

    let contenido = ``;
    let a = 1
    usuarios.forEach(element => {
        contenido += `<tr> <th scope="row">${element.id}</th> <th>${element.estado}</th> <th>${element.valorTo}</th> <th>${element.idprod}</th> <th>${element.cantProd}</th> <th>${element.precioUni}</th> <th>${element.fechaVenta}</th><th>${element.docIdCliente}</th><th>${element.idVendedor}</th><th><input type="button" value="Editar" id="teditar${a}" class="btn btn-dark" /></th></tr>`
        $('#bodyTabla').html(contenido)
        a += 1
    });

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
    let idCliente = strIdCliente.value
    let idVendedor = numIdVendedor.value




    if (id == '' && idCliente == '' && idVendedor == '' ) {
        fmostrar()
    } else if (id > 0 && id <= usuarios.length) {

        const filtered = usuarios.filter(function (element) {
            return element.id == id;
        });

        fmostrarFiltradoid(filtered)

    //else if (idCliente != '') {

    //     const filtered = usuarios.filter(function (element) {
    //         return element.nombre.toUpperCase() == idCliente.toUpperCase();
    //     });

    //     if (filtered == '') {
    //         alert(NODATA)
    //     } else {
    //         fmostrarFiltradoid(filtered)
    //     }

    // } else if (correo != '') {

    //     const filtered = usuarios.filter(function (element) {
    //         return element.correo == correo;
    //     });

    //     if (filtered == '') {
    //         alert(NODATA)
    //     } else {
    //         fmostrarFiltradoid(filtered)
    //     }

    // } else if (rol != '') {

    //     const filtered = usuarios.filter(function (element) {
    //         return element.rol.toUpperCase() == rol.toUpperCase();
    //     });

    //     if (filtered == '') {
    //         alert(NODATA)
    //     } else {
    //         fmostrarFiltrado(filtered)
    //     }

    // } else if (estado != '') {

    //     if (estado === "noautorizado") {
    //         estado = "No Autorizado"
    //     }

    //     const filtered = usuarios.filter(function (element) {
    //         return element.estado.toUpperCase() == estado.toUpperCase();
    //     });

    //     if (filtered == '') {
    //         alert(NODATA)
    //     } else {
    //         fmostrarFiltrado(filtered)
    //     }

    } else {
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
    strIdCliente.value = ''
    numIdVendedor.value = ''
    

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
// function getConfirm() {
//     console.clear()
//     let estado = strEstadoConfirm.value
//     let rol = strRolConfirm.value

//     console.log(rol)
//     console.log(estado)

//     alert("Botón no configurado, lo siento!")
// }