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

Mapa.prototype.limpiar = function(){
    this.contexto.clearRect(0, 0, this.ancho, this.alto);  
};