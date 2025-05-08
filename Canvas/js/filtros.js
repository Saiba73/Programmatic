let datosOriginales; 

function Filtros(opcionfil) {
    const datosImagen = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    if (!datosOriginales) {
        datosOriginales = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    for (let i = 0; i < datosImagen.data.length; i++) {
        datosImagen.data[i] = datosOriginales.data[i];
    }

    switch (opcionfil) {
        case "rojo":
            aumentarRojo(datosImagen.data);
            break;
        case "azul":
            aumentarAzul(datosImagen.data);
            break;
        case "verde":
            aumentarVerde(datosImagen.data);
            break;
        case "negativo":
            negativo(datosImagen.data);
            break;
        case "sepia":
            sepia(datosImagen.data);
            break;
        case "blancoYnegro":
            blancoYnegro(datosImagen.data);
            break;
        case "brillo":
            const rangoBrillo = document.getElementById("rango-brillo").value;
            brillo(datosImagen.data, rangoBrillo);
            break;
        case "opacidad":
            const rangoOpacidad = document.getElementById("rango-opacidad").value;
            opacidad(datosImagen.data, rangoOpacidad);
            break;
    }

    
    ctx.putImageData(datosImagen, 0, 0);
}

function negativo(datos){
    console.log("negativo");
    for(let i = 0; i < datos.length; i+=4){
        datos[i] = 255 - datos[i];//rojo

        datos[i + 1] = 255 - datos[i + 1]; //verde
        datos[i + 2] = 255 - datos[i + 2]; //azul
    }
}

function aumentarRojo(datos){
    console.log("rojo");
    for (let i = 0; i < datos.length; i+=4 ){
        //aumentar el rojo en 10
        datos[i] = Math.min(datos[i] + 255, 255);

        //mantener los demas colores
        datos[i+1] = datos[i+1];
        datos[i+2] = datos[i+2];
    }
}
function aumentarVerde(datos){
    console.log("verde");
    for(let i=0; i < datos.length; i+=4){
        datos[i] = datos[i];
        datos[i+2] = datos[i+2];
        datos[i+1] = Math.min(datos[i+1] + 255,255);
    }
}
function aumentarAzul(datos){
    console.log("azul");
    for( let i = 0; i < datos.length; i+=4){
        datos[i] = datos[i];
        datos[i+1] = datos[i+1];
        datos[i+2] = Math.min(datos[i+2] + 255, 255);
    }
}

function sepia(datos){
    console.log("Sepia");
    for( let i = 0; i < datos.length; i+=4){
        var lum = .3 * datos[i] + .6 * datos[i+1] + .1 * datos[i+2];
        datos[i] = Math.min(lum + 40, 255);
        datos[i+1] = Math.min(lum + 15, 255);
        datos[i+2] = lum;
    }
}

function blancoYnegro(datos){
    console.log("blanco y negro");
    for(let i = 0; i < datos.length; i += 4){
        let promedio = (datos[i] + datos[i + 1] + datos[i + 2]) / 3;
        datos[i] = promedio;       // rojo
        datos[i + 1] = promedio;   // verde
        datos[i + 2] = promedio;   // azul
    }
}


function brillo(datos, rangoBrillo){
    console.log("brillo");
    const brilloValor = rangoBrillo / 100;
    console.log(rangoBrillo);
    for(let i = 0; i < datos.length; i += 4){
        datos[i] = Math.min(255, datos[i] * brilloValor);       // rojo
        datos[i + 1] = Math.min(255, datos[i+1] * brilloValor);   // verde
        datos[i + 2] = Math.min(255, datos[i+2] * brilloValor)   // azul
    }
}

function opacidad(datos, rangoOpacidad){
    console.log("opacidad");
    for(let i = 0; i < datos.length; i += 4){
        // console.log(datos[i+4]);
        datos[i+3] = rangoOpacidad;
    }
}