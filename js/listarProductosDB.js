//   Declarar variables globales
// const auth = firebase.auth()
// const proveedor = new firebase.auth.GoogleAuthProvider()
const database = firebase.firestore();
// let usuarioActual;
let listaProductos = [];

// Variables DOM
//ejemplo profe
const btnLogin = document.getElementById('button-login');
const btnLogOut = document.getElementById('button-logout');
const formulario = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const contendorTarea = document.getElementById('todos-container');

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

async function login() {
    try {
        const respuesta = await auth.signInWithPopup(proveedor);
        console.log(respuesta.user.displayName);
        usuarioActual = respuesta.user;

        listaTareas = await leerTareas();

        pintarBrowser(listaTareas);

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

const buscarDB = async () => {
    try {
        listaProductos = await leerProductos();
        pintarBrowser(listaProductos);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

function logOut() {
    auth.signOut();
}

async function adicionarTarea(texto) {
    const tarea = {
        id: uuid.v4(),
        tarea: texto,
        completada: false,
        user: usuarioActual.displayName
    };
    const respuesta = await guardarTarea(tarea);
    console.log(respuesta);
    input.value = '';
    // console.log(database.collection('lista-tareas').add(tarea))
    listaTareas = await leerTareas();
    pintarBrowser(listaTareas);
}

function pintarBrowser(elementos) {
    // contendorTarea
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

// Base de datos
async function guardarTarea(task) {
    try {
        const respuesta = await database.collection('lista-tareas').add(task);
        return respuesta;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function leerTareas() {
    const tareas = [];
    const respuesta = await database.collection('lista-tareas').get();
    respuesta.forEach(function (item) {
        // console.log(item.data());
        tareas.push(item.data());
    });
    return tareas;
}

//DB Propios
const leerProductos = async () => {
    const productos = [];
    const respuesta = await database.collection('productos').get();
    respuesta.forEach(function (item) {
        // console.log(item.data());
        productos.push(item.data());
    });
    return productos;
};

// Eventos
//Buscar(listar)
btnbuscar.addEventListener('click', (e) => {
    buscarDB();
});

// Login
// btnLogin.addEventListener('click', (e) => {
//     login();
//     // console.dir(btnLogin);
//     btnLogin.classList.add('hidden');
//     btnLogOut.classList.remove('hidden');
//     formulario.classList.remove('hidden');

// });
// Logout
// btnLogOut.addEventListener('click', (e) => {
//     logOut();
//     btnLogin.classList.remove('hidden');
//     btnLogOut.classList.add('hidden');
//     formulario.classList.add('hidden');
// });

// formulario
// formulario.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log(input.value);
//     const texto = input.value;
//     if (texto !== "") {
//         adicionarTarea(texto);
//     }
// });


let idRegistro = 0;

const cargarBotones = () => {

    $(".botonEditar").click(function (e) {
        //Obtenemos hijos del padre <div> desde el target
        //console.log("hiciste click");
        // console.log(e);
        // console.log(e.target.id);
        idRegistro = e.target.id;
        // console.log($(e.target).parents().eq(1)[0]);
        // console.log($(e.target).parents().eq(1).children());
        // console.log($(e.target).parents().eq(1).children()[1].innerHTML);
        // console.log($(e.target).parents().eq(1).children()[3].innerHTML);

        // console.log($("#estadoproducto"));
        // console.log($("#estadoproducto").eq(0));
        // console.log($("#estadoproducto").eq(0)[0]);

        // console.log($("#estadoproducto optgroup"));
        // console.log($("#estadoproducto optgroup").children());
        // console.log($("#estadoproducto optgroup").children()[1].innerHTML);


        const descripcionProducto = $(e.target).parents().eq(1).children()[1].innerHTML;
        const valorProducto = $(e.target).parents().eq(1).children()[2].innerHTML;
        const estadoProducto = $(e.target).parents().eq(1).children()[3].innerHTML;


        // console.log($("#descripcion_producto"))

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
        console.log(descripcionProducto);
        console.log(valorProducto);
        console.log(estadoProducto);
        console.log(textoEstadoProducto);
    } else {
        console.log("Campos completos");
        console.log(descripcionProducto);
        console.log(valorProducto);
        console.log(estadoProducto);
        console.log(textoEstadoProducto);
    }



    database.collection("productos").where("id", "==", idRegistro)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                // Build doc ref from doc.id
                database.collection("productos").doc(doc.id).update({
                    descripcion: descripcionProducto,
                    estado: textoEstadoProducto,
                    valor: valorProducto
                });
            });
        }).then(alert("Actulizado con éxito")).then(() => buscarDB(),resetCamposFormulario());

});

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