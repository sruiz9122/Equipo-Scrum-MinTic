//   Declarar variables globales
const database = firebase.firestore();
let listaVentas = [];
let lsitaProductos = [];
// Variable para guardar el ID de la venta a editar
let idRegistro = 0;

let btnBuscar = document.getElementById("botonBuscar");
let tbxIdProducto = document.getElementById("inputIdProducto");
let tbxCantidad = document.getElementById("inputCantidad");



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
                          <td>${element.nombrecliente}</td>
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
        //  console.log(item.data());
        ventas.push(item.data());
    });
    return ventas;
};
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
btnBuscar.addEventListener("click", (e) => {
    buscarDB();
});

//Función Mostrar Id Pdroducto
const fmostrarIdProducto = async (idProductoActual) => {
    let pintarTabla = `<option value="">Seleccione un ID de producto</option>`;
    listaProductos = await leerProductos();

    listaProductos.forEach(element => {
        if (element.id == idProductoActual) {
            pintarTabla += `<option value="${element.id}" selected>${element.id}</option>`;            
        } else {
            pintarTabla += `<option value="${element.id}" >${element.id}</option>`;
        }
        tbxIdProducto.innerHTML = pintarTabla;
    });


// -------------------------calculos ------------------------------
    let pintarPrecioUnitario = ``;
    // let pintarLabel = ``;
    let pintalValTotal = ``;

    let dtIdProducto = tbxIdProducto.value;
    let dtCantidad = tbxCantidad.value;
    //console.log(dtIdProducto)
    // console.log(dtCantidad);

    // listaProductos = await leerProductos();
    listaProductos.forEach(element => {
        if (dtIdProducto == `${element.id}`) {
            //console.log(element.descripcion)
            //console.log(element.valor)
            let valTotal = (dtCantidad * element.valor);
            //console.log(valTotal)

            pintarPrecioUnitario = `<label for="inputPrecioUnitario" class="form-label">Precio Unitario/Producto</label>
                            <input type="number" placeholder="${element.valor}" class="form-control" min="0" id="inputPrecioUnitario" readonly="readonly" required> <br>`;
            // pintarLabel = `<h3 align="center">Producto: ${element.descripcion}</h3> <br>`;

            pintalValTotal = `<label for="inputValorTotal" class="form-label">Valor Total</label>
                              <input type="number" placeholder="${valTotal}" class="form-control" min="0" id="inputValorTotal" readonly="readonly" required> <br>`;

            // document.getElementById("productoventa").innerHTML = pintarLabel;
            document.getElementById("preciounitario").innerHTML = pintarPrecioUnitario;
            document.getElementById("valtotal").innerHTML = pintalValTotal;
        }
    });
};

//Función que calcula precio total de acuerdo al precio unitario de cada producto (producto del checkbox)
const fEnviaDatosCalculos = async () => {

    let pintarTabla = ``;
    // let pintarLabel = ``;
    let pintalValTotal = ``;

    let dtIdProducto = tbxIdProducto.value;
    let dtCantidad = tbxCantidad.value;
    //console.log(dtIdProducto)
    // console.log(dtCantidad);

    listaProductos = await leerProductos();
    listaProductos.forEach(element => {
        if (dtIdProducto == `${element.id}`) {
            //console.log(element.descripcion)
            //console.log(element.valor)
            let valTotal = (dtCantidad * element.valor);
            //console.log(valTotal)

            pintarTabla = `<label for="inputPrecioUnitario" class="form-label">Precio Unitario/Producto</label>
                            <input type="number" value="${element.valor}" class="form-control" min="0" id="inputPrecioUnitario" readonly="readonly" required> <br>`;
            // pintarLabel = `<h3 align="center">Producto: ${element.descripcion}</h3> <br>`;

            pintalValTotal = `<label for="inputValorTotal" class="form-label">Valor Total</label>
                              <input type="number" value="${valTotal}" class="form-control" min="0" id="inputValorTotal" readonly="readonly" required> <br>`;

            // document.getElementById("productoventa").innerHTML = pintarLabel;
            document.getElementById("preciounitario").innerHTML = pintarTabla;
            document.getElementById("valtotal").innerHTML = pintalValTotal;
        }
    });
};
tbxIdProducto.addEventListener("input", fEnviaDatosCalculos);
tbxCantidad.addEventListener("input", fEnviaDatosCalculos);

