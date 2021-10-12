let numId = document.getElementById("id")
let strNombreUsuario = document.getElementById("nombre_usuario")
let strEstado = document.getElementById("estado")
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

let eliana = {
    id: 1,
    nombre: `Eliana Navarro`,
    correo: `elianaj22@gmail.com`,
    rol: `Administrador`,
    estado: `Autorizado`
}

let andresm = {
    id: 2,
    nombre: `Andres Molina`,
    correo: `andresmolina1997@hotmail.com`,
    rol: `Vendedor`,
    estado: `Pendiente`
}

let andresb = {
    id: 3,
    nombre: `Andres Burbano`,
    correo: `faburbano2@gmail.com`,
    rol: `Vendedor`,
    estado: `Autorizado`
}

let juan = {
    id: 4,
    nombre: `Juan Urrego`,
    correo: `j.a.u.m.0.6@gmail.com`,
    rol: `Administrador`,
    estado: `Autorizado`
}

let sergio = {
    id: 5,
    nombre: `Sergio Ruiz`,
    correo: `sruiz9122@gmail.com`,
    rol: `Vendedor`,
    estado: `No Autorizado`
}

let fredy = {
    id: 6,
    nombre: `Fredy Mendoza`,
    correo: `fmendoza@gmail.com`,
    rol: `Vendedor`,
    estado: `No Autorizado`
}

let paola = {
    id: 7,
    nombre: `Paola Chia`,
    correo: `pchia@realm.com`,
    rol: `Administradora`,
    estado: `Autorizado`
}

let usuarios = [eliana, andresm, andresb, juan, sergio, fredy, paola]






/*
Conexión a la DB
*/



const db = firebase.firestore();
let usuarios = [];


/* Botones*/

btnbuscar.addEventListener("click", getSearch)
btnlimpiar.addEventListener("click", clearSearch)
btnConfirmar.addEventListener("click", getConfirm)

/*
Funciones que pintan en pantalla
*/ 
function fmostrar() {

    let contenido = ``;
    let a = 1
    usuarios.forEach(element => {
        contenido += `<tr> <th scope="row">${element.id}</th> <th>${element.nombre}</th> <th>${element.correo}</th> <th>${element.rol}</th> <th>${element.estado}</th> <th><input type="button" value="Editar" id="teditar${a}" class="btn btn-dark" /></th></tr>`
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
    let nombreUsuario = strNombreUsuario.value
    let correo = strCorreo.value
    let rol = strRol.value
    let estado = strEstado.value



    if (id == '' && nombreUsuario == '' && estado == '' && correo == '' && rol == '') {
        fmostrar()
    } else if (id > 0 && id <= usuarios.length) {

        const filtered = usuarios.filter(function (element) {
            return element.id == id;
        });

        fmostrarFiltradoid(filtered)

    } else if (nombreUsuario != '') {

        const filtered = usuarios.filter(function (element) {
            return element.nombre.toUpperCase() == nombreUsuario.toUpperCase();
        });

        if (filtered == '') {
            alert(NODATA)
        } else {
            fmostrarFiltradoid(filtered)
        }

    } else if (correo != '') {

        const filtered = usuarios.filter(function (element) {
            return element.correo == correo;
        });

        if (filtered == '') {
            alert(NODATA)
        } else {
            fmostrarFiltradoid(filtered)
        }

    } else if (rol != '') {

        const filtered = usuarios.filter(function (element) {
            return element.rol.toUpperCase() == rol.toUpperCase();
        });

        if (filtered == '') {
            alert(NODATA)
        } else {
            fmostrarFiltrado(filtered)
        }

    } else if (estado != '') {

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
    strNombreUsuario.value = ''
    strEstado.value = ''
    strCorreo.value = ''
    strRol.value = ''

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

    alert("Usuario Actualizado!")
}