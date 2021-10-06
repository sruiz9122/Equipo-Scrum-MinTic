import { app } from "./configDB";

let strDescPrd = document.getElementById("inputDescripcionProducto")
let numValor = document.getElementById("inputValorUnitarioProducto")
let strEstado = document.getElementById("inputEstadoProducto")

let boton = document.getElementById('botonRegistrarProducto');

boton.addEventListener("click", datosEntrada)

//--Función de escritura
function writeProductData(descProd, valorUni, estado) {
    const db = getFirestore(app);
    set(ref(db, 'productos/'), {
        descripcion: descProd,
        valor: `$ ${valorUni}`,
        estado: estado
    });
}

function datosEntrada() {
    console.clear()

    let descProd = strDescPrd.value
    let valorUni = numValor.value
    let estado = strEstado.value

    if (estado == 1) {
        estado = `Disponible`
    } else if (estado == 2) {
        estado = `No Disponible`
    }


    console.log(descProd, `$ ${valorUni}`, estado)

    writeProductData(descProd, valorUni, estado)
}

//boton.click();
// boton.click()==undefined ?console.log("es undefined") : console.log("Falso")
/*if(boton.onclick){
    alert("click con datos");
}*/
//boton.onclick = () => { console.log("click", datosEntrada); }


