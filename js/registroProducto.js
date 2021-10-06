

let boton = document.getElementById('botonRegistrarProducto');
        //boton.click();
       // boton.click()==undefined ?console.log("es undefined") : console.log("Falso")
        /*if(boton.onclick){
            alert("click con datos");
        }*/
        boton.onclick = () => {console.log("click");}