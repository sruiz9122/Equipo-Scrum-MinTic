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
    try {
        listaProductos = await leerProductos();
        pintarBrowser(listaProductos);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

//Función para pintar la tabla de resultados de búsqueda
function pintarBrowser(elementos) {    
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
    /* contendorTarea.innerHTML = contenidoHtml; */
}

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
                <option value="">Seleccione</option>
                <option value="1" selected>Disponible</option>
                <option value="2">No Disponible</option>        
          `) :
            $("#inputEstadoProducto").append(`      
      
            <option value="">Seleccione</option>
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
    if (!descripcionProducto || !valorProducto || !estadoProducto) {
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
    }


    database.collection("productos").where("id", "==", idRegistro)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                database.collection("productos").doc(doc.id).update({
                    descripcion: descripcionProducto,
                    estado: textoEstadoProducto,
                    valor: valorProducto
                });
            });
        }).then(alert("Actulizado con éxito")).then(() => buscarDB(),resetCamposFormulario());

});

//Función que limpia los campos del formulario de edición una vez se confirma la actualización de los datos
const resetCamposFormulario = () => {
    $("#descripcion_producto").val("");
    $("#valor_unitario").val("");
    $("#inputEstadoProducto").html(``);
    $("#inputEstadoProducto").append(`              
            <option value="" selected>Seleccione</option>
            <option value="1" >Disponible</option>
            <option value="2">No Disponible</option>        
      `) 
};