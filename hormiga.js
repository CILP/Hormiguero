function Hormiga(nombreHormiga, x, y, ancho, alto) {

    // Constructor padre
    Rectangulo.call(this, x, y, ancho, alto);

    // Inicializacion de propiedades
    var nombreHormiga = (nombreHormiga == null) ? "Sin Nombre" : nombreHormiga;
    var direccion = null;
}

// Creamos el objeto Hormiga.prototype
Hormiga.prototype = Object.create(Rectangulo.prototype);

Hormiga.prototype.constructor = Hormiga;

Hormiga.prototype.pintar = function (contexto, color) {
    contexto.fillStyle = color;
    contexto.fillRect(this.x, this.y, this.ancho, this.alto);
};

Hormiga.prototype.setDireccion = function (dir){
    if (dir < 10){
        this.direccion = 0;
    }
    else if (dir > 9 && dir < 20){
        this.direccion = 1;
    }
    else if (dir > 19 && dir < 30){
        this.direccion = 2;
    }
    else if (dir > 29){
        this.direccion = 3;
    }
    this.direccion = dir;
};

Hormiga.prototype.colision = function (hormiga) {
    return (
        this.x < hormiga.x + hormiga.ancho &&
        this.x + this.ancho > hormiga.x &&
        this.y < hormiga.y + hormiga.alto &&
        this.y + this.alto > hormiga.y
    );
};

Hormiga.prototype.changeColor = function() {
    var duplicado = false;
    var indiceDuplicado = 0;
    
    if (rectangulosPintados) {
        for (var i = 0; i !== rectangulosPintados.length; i++){
            if (rectangulosPintados[i].x === this.x && rectangulosPintados[i].y === this.y){
                duplicado = true;
                indiceDuplicado = i;
                break;
            }
        }
        
        // Actualizar para invertir colores
        if (!duplicado){
            rectangulosPintados.push(new Rectangulo(this.x, this.y, 32, 32, new Color('F', 'F', 'F')));
        }
        else {
            // Se actualiza
            // Comentar el contenido de este bloque para prevenir la actualizacion
            /*
            var colorAntiguo = rectangulosPintados[indiceDuplicado].color;
            
            if (colorAntiguo === "#FFF"){
                rectangulosPintados[indiceDuplicado] = new Rectangulo(this.x, this.y, 32, 32, new Color('0', '0', '0'));
            }
            else {
                rectangulosPintados[indiceDuplicado] = new Rectangulo(this.x, this.y, 32, 32, new Color('F', 'F', 'F'));
            }*/
        }
    } 
    else {
        rectangulosPintados = [];
    }
};

Hormiga.prototype.mover = function() {
    // Se movera en cuatro direcciones
    // Vertical, Horizontal
    
    if (this.direccion === 0){
        // Mover arriba
        
        if (this.y - 64 > 0){
            this.y = this.y - 32;
        }
    }
    else if (this.direccion === 1){
        // Mover derecha
        
        if (this.x + 64 < canvas.width){
            this.x = this.x + 32;
        }
    }
    else if (this.direccion === 2){
        // Mover abajo
        
        if (this.y + 64 < canvas.height){
            this.y = this.y + 32;
        }
    }
    else if (this.direccion === 3){
        // Mover izquierda
        
        if (this.x - 64 > 0){
            this.x = this.x - 32;
        }
    }
}