// fmostrarIdProducto()


//Función para cargar el EVENTo click a cada botón de Editar en la tabla resultado de busqueda
const cargarBotones = () => {
    $(".botonEditar").click(function (e) {        
        idRegistro = e.target.id;

        // LOGS de Testing-----------------------------------:
        // console.log(e);
        // console.log(e.target.id);
        // // console.log($(e.target).parents().eq(1)[0]);
        // // console.log($(e.target).parents().eq(1).children());
        // console.log($(e.target).parents().eq(1).children()[0].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[1].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[2].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[3].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[4].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[5].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[6].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[7].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[8].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[9].innerHTML);
        // console.log($("#estadoproducto").eq(0)[0]);
        // console.log($("#estadoproducto optgroup"));
        // console.log($("#estadoproducto optgroup").children());
        // console.log($("#estadoproducto optgroup").children()[1].innerHTML);

        const idVenta = $(e.target).parents().eq(1).children()[0].innerHTML;
        const estadoVenta = $(e.target).parents().eq(1).children()[1].innerHTML;
        const ValorTotalVenta = $(e.target).parents().eq(1).children()[2].innerHTML;
        const idProducto = $(e.target).parents().eq(1).children()[3].innerHTML;
        const cantidadProducto = $(e.target).parents().eq(1).children()[4].innerHTML;
        const precioUnitario = $(e.target).parents().eq(1).children()[5].innerHTML;
        const fechaVenta = $(e.target).parents().eq(1).children()[6].innerHTML;
        const docIdentidadCliente = $(e.target).parents().eq(1).children()[7].innerHTML;
        const nombreCliente = $(e.target).parents().eq(1).children()[8].innerHTML;
        const idVendedor = $(e.target).parents().eq(1).children()[9].innerHTML;



        $("#inputIdVenta").val(idVenta);
        // $("#inputIdProducto").val(idProducto);
        //Llamada a función que muestra el id de todos los productos
        fmostrarIdProducto(idProducto);
        //$("#inputValorTotal").val(ValorTotalVenta);
        //$("#inputPrecioUnitario").val(precioUnitario);
        //Llamado a función que calcula Valor total de la venta de acuerdo al precio del producto
        // fEnviaDatosCalculos();

        $("#inputCantidad").val(cantidadProducto);
        $("#inputFechaVenta").val(fechaVenta);
        $("#inputDocumentoIdentidadCliente").val(docIdentidadCliente);
        $("#inputNombreCliente").val(nombreCliente);
        $("#inputIdVendedor").val(idVendedor);


        $("#inputEstadoVenta").html(``);
        if (estadoVenta == "En progreso") {
            $("#inputEstadoVenta").append(`              
              <option value="">Elija un estado</option>
              <option value="1" selected>En progreso</option>
              <option value="2">Cancelada</option>   
              <option value="3">Entregada</option>`);
        } else if (estadoVenta == "Cancelada") {
            $("#inputEstadoVenta").append(`              
              <option value="">Elija un estado</option>
              <option value="1" >En progreso</option>
              <option value="2"selected>Cancelada</option>   
              <option value="3">Entregada</option>   
              `);
        } else {
            $("#inputEstadoVenta").append(`              
              <option value="">Elija un estado</option>
              <option value="1" >En progreso</option>
              <option value="2">Cancelada</option>   
              <option value="3"selected>Entregada</option>`);
        }
    });
};

