/*canvas.onmousedown = function(e) {
    for (let i = 0; i<ObjetosCreados.length; i++) {
        if(ObjetosCreados[i].x < e.clientX && ObjetosCreados[i].ancho + ObjetosCreados[i].x > e.clientX){
            ObjetoActual = ObjetosCreados[i];
            break;
        }
    }
};

canvas.onmousemove = function(e) {
    ctx.putImageData(snapshot, 0, 0);
    if(ObjetoActual != null){
        ObjetoActual.x = e.clientX;
        ObjetoActual.y = e.clientY;
        ObjetoActual.Dibujar();
    }
};

canvas.onmouseup = function(e) {
    ObjetoActual = null;
}*/