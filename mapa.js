// mapa.js
// Carlos Linares

function Mapa(canvas, ancho, alto, contexto, cuadricula, colorCuadricula, tamanoCelda){
    
    this.canvas = (canvas == null) ? null : canvas;
    this.cuadricula = (cuadricula == null) ? false : cuadricula;
    this.colorCuadricula = (colorCuadricula == null) ? new Color('F', '0', 'F') : colorCuadricula;
    this.contexto = (this.canvas == null) ? null : canvas.getContext(contexto);
    this.tamanoCelda = (tamanoCelda == null) ? 32 : tamanoCelda;
    
    this.ancho = (ancho == null) ? 0 : ancho;
    this.alto = (alto == null) ? 0 : alto;
    
    // Evitamos referencias circulares
    canvas = null;
}

Mapa.prototype.dibujarCuadricula = function(){
    
    // WOW, dibuja una malla a la izquierda...
    /* for (var y = 0; y <= this.ancho; y += this.tamanoCelda){
        // Lineas horizontales
        // Solo se mueve la y
        this.contexto.moveTo(0, y);
        this.contexto.lineTo(y, this.ancho);
    }*/
    
    // Dibujamos lineas horizontales
    // Dibujamos lineas horizontales desde arriba (0) hasta abajo (480)(alto)
    // pero usando como longitud de linea el ancho del canvas
    for (var i = 0; i <= this.alto; i += this.tamanoCelda){
        this.contexto.moveTo(0, i);
        this.contexto.lineTo(this.ancho, i);
    }
    
    // Dibujamos lineas verticales
    // Dibujamos lineas verticales desde izquierda (0) hasta derecha (640)(ancho)
    // pero usando como longitud de linea el alto del canvas
    for (var i = 0; i <= this.ancho; i += this.tamanoCelda){
        this.contexto.moveTo(i, 0);
        this.contexto.lineTo(i, this.alto);
    }
    
    this.contexto.strokeStyle = this.colorCuadricula.valor();
    this.contexto.stroke();
};

Mapa.prototype.dibujarCuadriculaRect = function(){
    // Dibujaremos unicamente cuadrados con sus lados iguales a this.tamanoCelda
    
    for (var x = 0; x !== this.ancho; x += this.tamanoCelda){
        // this.contexto.moveTo(0, i);
        // this.contexto.lineTo(this.ancho, i);
        
        for (var y = 0; y !== this.alto; y += this.tamanoCelda){
            this.contexto.fillStyle = this.colorCuadricula;
            this.contexto.fillRect(x, y, this.tamanoCelda, this.tamanoCelda);
            console.log("Cuadro");
        }
    }  
};

Mapa.prototype.limpiar = function(){
    this.contexto.clearRect(0, 0, this.ancho, this.alto);  
};

Mapa.prototype.dibujarLinea = function(x1, y1, x2, y2, colorLinea){
    
    // Reemplazamod los pasos moveTo y LineTo por una sola llamada
    // Punto de origen (x1, y1)
    // Punto de fin (x2, y2)
    
    // Si colorLinea no se encuentra establecido se toma el default de this.color
    colorLinea = (colorLinea == null) ? this.colorCuadricula : colorLinea;
    
    this.contexto.moveTo(x1, y1);
    this.contexto.lineTo(x2, y2);
    this.contexto.strokeStyle = colorLinea;
    this.contexto.stroke();
};