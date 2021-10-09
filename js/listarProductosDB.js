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
        contenido += `<tr><th scope="row">${element.id}</th><th>${element.descripcion}</th><th>${element.valor}</th><th>${element.estado}</th><th><input type="button" value="Editar" id="teditar" class="btn btn-dark" /></th></tr>`;
        $('#bodyTabla').html(contenido);
    });
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
btnLogin.addEventListener('click', (e) => {
    login();
    // console.dir(btnLogin);
    btnLogin.classList.add('hidden');
    btnLogOut.classList.remove('hidden');
    formulario.classList.remove('hidden');

});
// Logout
btnLogOut.addEventListener('click', (e) => {
    logOut();
    btnLogin.classList.remove('hidden');
    btnLogOut.classList.add('hidden');
    formulario.classList.add('hidden');
});

// formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(input.value);
    const texto = input.value;
    if (texto !== "") {
        adicionarTarea(texto);
    }
});