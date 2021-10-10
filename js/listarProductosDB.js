//   Declarar variables globales
const database = firebase.firestore();
let listaProductos = [];
// Variable para guardar el ID del Producto a Editar
let idRegistro = 0;


// Variables DOM
//del proyecto
let numId = document.getElementById("inputIdProducto");
let strDescripcionProducto = document.getElementById("inputDescripcionProducto");
let numVal = document.getElementById("valor_unitario");
let strEstado = document.getElementById("estadoproducto");
let btnbuscar = document.getElementById("botonBuscarProducto");
// let btnEditarProducto = document.
let btnlimpiar = document.getElementById("botonLimpiarBusqueda");
let strEstadoConfirm = document.getElementById("edicionEstado");
let btnConfirmar = document.getElementById("botonConfirmar");
const NODATA = "No se encuentran datos";


//Función que busca y e implmeenta pintar en pantalla la tabla con los resultados de búsqueda
const buscarDB = async () => {
    resetCamposFormulario();
    try {
        let id = numId.value;
        let descripcion = strDescripcionProducto.value;
        listaProductos = await leerProductos();
        if (id == '' && descripcion == '') {
            fmostrar(listaProductos);
        }
        // HU_015 - INICIO Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción)
        else if (id != '' && descripcion == '') {
            fmostrarFiltradoid(id, listaProductos);
        }
        else if (id == '' && descripcion != '') {
            fmostrarFiltrado(descripcion, listaProductos);
        }
        else if (id != '' && descripcion != '') {
            fmostrarFiltradoid(id, listaProductos);
        }
        // pintarBrowser(listaProductos);

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

//Función para pintar la tabla de resultados de búsqueda
/* function pintarBrowser(elementos) {
    console.log(elementos);
    let contenido = ``;
    elementos.forEach(element => {
        contenido += `<tr>
                        <td scope="row">${element.id}</td>
                        <td>${element.descripcion}</td>
                        <td>${element.valor}</td>
                        <td>${element.estado}</td>
                        <td><input type="button" value="Editar" id="${element.id}" class="botonEditar btn btn-dark" /></td>
                    </tr>`;
        $('#bodyTabla').html(contenido);
    });

    cargarBotones();
    //contendorTarea.innerHTML = contenidoHtml;
} */

//Base de datos--------------------------------
//Función que hace un GetAll de todos los registros
const leerProductos = async () => {
    const productos = [];
    const respuesta = await database.collection('productos').get();
    respuesta.forEach(function (item) {
        // console.log(item.data());
        productos.push(item.data());
    });
    return productos;
};

// Eventos---------------------------------------
//Evento Buscar(listar)
btnbuscar.addEventListener('click', (e) => {
    buscarDB();
});

//Función para cargar información al formularoi de edición
const cargarBotones = () => {
    $(".botonEditar").click(function (e) {
        idRegistro = e.target.id;

        // LOGS de Testing-----------------------------------:
        // console.log(e);
        // console.log(e.target.id);        
        // console.log($(e.target).parents().eq(1)[0]);
        // console.log($(e.target).parents().eq(1).children());
        // console.log($(e.target).parents().eq(1).children()[3].innerHTML);
        // console.log($("#estadoproducto").eq(0)[0]);
        // console.log($("#estadoproducto optgroup"));
        // console.log($("#estadoproducto optgroup").children());
        // console.log($("#estadoproducto optgroup").children()[1].innerHTML);

        const descripcionProducto = $(e.target).parents().eq(1).children()[1].innerHTML;
        const valorProducto = $(e.target).parents().eq(1).children()[2].innerHTML;
        const estadoProducto = $(e.target).parents().eq(1).children()[3].innerHTML;

        $("#descripcion_producto").val(descripcionProducto);
        $("#valor_unitario").val(valorProducto);
        $("#inputEstadoProducto").html(``);
        estadoProducto == "Disponible" ?
            $("#inputEstadoProducto").append(`              
                <option value="">Seleccione un estado</option>
                <option value="1" selected>Disponible</option>
                <option value="2">No Disponible</option>        
          `) :
            $("#inputEstadoProducto").append(`      
      
            <option value="">Seleccione un estado</option>
            <option value="1" >Disponible</option>
            <option value="2" selected>No Disponible</option>      
          `);

    });
};

//Evento asociado al boton de Confirmar Edición
$('#botonConfirmar').click((e) => {
    e.preventDefault();
    const descripcionProducto = $("#descripcion_producto").val();
    const valorProducto = $("#valor_unitario").val();
    // const estadoProducto = $("#estadoproducto optgroup").val();
    const estadoProducto = $("#inputEstadoProducto").val();

    const textoEstadoProducto = $("#inputEstadoProducto option:selected").text();
    //  console.log(textoEstadoProducto)
    if (!idRegistro) {
        alert("Debes seleccionar un producto primero para poder Editar");
    }
    else if (!descripcionProducto || !valorProducto || !estadoProducto) {
        alert("No deben exsitir campos vacios");
        // TESTING------------------------:
        // console.log(descripcionProducto);
        // console.log(valorProducto);
        // console.log(estadoProducto);
        // console.log(textoEstadoProducto);
    } else {
        // console.log("Campos completos");
        // console.log(descripcionProducto);
        // console.log(valorProducto);
        // console.log(estadoProducto);
        // console.log(textoEstadoProducto);
        database.collection("productos").where("id", "==", idRegistro)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.id, " => ", doc.data());
                    database.collection("productos").doc(doc.id).update({
                        descripcion: descripcionProducto,
                        estado: textoEstadoProducto,
                        valor: valorProducto
                    });
                });
            }).then(()=>{$('#modalConfirmacionRegistro').modal("show")}).then(() => buscarDB(), resetCamposFormulario());
    }
});

