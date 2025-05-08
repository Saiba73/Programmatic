const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const opciones = ["cirulo", "cuadrado", "imagen", "pincel","linea","borrador","triangulo","SMART"];
const prev_sticker = document.querySelector("#sticker-prev");
const rangoImagen = document.querySelector("#rango-imagen");
let opcion;
let sticker_url;
let posicionesCursor = [[],[]];
let iniciarTrazo = false;
let historial = [];
let canvasVacio;
let historial2 = [];
let colorlinea = document.querySelector("#seleccionar-color-linea"); 
let colorrelleno = document.querySelector("#seleccionar-color-relleno");
let snapshot;
let contadord = 0;
let GuardarImg = document.querySelector("#BotonGuardar");
let rangoBrillo = document.querySelector("#rango-brillo");
let rangoOpacidad = document.querySelector("#rango-opacidad");
let ObjetosCreados = [];
let ObjetoActual;
let UltimoObjeto;
let bandera = 0;

class Rectangulo {
     constructor(id, posicionesCursor , colorlinea, colorrelleno, grozorlinea, porcentaje){
         this.Id = id,
         this.x = Math.min(posicionesCursor[0].x, posicionesCursor[1].x),
         this.y = Math.min(posicionesCursor[0].y, posicionesCursor[1].y),
         this.alto = Math.abs(posicionesCursor[1].y - posicionesCursor[0].y),
         this.ancho = Math.abs(posicionesCursor[1].x - posicionesCursor[0].x),

         this.colorLinea = colorlinea,
         this.colorRelleno = colorrelleno,
         this.grozorLinea = grozorlinea * (porcentaje/100);

         this.ejemplo = "imprimir";
     }
     ImprimirDatos(){
         console.log("Id: " + this.Id);
         console.log("X: " + this.x);
         console.log("Y: " + this.y);
         console.log("Alto: " + this.alto);
         console.log("Ancho: " + this.ancho);
         console.log("Color Linea: " + this.colorLinea);
         console.log("Color Relleno: " + this.colorRelleno);
         console.log("Grozor Linea: " + this.grozorLinea);
     }
     Crear(){
        ctx.beginPath();
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
     }
     Borrador(){
        ctx.beginPath();
         ctx.lineWidth = this.grozorLinea;
         ctx.fillStyle = "#FFFFFF";
         ctx.strokeStyle = "#FFFFFF";

         ctx.fillRect(this.x-1, this.y-1, this.ancho+2, this.alto+2);
         ctx.strokeRect(this.x-1, this.y-1, this.ancho+2, this.alto+2);
     }
     Dibujar(event) {
        // Obtener las nuevas posiciones del cursor
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        // Actualizar las coordenadas y el tamaño del rectángulo según la posición del mouse
        this.x = Math.min(posicionesCursor[0].x, mouseX);
        this.y = Math.min(posicionesCursor[0].y, mouseY);
        this.ancho = Math.abs(mouseX - posicionesCursor[0].x);
        this.alto = Math.abs(mouseY - posicionesCursor[0].y);

        this.Crear();
     }
     Dibujar2(usuarioX,usuarioY) {
         this.x = usuarioX;
         this.y = usuarioY;
         console.log("Dibujar 2 " + usuarioX);
         console.log("Dibujar 2 " + usuarioY);
         this.Crear();
     }
 }