//Evento asociado al boton de Confirmar Edición
$("#botonConfirmar").click((e) => {
    e.preventDefault();

    const valueIdProducto = $("#inputIdProducto option:selected").val();
    const textoIdProducto = $("#inputIdProducto option:selected").text();
    const valueEstadoVenta = $("#inputEstadoVenta option:selected").val();
    const textoEstadoVenta = $("#inputEstadoVenta option:selected").text();
    const inputValorTotal = $("#inputValorTotal").val();
    const inputPrecioUnitario = $("#inputPrecioUnitario").val();
    const inputCantidad = $("#inputCantidad").val();
    const inputFechaVenta = $("#inputFechaVenta").val();
    const inputDocumentoIdentidadCliente = $("#inputDocumentoIdentidadCliente").val();
    const inputNombreCliente = $("#inputNombreCliente").val();
    const inputIdVendedor = $("#inputIdVendedor").val();

    if (!idRegistro) {
        alert("Debes seleccionar una venta primero para poder Editar");
    }
    else if (!valueIdProducto || !valueEstadoVenta || !inputValorTotal || !inputPrecioUnitario || !inputCantidad || !inputFechaVenta || !inputDocumentoIdentidadCliente || !inputNombreCliente || !inputIdVendedor) {
        alert("No deben exsitir campos vacios");
        // TESTING------------------------:
        // console.log("valueIdProducto: ", valueIdProducto);
        // console.log("textoIdProducto: ", textoIdProducto);
        // console.log("valueEstadoVenta: ", valueEstadoVenta);
        // console.log("textoEstadoVenta: ", textoEstadoVenta);
        // console.log("inputValorTotal: ", inputValorTotal);
        // console.log("inputPrecioUnitario: ", inputPrecioUnitario);
        // console.log("inputCantidad: ", inputCantidad);
        // console.log("inputFechaVenta: ", inputFechaVenta);
        // console.log("inputDocumentoIdentidadCliente: ", inputDocumentoIdentidadCliente);
        // console.log("inputNombreCliente: ", inputNombreCliente);
        // console.log("inputIdVendedor: ", inputIdVendedor);

    } else {
        // console.log("Campos completos");
        // console.log(descripcionProducto);
        // console.log(valorProducto);
        // console.log(estadoProducto);
        // console.log(textoEstadoProducto);

        database
            .collection("ventas")
            .where("id", "==", idRegistro)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                    database.collection("ventas").doc(doc.id).update({

                        idproducto: textoIdProducto,
                        estadoventa: textoEstadoVenta,
                        valortotal: inputValorTotal,
                        preciounitarioproducto: inputPrecioUnitario,
                        cantidad: inputCantidad,
                        fechaventa: inputFechaVenta,
                        docidcliente: inputDocumentoIdentidadCliente,
                        nombrecliente: inputNombreCliente,
                        idvendedorasignado: inputIdVendedor,

                    });
                });
            })
            .then(alert("La venta fue Actualizada con éxito"))
            .then(() => buscarDB(), resetCamposFormulario());
    }
});

//Función que limpia los campos del formulario de edición una vez se confirma la actualización de los datos
const resetCamposFormulario = () => {
    idRegistro = 0;
    $("#inputIdVenta").val("");
    $("#inputIdProducto").html("");
    $("#inputIdProducto").append(``);
    $("#inputEstadoVenta").html("");
    $("#inputEstadoVenta").append(`              
        <option value="" selected>Elija un estado</option>
              <option value="1" >En progreso</option>
              <option value="2">Cancelada</option>   
              <option value="3">Entregada</option>       
       `);
    $("#inputValorTotal").val("");
    $("#inputPrecioUnitario").val("");
    $("#inputCantidad").val("");
    $("#inputFechaVenta").val("");
    $("#inputDocumentoIdentidadCliente").val("");
    $("#inputNombreCliente").val("");
    $("#inputIdVendedor").val("");
};
