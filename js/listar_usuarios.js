var numId = document.getElementById("id")
var strNombreUsuario = document.getElementById("nombre_usuario")
var strEstado = document.getElementById("estado")
var strCorreo = document.getElementById("correo")
var strRol = document.getElementById("rol")
var btnbuscar = document.getElementById("buscar")
var btnlimpiar = document.getElementById("limpiar")

var strEstadoConfirm = document.getElementById("edicionEstado")
var strRolConfirm = document.getElementById("edicionRol")
var btnConfirmar = document.getElementById("confirmar")
var noData = "No se encuentran datos"

var eliana = {
    id: 1,
    nombre: `Eliana Navarro`,
    correo: `elianaj22@gmail.com`,
    rol: `Administrador`,
    estado: `Autorizado`
}

var andresm = {
    id: 2,
    nombre: `Andres Molina`,
    correo: `andresmolina1997@hotmail.com`,
    rol: `Vendedor`,
    estado: `Pendiente`
}

var andresb = {
    id: 3,
    nombre: `Andres Burbano`,
    correo: `faburbano2@gmail.com`,
    rol: `Vendedor`,
    estado: `Autorizado`
}

var juan = {
    id: 4,
    nombre: `Juan Urrego`,
    correo: `j.a.u.m.0.6@gmail.com`,
    rol: `Administrador`,
    estado: `Autorizado`
}

var sergio = {
    id: 5,
    nombre: `Sergio Ruiz`,
    correo: `sruiz9122@gmail.com`,
    rol: `Vendedor`,
    estado: `No Autorizado`
}

var fredy = {
    id: 6,
    nombre: `Fredy Mendoza`,
    correo: `fmendoza@gmail.com`,
    rol: `Vendedor`,
    estado: `No Autorizado`
}

var usuarios = [eliana, andresm, andresb, juan, sergio, fredy]

btnbuscar.addEventListener("click", getSearch)
btnlimpiar.addEventListener("click", clearSearch)
btnConfirmar.addEventListener("click", getConfirm)

var etiqueta = [usuarios.length] 

function getSearch() {

    console.clear()
    var usuarioFilter = document.getElementById("bodyTabla")

    var id = numId.value
    var nombreUsuario = strNombreUsuario.value
    var correo = strCorreo.value
    var rol = strRol.value
    var estado = strEstado.value
    var pintarTabla = ``
    var idEtiquetaEd = ``
   



    if (id == '' && nombreUsuario == '' && estado == '' && correo == '' && rol == '') {
        
        var a = 0
        usuarios.forEach(usuario => {
            
            a += 1
            idEtiquetaEd = `teditar${a}`
            pintarTabla = `${pintarTabla} <tr id="leditar"> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="${idEtiquetaEd}" class="btn btn-dark" /></th></tr>`
            usuarioFilter.innerHTML = pintarTabla
            etiqueta.push(idEtiquetaEd)
            console.log(etiqueta[a])
   
        });


    } else if (id > 0 && id <= usuarios.length) {
        // Filtrar por id

        const filtered = usuarios.filter(function (element) {
            return element.id == id;
        });

        filtered.forEach(usuario => {
            pintarTabla = `${pintarTabla} <tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
            usuarioFilter.innerHTML = pintarTabla
        });

    } else if (nombreUsuario != '') {

        const filtered = usuarios.filter(function (element) {
            return element.nombre.toUpperCase() == nombreUsuario.toUpperCase();
        });

        if (filtered == '') {
            alert(noData)
        } else {

            filtered.forEach(usuario => {
                pintarTabla = `${pintarTabla} <tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
                usuarioFilter.innerHTML = pintarTabla
            });

        }

    } else if (correo != '') {

        const filtered = usuarios.filter(function (element) {
            return element.correo == correo;
        });

        if (filtered == '') {
            alert(noData)
        } else {

            filtered.forEach(usuario => {
                pintarTabla = `${pintarTabla} <tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
                usuarioFilter.innerHTML = pintarTabla
            });
        }

    } else if (rol != '') {

        const filtered = usuarios.filter(function (element) {
            return element.rol.toUpperCase() == rol.toUpperCase();
        });

        if (filtered == '') {
            alert(noData)
        } else {

            filtered.forEach(usuario => {
                pintarTabla = `${pintarTabla} <tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
                usuarioFilter.innerHTML = pintarTabla
            });
        }

    } else if (estado != '') {

        if (estado === "noautorizado") {
            estado = "No Autorizado"
        }

        const filtered = usuarios.filter(function (element) {
            return element.estado.toUpperCase() == estado.toUpperCase();
        });

        if (filtered == '') {
            alert(noData)
        } else {

            filtered.forEach(usuario => {
                pintarTabla = `${pintarTabla} <tr> <th scope="row">${usuario.id}</th> <th>${usuario.nombre}</th> <th>${usuario.correo}</th> <th>${usuario.rol}</th> <th>${usuario.estado}</th> <th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`
                usuarioFilter.innerHTML = pintarTabla
            });
        }

    } else {
        alert(noData)
    }

}

function clearSearch() {
    numId.value = ''
    strNombreUsuario.value = ''
    strEstado.value = ''
    strCorreo.value = ''
    strRol.value = ''
}

function feditar(){   

}

function getConfirm() {
    console.clear()
    var estado = strEstadoConfirm.value
    var rol = strRolConfirm.value

    console.log(rol)
    console.log(estado)

    alert("Se actualiza usuario")
}