//Función que limpia los campos del formulario de edición una vez se confirma la actualización de los datos
const resetCamposFormulario = () => {
    idRegistro = 0;
    $("#descripcion_producto").val("");
    $("#valor_unitario").val("");
    $("#inputEstadoProducto").html(``);
    $("#inputEstadoProducto").append(`              
            <option value="" selected>Seleccione un estado</option>
            <option value="1" >Disponible</option>
            <option value="2">No Disponible</option>        
      `);
};

//----------------------------------------------
//          HU14 - HU15:
//----------------------------------------------

// Carga los datos de Firestore
async function loadItems() {
    console.log("Entra LoadItems");
    listaProductos = [];
    try {
        const response = await database.collection('productos').get();
        response.forEach(function (item) {
            // console.log(item.data()); //HU_015 - Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción) Se deja linea en comentario
            listaProductos.push(item.data());
        });
        // console.log(listaProductos);
        return listaProductos;
    } catch (error) {
        console.log(error);
    }
}

/*
Botones
*/
// btnbuscar.addEventListener("click", getSearch);
btnlimpiar.addEventListener('click', (e) => {clearSearch()});
// btnConfirmar.addEventListener("click", getConfirm());

/*
Funciones que pintan en pantalla
*/
async function fmostrar(listaProductos) { //HU_014 - Integración Backend Productos - Consulta Productos
    console.log("Entra fmostrar");
    let contenido = ``;
    //listaProductos = await loadItems();
    listaProductos.forEach(element => {
        contenido += `<tr>
                        <td scope="row">${element.id}</td>
                        <td>${element.descripcion}</td>
                        <td>${element.valor}</td>
                        <td>${element.estado}</td>
                        <td><input type="button" value="Editar" id="${element.id}" class="botonEditar btn btn-dark" /></td>
                    </tr>`;
        $('#bodyTabla').html(contenido);
    });
    cargarBotones();
}

