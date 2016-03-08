// mapa.js
// Carlos Linares

// var mapa = new Mapa(document.getElementById('canvas'), '2d', null, 32);
function Mapa(canvas, contexto, colorCuadricula, tamanoCelda){

    this.canvas = (canvas == null) ? null : canvas;
    this.colorCuadricula = (colorCuadricula == null) ? "#5E2750" : colorCuadricula;
    this.contexto = (this.canvas == null) ? null : canvas.getContext(contexto);
    this.tamanoCelda = (tamanoCelda == null) ? 32 : tamanoCelda;

    this.ancho = (canvas == null) ? 0 : canvas.width;
    this.alto = (canvas == null) ? 0 : canvas.height;

    this.matrix = [];

    // Evitamos referencias circulares
    canvas = null;
}

Mapa.prototype.dibujarCuadricula = function(){

    // dibuja una malla a la izquierda...
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

    this.contexto.strokeStyle = this.colorCuadricula;
    this.contexto.stroke();
};

Mapa.prototype.dibujarRelleno = function(){
    for (var y = 0; y <= this.alto; y += this.tamanoCelda){
        var renglonCeldas = [];

        for (var x = 0; x <= this.ancho; x += this.tamanoCelda){
            var celda = new Rectangulo(x, y, this.tamanoCelda, this.tamanoCelda);
            renglonCeldas.push(celda);

            if (this.contexto.style !== celda.color){
                this.contexto.style = celda.color;
            }
            this.contexto.fillRect(celda.x, celda.y, celda.ancho, celda.alto);
        }

        this.matrix.push(renglonCeldas);
    }
};

Mapa.prototype.limpiar = function(){
    this.contexto.clearRect(0, 0, this.ancho, this.alto);
};

Mapa.prototype.dibujarLinea = function(x1, y1, x2, y2, colorLinea){

    // Si colorLinea no se encuentra establecido se toma el default de this.color
    colorLinea = (colorLinea == null) ? this.colorCuadricula : colorLinea;

    this.contexto.moveTo(x1, y1);
    this.contexto.lineTo(x2, y2);
    if (this.contexto.strokeStyle !== colorLinea){
      this.contexto.strokeStyle = colorLinea;
    }
    this.contexto.stroke();
};

Mapa.prototype.setVecinos = function(){
    for (var i = 0; i !== this.matrix.length; i++){
        for (var j = 0; j !== this.matrix[i].length; j++){

            // Llamamos la funcion de obtener vecinos
            // la funcion esta dentro de cada rectangulo
            this.matrix[i][j].vecinos(this.matrix);
        }
    }
};

Mapa.prototype.dibujarVecinos = function(fila, patron){
    if (fila <= this.matrix.length){
        for (var i = 0; i !== this.matrix[fila].length; i++){
            this.matrix[fila][i].dibujarVecinos(this.contexto, patron);
        }
    }
};
