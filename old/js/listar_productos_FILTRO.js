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
const db = firebase.firestore();
let productos = [];

// Carga los datos de Firestore
async function loadItems() {
    productos = [];
    try {
        const response = await db.collection('productos').get()
        response.forEach(function (item) {
            // console.log(item.data()); //HU_015 - Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción) Se deja linea en comentario
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
async function fmostrar() { //HU_014 - Integración Backend Productos - Consulta Productos
    let contenido = ``;
    productos = await loadItems()
    productos.forEach(element => {
        contenido += `<tr><th scope="row">${element.id}</th><th>${element.descripcion}</th><th>${element.valor}</th><th>${element.estado}</th></tr>`
        $('#bodyTabla').html(contenido)
    }); 
}

// HU_015 - INICIO Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción) Se comenta bloque de codigo y se ajusta
async function fmostrarFiltradoid(id) {
    let pintarTabla = ``;
    console.clear();
    console.log('Id consultado: ' + id);
    productos = await loadItems()
    productos.forEach(element => {
        if (id == `${element.id}`) {
            pintarTabla += `<tr><th scope="row">${element.id}</th><th>${element.descripcion}</th><th>${element.valor}</th><th>${element.estado}</th></tr>`
            $('#bodyTabla').html(pintarTabla)
        }
    });
}

async function fmostrarFiltrado(descripcion) {
    let pintarTabla = ``;
    let descrip = ''
    console.clear();
    console.log('Descripcion consultada: ' + descripcion);
    productos = await loadItems()
    descripcion = descripcion.toLowerCase();
    productos.forEach(element => {
        descrip = `${element.descripcion}`
        descrip = descrip.toLowerCase();
        if (descrip.includes(descripcion)) {
            pintarTabla += `<tr><th scope="row">${element.id}</th><th>${element.descripcion}</th><th>${element.valor}</th><th>${element.estado}</th></tr>`
            $('#bodyTabla').html(pintarTabla)
        }
    })
}

// HU_015 - FIN Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción) 

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
    }
    // HU_015 - INICIO Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción)
    else if (id != '' && descripcion == '') {
        fmostrarFiltradoid(id)
    }
    else if (id == '' && descripcion != '') {
        fmostrarFiltrado(descripcion)
    }
    else if(id != '' && descripcion != ''){
        console.clear();
        fmostrarFiltradoid(id)
    }
    // HU_015 - FIN Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción)
   
   else {
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