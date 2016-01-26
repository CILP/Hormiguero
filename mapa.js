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
}

Mapa.prototype.dibujarCuadricula = function(){
    
    // WOW, dibuja una malla a la izquierda...
    /* for (var y = 0; y <= this.ancho; y += this.tamanoCelda){
        // Lineas horizontales
        // Solo se mueve la y
        this.contexto.moveTo(0, y);
        this.contexto.lineTo(y, this.ancho);
    }*/
    
    for (var x = 0; x <= this.ancho; x += this.tamanoCelda) {
        this.contexto.moveTo(x, 0);
        this.contexto.lineTo(x, this.ancho);
    }
    
    for (var y = 0; y <= this.alto; y += this.tamanoCelda){
        this.contexto.moveTo(0, y);
        this.contexto.lineTo(this.alto, y);
    }
    
    this.contexto.strokeStyle = this.colorCuadricula.valor();
    this.contexto.stroke();
};

Mapa.prototype.limpiar = function(){
    this.contexto.clearRect(0, 0, this.ancho, this.alto);  
};