// HU_015 - INICIO Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción) Se comenta bloque de codigo y se ajusta
async function fmostrarFiltradoid(id, listaProductos) {
    console.log("Entra fmostrarFiltradoid");
    let pintarTabla = ``;
    console.log('Id consultado: ' + id);
    //listaProductos = await loadItems();

    const listaFiltrada = listaProductos.filter(
        (element) => element.id == id);
    console.log(listaFiltrada);

    if (listaFiltrada.length) {
        listaFiltrada.map(element => {
            pintarTabla += `<tr>
                            <td scope="row">${element.id}</td>
                            <td>${element.descripcion}</td>
                            <td>${element.valor}</td>
                            <td>${element.estado}</td>
                            <td><input type="button" value="Editar" id="${element.id}" class="botonEditar btn btn-dark" /></td>
                        </tr>`;
            $('#bodyTabla').html(pintarTabla);
        });
    } else {
        $('#bodyTabla').html(`<h2 class="text-danger">NO ENCONTRADO</h2>`);
    }

    cargarBotones();
}

async function fmostrarFiltrado(descripcion, listaProductos) {
    let pintarTabla = ``;
    let descrip = '';
    // $('#bodyTabla').html(pintarTabla);
    console.log('Descripcion consultada: ' + descripcion);
    // listaProductos = await loadItems();
    descripcion = descripcion.toLowerCase();
    const listaFiltrada = listaProductos.filter(
        (element) => element.descripcion.toLowerCase().includes(descripcion));

    if (listaFiltrada.length) {
        listaFiltrada.map(element => {
            pintarTabla += `<tr>
                            <td scope="row">${element.id}</td>
                            <td>${element.descripcion}</td>
                            <td>${element.valor}</td>
                            <td>${element.estado}</td>
                            <td><input type="button" value="Editar" id="${element.id}" class="botonEditar btn btn-dark" /></td>
                        </tr>`;
            $('#bodyTabla').html(pintarTabla);
        });
    } else {
        $('#bodyTabla').html(`<h2 class="text-danger">NO ENCONTRADO</h2>`);
    }

    //console.log(listaFiltrada);
    cargarBotones();
}

// HU_015 - FIN Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción) 

/*
Funcion de búsqueda
*/
/* function getSearch() {
    resetCamposFormulario();
    console.log("entra getSearch");

    let id = numId.value;
    let descripcion = strDescripcionProducto.value;
   
   
    if (id == '' && descripcion == '') {
        fmostrar();
    }
    // HU_015 - INICIO Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción)
    else if (id != '' && descripcion == '') {
        fmostrarFiltradoid(id);
    }
    else if (id == '' && descripcion != '') {
        fmostrarFiltrado(descripcion);
    }
    else if (id != '' && descripcion != '') {
        console.clear();
        fmostrarFiltradoid(id);
    }
    // HU_015 - FIN Integración  Backend Productos - Consulta Productos (Filtro Id o Descripción)

    else {
        alert(NODATA);
    }
} */

/*
Función que permite limpiar la pantalla
*/
function clearSearch() {
   
    $("#inputIdProducto").val("");
    $("#inputDescripcionProducto").val("");
     //   let pintarLabel = `<h3 align="center"></h3>`;
  
}

/*
Función que permite Editar
*/
/* function feditar(varEntrada) {
    let lblUsuariEdit = document.getElementById("usuarioeditar")
    let ajustaArr = varEntrada - 1
    let usuarioEdit = usuarios[ajustaArr]
    let pintarLabel = `<h3 align="center">Usuario: ${usuarioEdit.nombre}</h3>`
    lblUsuariEdit.innerHTML = pintarLabel
} */

/*
 Función que permite confirmar cambios
 */
/* function getConfirm() {
    console.clear()
    let estado = strEstadoConfirm.value
    let rol = strRolConfirm.value

    console.log(rol)
    console.log(estado)
    alert("Botón no configurado, lo siento!")
} */