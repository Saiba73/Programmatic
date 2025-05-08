function guardarCambio(canvas){
    console.log("guardando cambios");
    historial.push(canvas);
    console.log(historial.length);
}
function redibujarCanvas(nuevoCanvas){
    if(historial.length < 0){
        ctx.putImageData(canvasVacio, 0, 0);
    }
    else{
        ctx.putImageData(nuevoCanvas, 0, 0);
    }
}
function rehacerCambio(){
    if(historial2.length > 0){
        let cambioTemporal = historial2.pop();
        historial.push(cambioTemporal);
        redibujarCanvas(cambioTemporal);
        contadord++;  
    }
}
function deshacerCambio(){
    if(historial.length === 1){
        console.log("no hace nada");
    }
    else if(historial.length > 0){
        historial2.push(historial.pop());
        let cambioTemporal = historial.length > 0 ? historial[historial.length - 1] : canvasVacio;
        redibujarCanvas(cambioTemporal);
        contadord--;
    }
}
window.addEventListener("load", () => {
    setCanvasBackground();
})

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = colorlinea.value;
}
function guardarImagen() {
    const nombreArchivo = document.getElementById("nombre-archivo").value || Date.now(); 
    const tipoArchivo = document.getElementById("tipo-archivo").value;
    
    const link = document.createElement("a");
    link.download = `${nombreArchivo}.${tipoArchivo}`;
    link.href = canvas.toDataURL(`image/${tipoArchivo}`);
    link.click();
}