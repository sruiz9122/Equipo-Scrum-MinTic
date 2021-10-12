//   Declarar variables globales
const database = firebase.firestore();
let listaUsuarios = [];
// Variable para guardar el ID delusuario
let idRegistro = 0;


let btnbuscar = document.getElementById("botonBuscarUsuario");


let btnlimpiar = document.getElementById("botonLimpiarBusqueda");
let strEstadoConfirm = document.getElementById("edicionEstado");
let btnConfirmar = document.getElementById("botonConfirmar");
const NODATA = "No se encuentran datos";

//Función que busca y e implementa pintar en pantalla la tabla con los resultados de búsqueda
const buscarDB = async () => {
  try {
    listaUsuarios = await leerUsuarios();
    pintarBrowser(listaUsuarios);
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
                        <td>${element.nombre}</td>
                        <td>${element.correo}</td>
                        <td>${element.rol}</td>
                        <td>${element.estado}</td>
                        <td><input type="button" value="Editar" id="${element.id}" class="botonEditar btn btn-dark" /></td>
                    </tr>`;
    $("#bodyTabla").html(contenido);
  });

  cargarBotones();
  /* contendorTarea.innerHTML = contenidoHtml; */
}

//Base de datos--------------------------------
//Función que hace un GetAll de todos los registros
const leerUsuarios = async () => {
  const usuarios = [];
  const respuesta = await database.collection("usuarios").get();
  respuesta.forEach(function (item) {
    // console.log(item.data());
    usuarios.push(item.data());
  });
  return usuarios;
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

    
    console.log($(e.target).parents().eq(1).children()[3].innerHTML);
    console.log($(e.target).parents().eq(1).children()[4].innerHTML);
   

    const rolUsuario = $(e.target).parents().eq(1).children()[3].innerHTML;
    const estadoUsuario = $(e.target).parents().eq(1).children()[4].innerHTML;

    $("#rolUsuario").html(``);
    rolUsuario == "Administrador"
      ? $("#rolUsuario").append(`              
                <option value="">Seleccione Rol</option>
                <option value="1" selected>Administrador</option>
                <option value="2">Vendedor</option>        
          `)
      : $("#rolUsuario").append(`              
            <option value="">Seleccione Rol</option>
            <option value="1" >Administrador</option>
            <option value="2"selected>Vendedor</option>     
          `);

    $("#estadoUsuario").html(``);
    if (estadoUsuario == "Pendiente") {
      $("#estadoUsuario").append(`              
            <option value="">Seleccione Estado</option>
            <option value="1" selected>Pendiente</option>
            <option value="2">Autorizado</option>   
            <option value="3">No Autorizado</option>  `);
    } else if (estadoUsuario == "Autorizado") {
      $("#estadoUsuario").append(`              
            <option value="">Seleccione Estado</option>
            <option value="1" >Pendiente</option>
            <option value="2"selected>Autorizado</option>   
            <option value="3">No Autorizado</option>   
            `);
    } else {
      $("#estadoUsuario").append(`              
            <option value="">Seleccione Estado</option>
            <option value="1" >Pendiente</option>
            <option value="2">Autorizado</option>   
            <option value="3"selected>No Autorizado</option>     `);
    }
  });
};

//Evento asociado al boton de Confirmar Edición
$("#botonConfirmar").click((e) => {
  e.preventDefault();

  const estadoUsuario = $("#estadoUsuario").val();
  const textoEstadoUsuario = $("#estadoUsuario option:selected").text();

  const rolUsuario = $("#rolUsuario").val();
  const textoRolUsuario = $("#rolUsuario option:selected").text();
  //  console.log(textoEstadoProducto)
  if (!estadoUsuario || !rolUsuario) {
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

  database
    .collection("usuarios")
    .where("id", "==", idRegistro)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        database.collection("usuarios").doc(doc.id).update({
          rol: textoRolUsuario,
          estado: textoEstadoUsuario,
          
        });
      });
    })
    .then(alert("EL usuario fue Actualizado con éxito"))
    .then(() => buscarDB(), resetCamposFormulario());
});

//Función que limpia los campos del formulario de edición una vez se confirma la actualización de los datos
const resetCamposFormulario = () => {
  
  $("#estadoUsuario").append(`              
            <option value="" selected>Seleccione Estado</option>
            <option value="1" >Pendiente</option>
            <option value="2">Autorizado</option>   
            <option value="3">No Autorizado</option>       
      `);
      $("#rolUsuario").append(`              
      <option value=""selected>Seleccione Rol</option>
      <option value="1" >Administrador</option>
      <option value="2">Vendedor</option>           
      `);
};
