var arrayLibros = [];


function totalDias (){
    let calcTotDias = 0;
  let cantidadSubtotal = parseInt(document.getElementsByClassName("totalisimo").innerHTML);
for (let i=0; i< cantidadSubtotal.length; i++) {
  calcTotDias += cantidadSubtotal[i].innerHTML;
}
document.getElementById("totDias").innerHTML = calcTotDias;
}

function calcSubtotal (dias, i){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = cantidad * dias;
    document.getElementById(`libroSubtotal${i}`).innerHTML = subTot;
}

function showLibros (array){

    let resultado= "";

    for (let i=0; i < array.length; i++){

        let libros = array[i];

        let subT = libros.dias * libros.cantidad;

        resultado +=
        `
        <tr>
        <td><img src='${libros.img}' width="40px"></td>

        <td>${libros.titulo}</td>

        <td>${libros.dias}</td>

        <td><input style="width:60px;" onchange="calcSubtotal(${libros.dias}, ${i})"
        type="number" id="cantidad${i}" value="${libros.cantidad}" min="1"></td>

        <td><span id="libroSubtotal${i}" class="totalisimo" style="font-weight:bold;">${subT}</span></td>

        </tr>
        `

        document.getElementById("lista").innerHTML = resultado;
    }
    totalDias ();
}

function calcEnvio (){
    let total = parseInt(document.getElementById("totDias").innerHTML);
    let envio;

    let boton = document.getElementsByName("envio");

    for (let i=0; i<boton.length; i++){

        if (boton[i].checked){
            envio = parseInt(boton[i].value);
        }

    }

    let calcEnvioTotal = total + envio ;
    let datos = `
    <tr>

    <td>${total}</td>
    <td>${envio}</td>
    <td>${calcEnvioTotal}</td>
    
    </tr>
    
    `
    document.getElementById("calculoEnvio") = datos;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRESTAMO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayLibros = resultObj.data.libros;
        

            showLibros(arrayLibros);
        }
    });

});