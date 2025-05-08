/*/ Dibujar una línea
ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 50);
    ctx.stroke();*/
      
    
    canvasVacio = ctx.getImageData(0,0,canvas.width, canvas.height);
    historial.push(canvasVacio);

function alHacerClick(event){
    posicionesCursor[0] = {
            x: event.offsetX,
            y: event.offsetY
        }
    iniciarTrazo = true;    
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);

    console.log(ObjetosCreados);
    if(opcion == 8){
        console.log("Opcion 8");
        ctx.putImageData(snapshot, 0, 0);
        for (let i = 0; i<ObjetosCreados.length; i++)
            {
                console.log("Entre for y if")
                if ((ObjetosCreados[i].Id == 1 && event.offsetX >= ObjetosCreados[i].x && //Cuadro
                    event.offsetX <= ObjetosCreados[i].x + ObjetosCreados[i].ancho &&
                    event.offsetY >= ObjetosCreados[i].y && 
                    event.offsetY <= ObjetosCreados[i].y + ObjetosCreados[i].alto)) 
                    {
                        console.log("Nueva Opcion");
                        ObjetosCreados[i].Borrador();
                        snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
                        ObjetoActual = ObjetosCreados[i];
                        ObjetosCreados.pop();
                        console.log("Objeto Actual SDFDSVDRWRWFDFS");
                        console.log(ObjetoActual);
                        console.log("arreglo");
                        console.log(ObjetosCreados);
                        console.log("historial");
                        console.log(historial);
                }
                else if((ObjetosCreados[i].Id == 2 && event.offsetX >= ObjetosCreados[i].x - ObjetosCreados[i].radius && // Circulo
                    event.offsetX <= ObjetosCreados[i].x + ObjetosCreados[i].radius && 
                    event.offsetY >= ObjetosCreados[i].y - ObjetosCreados[i].radius && 
                    event.offsetY <= ObjetosCreados[i].y + ObjetosCreados[i].radius))
                {
                        ObjetosCreados[i].Borrador();
                        snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);                   
                        ObjetoActual = ObjetosCreados[i];
                        ObjetosCreados.pop();
                }
                else if((ObjetosCreados[i].Id == 3 && // triangulo
                    event.offsetX <= ObjetosCreados[i].x2 &&
                    event.offsetX >= (ObjetosCreados[i].x * 2 - ObjetosCreados[i].x2) &&
                    event.offsetY >= ObjetosCreados[i].y &&
                    event.offsetY <= ObjetosCreados[i].y2
                ) || (ObjetosCreados[i].Id == 3 && // triangulo
                    event.offsetX <= ObjetosCreados[i].x2 &&
                    event.offsetX >= (ObjetosCreados[i].x * 2 - ObjetosCreados[i].x2) &&
                    event.offsetY <= ObjetosCreados[i].y &&
                    event.offsetY >= ObjetosCreados[i].y2
                ))
                {
                        ObjetosCreados[i].Borrador();
                        snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);                   
                        ObjetoActual = ObjetosCreados[i];
                        ObjetosCreados.pop();
                }
                else if((ObjetosCreados[i].Id == 4 && // Sticker
                     event.offsetX >= ObjetosCreados[i].x && 
                     event.offsetX >= ObjetosCreados[i].x - ObjetosCreados[i].ancho &&
                     event.offsetY >= ObjetosCreados[i].y &&
                     event.offsetX <= ObjetosCreados[i].y + ObjetosCreados[i].alto)) 
                {
                    ObjetosCreados[i].Borrador();
                    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
                    ObjetoActual = ObjetosCreados[i];
                    ObjetosCreados.pop();
                }
                else
                {
                    console.log("No agarro nada");
                }
        }
        
    }
}