class Circulo {
    constructor(id, posicionesCursor, colorlinea, colorrelleno, grozorlinea, porcentaje, event){
        this.Id = id,
        this.x = posicionesCursor[0].x,
        this.x2,
        this.y = posicionesCursor[0].y,
        this.y2,
        this.radio = Math.sqrt((posicionesCursor[1].x - posicionesCursor[0].x) **2 + (posicionesCursor[1].y - posicionesCursor[0].y) ** 2),
        this.radius,
        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.grozorLinea = grozorlinea * (porcentaje/100);
    }
    ImprimirDatos(){
        console.log("Id: " + this.Id);
        console.log("X: " + this.x);
        console.log("Y: " + this.y);
        console.log("Radio " + this.radio);
        console.log("Color Linea: " + this.colorLinea);
        console.log("Color Relleno: " + this.colorRelleno);
        console.log("Grozor Linea: " + this.grozorLinea);
    }
    Crear(){
        console.log("CREAR CIRCULO");
        ctx.beginPath();
        this.radius =  Math.sqrt(Math.pow((this.x - this.x2), 2) + Math.pow((this.y - this.y2), 2));
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    Borrador(){
        console.log("BORRAR CIRCULO");
        ctx.beginPath();
        this.radius =  Math.sqrt(Math.pow((this.x - this.x2), 2) + Math.pow((this.y - this.y2), 2));
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.arc(this.x, this.y, this.radius+1, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    Dibujar(event){
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;

        this.Crear();
    }
    Dibujar2(usuarioX,usuarioY){
        this.x = usuarioX;
        this.y = usuarioY;
        this.x2 = this.x + this.radius;
        this.y2 = this.y;

        this.Crear();
    }
}

class Sticker{
    constructor(id, url, posX, posY, porcentaje){
        this.Id = id;
        this.imagen = new Image();
        this.imagen.src = url;
        this.ancho = this.imagen.width * (porcentaje/100);
        this.alto = this.imagen.height * (porcentaje/100);
        this.x = posX;
        this.y = posY;
    }
    Borrador(){
        ctx.beginPath();
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#ffffff";
        console.log("X borrador");
        console.log(this.x);
        ctx.fillRect(this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
        ctx.strokeRect(this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
    }
    Dibujar(){
        ctx.beginPath();
        ctx.drawImage(this.imagen, this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
        console.log("SI DIBUJO EL STICKER");
    }
    Dibujar2(width, height){
        ctx.beginPath();
        ctx.drawImage(this.imagen, 0, 0,width, height);
        console.log("SI DIBUJO COMPLETO");
    }
    Dibujar3(usuarioX, usuarioY){
        ctx.beginPath();
        this.x = usuarioX;
        this.y = usuarioY;
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height, this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
        console.log("SI DIBUJO EL STICKER");
    }
}

class Triangulo{
    constructor(id, posicionesCursor , colorlinea, colorrelleno, grozorlinea, porcentaje){
        this.Id = id,
        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.GrozorLinea = grozorlinea * (porcentaje/100),
        this.x = posicionesCursor[0].x,
        this.y = posicionesCursor[0].y,
        this.x2,
        this.y2
    }
    Crear(){
        ctx.beginPath();
        ctx.lineWidth = this.GrozorLinea;
        ctx.strokeStyle = this.colorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.moveTo(this.x ,this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x * 2 - this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    Borrador(){
        if(this.y < this.y2)
        {
            ctx.beginPath();
            ctx.lineWidth = this.GrozorLinea;
            ctx.strokeStyle = "#FFFFFF";
            ctx.fillStyle = "#FFFFFF";
            ctx.moveTo(this.x ,this.y - 2);
            ctx.lineTo(this.x2 + 7, this.y2 + 2);
            ctx.lineTo(this.x + 3 * 2 - this.x2, this.y2 + 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        else if(this.y > this.y2)
        {
            ctx.beginPath();
            ctx.lineWidth = this.GrozorLinea;
            ctx.strokeStyle = "#FFFFFF";
            ctx.fillStyle = "#FFFFFF";
            ctx.moveTo(this.x ,this.y + 2);
            ctx.lineTo(this.x2 + 9, this.y2 - 2);
            ctx.lineTo(this.x + 3 * 2 - this.x2, this.y2 -2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }
    Dibujar(event){
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;

        this.Crear();
    }
    Dibujar2(usuarioX,usuarioY){
        let diferenciaX = Math.abs(this.x - this.x2);
        let diferenciaY = Math.abs(this.y - this.y2);

        this.x = usuarioX;
        this.y = usuarioY;
        this.x2 = this.x + diferenciaX;
        this.y2 = this.y +diferenciaY;

        this.Crear();
    }
}

class LineaRecta{
    constructor(id, posicionesCursor, colorLinea, grozorLinea, porcentaje){
        this.Id = id,
        this.ColorLinea = colorLinea,
        this.GrozorLinea = grozorLinea * (porcentaje/100),
        this.x = posicionesCursor[0].x,
        this.y = posicionesCursor[0].Y;
    }
    Dibujar(event){
        ctx.beginPath();
        ctx.lineWidth = 15*(rangoImagen.value/100);
        ctx.strokeStyle = this.ColorLinea;
        ctx.moveTo(posicionesCursor[0].x,posicionesCursor[0].y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
}