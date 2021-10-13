//   Declarar variables globales
const database = firebase.firestore();
let listaProductos = [];
// Variable para guardar el ID de la venta a editar
let idRegistro = 0;

let buscar = document.getElementById("buscar");

//Función que busca y e implmeenta pintar en pantalla la tabla con los resultados de búsqueda
const buscarDB = async () => {
    try {
        listaVentas = await leerVentas();
        pintarBrowser(listaVentas);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

//Función para pintar la tabla de resultados de búsqueda
function pintarBrowser(elementos) {
    // console.log(elementos);
    let contenido = ``;
    elementos.forEach((element) => {
        contenido += `<tr>
                          <td scope="row">${element.id}</td>
                          <td>${element.estadoventa}</td>
                          <td>${element.valortotal}</td>
                          <td>${element.idproducto}</td>
                          <td>${element.cantidad}</td>
                          <td>${element.preciounitarioproducto}</td>
                          <td>${element.fechaventa}</td>
                          <td>${element.docidcliente}</td>
                          <td>${element.idvendedorasignado}</td>
                          <td><input type="button" value="Editar" id="${element.id}" class="botonEditar btn btn-dark" /></td>
                      </tr>`;
        $("#bodyTabla").html(contenido);
    });

    cargarBotones();
    /* contendorTarea.innerHTML = contenidoHtml; */
}

//Base de datos--------------------------------
//Función que hace un GetAll de todos los registros
const leerVentas = async () => {
    const ventas = [];
    const respuesta = await database.collection("ventas").get();
    respuesta.forEach(function (item) {
        // console.log(item.data());
        ventas.push(item.data());
    });
    return ventas;
};

// Eventos---------------------------------------
//Evento Buscar(listar)
btnbuscar.addEventListener("click", (e) => {
    buscarDB();
});

//Función para cargar información al formularoi de edición
const cargarBotones = () => {
    $(".botonEditar").click(function (e) {
        idRegistro = e.target.id;

        // LOGS de Testing-----------------------------------:
        // console.log(e);
        // console.log(e.target.id);
        // // console.log($(e.target).parents().eq(1)[0]);
        // // console.log($(e.target).parents().eq(1).children());
        console.log($(e.target).parents().eq(1).children()[3].innerHTML);
        console.log($(e.target).parents().eq(1).children()[4].innerHTML);
        // console.log($("#estadoproducto").eq(0)[0]);
        // console.log($("#estadoproducto optgroup"));
        // console.log($("#estadoproducto optgroup").children());
        // console.log($("#estadoproducto optgroup").children()[1].innerHTML);

        //const rolUsuario = $(e.target).parents().eq(1).children()[3].innerHTML;
        //const estadoUsuario = $(e.target).parents().eq(1).children()[4].innerHTML;

        // $("#rolUsuario").val(rolUsuario);
        // $("#valor_unitario").val(valorProducto);
        // $("#rolUsuario").html(``);
        // rolUsuario == "Administrador"
        //     ? $("#rolUsuario").append(`              
        //           <option value="">Seleccione Rol</option>
        //           <option value="1" selected>Administrador</option>
        //           <option value="2">Vendedor</option>        
        //     `)
        //     : $("#rolUsuario").append(`              
        //       <option value="">Seleccione Rol</option>
        //       <option value="1" >Administrador</option>
        //       <option value="2"selected>Vendedor</option>     
        //     `);

        // $("#estadoUsuario").html(``);
        // if (estadoUsuario == "Pendiente") {
        //     $("#estadoUsuario").append(`              
        //       <option value="">Seleccione Estado</option>
        //       <option value="1" selected>Pendiente</option>
        //       <option value="2">Autorizado</option>   
        //       <option value="3">No Autorizado</option>  `);
        // } else if (estadoUsuario == "Autorizado") {
        //     $("#estadoUsuario").append(`              
        //       <option value="">Seleccione Estado</option>
        //       <option value="1" >Pendiente</option>
        //       <option value="2"selected>Autorizado</option>   
        //       <option value="3">No Autorizado</option>   
        //       `);
        // } else {
        //     $("#estadoUsuario").append(`              
        //       <option value="">Seleccione Estado</option>
        //       <option value="1" >Pendiente</option>
        //       <option value="2">Autorizado</option>   
        //       <option value="3"selected>No Autorizado</option>     `);
        // }
    });
};