function move(event){ 
    if(iniciarTrazo && opcion==4){ //Pincel
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 15*(rangoImagen.value/100);
        ctx.moveTo(posicionesCursor[0].x, posicionesCursor[0].y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = colorlinea.value;
        ctx.stroke();
    
        posicionesCursor[0]={
            x: event.offsetX,
            y: event.offsetY 
        }
    }
    else if(iniciarTrazo && opcion==6){ //Borrador
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 50*(rangoImagen.value/100);
        ctx.moveTo(posicionesCursor[0].x, posicionesCursor[0].y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = "white";
        ctx.stroke();
    
        posicionesCursor[0]={
            x: event.offsetX,
            y: event.offsetY 
        }
    }
    else if(iniciarTrazo && opcion==2){ //Cuadro
        ctx.putImageData(snapshot, 0, 0);

        let nuevoRectangulo = new Rectangulo(1, posicionesCursor, colorlinea.value, colorrelleno.value, 15, rangoImagen.value, event);
        nuevoRectangulo.Dibujar(event);
        nuevoRectangulo.ImprimirDatos();

        console.log("Si llamo al cuadro");
        UltimoObjeto = nuevoRectangulo;
    }
    else if(iniciarTrazo && opcion==1){ //Circulo
        console.log("Si llamo al circulo");
        ctx.putImageData(snapshot, 0, 0);

        let nuevoCirculo = new Circulo(2, posicionesCursor, colorlinea.value, colorrelleno.value, 15, rangoImagen.value, event)
        nuevoCirculo.Dibujar(event)

        console.log("Si llamo al circle");
        UltimoObjeto = nuevoCirculo;
    }
    else if(iniciarTrazo && opcion==7){ //Triangulo
        ctx.putImageData(snapshot, 0, 0);
        let nuevoTriangulo = new Triangulo(3, posicionesCursor , colorlinea.value, colorrelleno.value, 15, rangoImagen.value, event);
        nuevoTriangulo.Dibujar(event);

        console.log("Si llamo al triangle");
        UltimoObjeto = nuevoTriangulo;
    }
    else if(iniciarTrazo && opcion==5){ //Linea recta
        ctx.putImageData(snapshot, 0, 0);
        let nuevaLinea = new LineaRecta(1, posicionesCursor, colorlinea.value, 15, rangoImagen.value);
        nuevaLinea.Dibujar(event);
    }
    else if(opcion == 3){ //sticker
        if(historial.length == 1 && bandera == 0)
            {
                snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
                bandera++;
                if(historial.length > 1)
                    {
                        bandera = 0;
                    }
            }
            ctx.putImageData(snapshot, 0, 0);
            sticker = new Sticker(4, sticker_url, event.offsetX, event.offsetY, rangoImagen.value);
            sticker.Dibujar();
            

            console.log("Si llamo al sticker");
            UltimoObjeto = sticker;
    }
    else if(opcion == 8)
        {
            if(ObjetoActual != null){
                let mouseX = event.offsetX;
                let mouseY = event.offsetY;
                                
                ctx.putImageData(snapshot, 0, 0);                
                                
                // ObjetoActual.x = e.clientX;
                // ObjetoActual.y = e.clientY;
                if(ObjetoActual.Id == 4)
                {
                    console.log("DIBUJAR 3");
                    ObjetoActual.Dibujar3(mouseX,mouseY);
                }
                else
                {
                    ObjetoActual.Dibujar2(mouseX, mouseY);
                }
                
                }
        }
}

function leave(){
    iniciarTrazo = false;
}

function alSoltarClick(event){
    posicionesCursor[1] = {
            x: event.offsetX,
            y: event.offsetY,
            
        }
    iniciarTrazo = false;    
        
    console.log(posicionesCursor[0]);
    console.log(posicionesCursor[1]);
    if(opcion == 8 && ObjetoActual != null)
        {
            
            // ctx.putImageData(historial[historial.length]);
            // ctx.putImageData(snapshot, 0, 0);
             //ObjetoActual.Dibujar2(event.offsetX, event.offsetY);
            ObjetosCreados.push(ObjetoActual);
            
            console.log(ObjetosCreados);
            ObjetoActual = null;
        }
}


//Selecionar Opcion----------------------------------------------------------------------------------------------------------------------------------------------------
function SeleccionarOpcion(opcionUsuario){
    if(opcionUsuario == opciones[0]){
        opcion = 1;
        console.log(opcion);
        console.log(opciones[0]);
    }
    if(opcionUsuario == opciones[1]){
        opcion = 2;
        console.log(opcion);
        console.log(opciones[1]);
    }
    if(opcionUsuario == opciones[2]){
        opcion = 3;
        console.log(opcion);
        console.log(opciones[2]);
    }
    if(opcionUsuario == opciones[3]){
        opcion = 4;
        console.log(opcion);
        console.log(opciones[3]);
    }
    if(opcionUsuario == opciones[4]){
        opcion = 5;
        console.log(opcion);
        console.log(opciones[4]);
    }
    if(opcionUsuario == opciones[5]){
        opcion = 6;
        console.log(opcion);
        console.log(opciones[5]);
    }
    if(opcionUsuario == opciones[6]){
        opcion = 7;
        console.log(opcion);
        console.log(opciones[6]);
    }
    if(opcionUsuario == opciones[7]){
        opcion = 8;
        console.log(opcion);
        console.log(opciones[7]);
    }
    if(opcionUsuario == opciones[8])
    {
        opcion = 9;
        console.log(opcion);
        console.log(opciones[8]);
    }
}


function DibujarFigura(event){

    console.log(event.offsetX);
    console.log(event.offsetY);
    
    if(opcion === 1){
        console.log("Dibujando circulo");
        ObjetosCreados.push(UltimoObjeto);
    }
    if(opcion === 2 ){
        console.log("Dibujando cuadrado");
        ObjetosCreados.push(UltimoObjeto);
    }
    if(opcion === 3){
        console.log("Dibujar Imagen");
        ObjetosCreados.push(UltimoObjeto);
    }
    if(opcion === 4){
        console.log("dibujar con el pincel");
    }
    if(opcion === 5){
        console.log("dibuja una linea");
    }
    if(opcion === 6){
        console.log("borrador");
    }
    if(opcion === 7){
        console.log("triangulo");
        ObjetosCreados.push(UltimoObjeto);
    }
    if(opcion == 8)
    {
        
    }
    guardarCambio(ctx.getImageData(0,0,canvas.width, canvas.height));
    contadord++;
    console.log(contadord);
}


//Cargar imagen para sticker----------------------------------------------------------------------------------------------------------------------------------------------------
function cargarImagen(event){
    let imgUrl;
    if(event.target.files[0]){
        console.log(event.target.files[0].type);
        if(event.target.files[0].type === "image/png" || "image/jpg"){
            const reader = new FileReader();
            reader.onload = (event) => {
                imgUrl = event.target.result;
                prev_sticker.style.backgroundImage = `Url(${imgUrl})`;
                sticker_url = imgUrl;
                console.log(imgUrl);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}


//Funciones Drag and Drop----------------------------------------------------------------------------------------------------------------------------------------------------
canvas.addEventListener("dragover", (event)=>{
    event.preventDefault();
});
canvas.addEventListener('drop',(event)=>{
    console.log("hace drop");
    sticker = new Sticker(4, sticker_url, event.offsetX, event.offsetY, canvas.width, canvas.height);
    sticker.Dibujar2(canvas.width, canvas.height);
    guardarCambio(ctx.getImageData(0,0,canvas.width, canvas.height));
    contadord++;
    console.log(contadord);
    UltimoObjeto = sticker;
    ObjetosCreados.push(UltimoObjeto);
})


//Funcion de Brillo----------------------------------------------------------------------------------------------------------------------------------------------------
// rangoBrillo.addEventListener("input", (e) => {
//     const brilloValor = e.target.value;
//     canvas.style.filter = `brightness(${brilloValor}%)`;
// });


 

