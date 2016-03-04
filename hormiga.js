function Hormiga(nombreHormiga, x, y, ancho, alto) {

    // Constructor padre
    Rectangulo.call(this, x, y, ancho, alto);

    // Inicializacion de propiedades
    var nombreHormiga = (nombreHormiga == null) ? "Sin Nombre" : nombreHormiga;
    this.direccion = null;
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
        // Arriba
    }
    else if (dir > 9 && dir < 20){
        this.direccion = 1;
        // Derecha
    }
    else if (dir > 19 && dir < 30){
        this.direccion = 2;
        // Abajo
    }
    else if (dir > 29){
        this.direccion = 3;
        // Izquierda
    }
};

Hormiga.prototype.colision = function (hormiga) {
    return (
        this.x < hormiga.x + hormiga.ancho &&
        this.x + this.ancho > hormiga.x &&
        this.y < hormiga.x + hormiga.alto &&
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

        // Colores
        // #fff
        // #000
        // Actualizar para invertir colores
        if (!duplicado){
            rectangulosPintados.push(new Rectangulo(this.x, this.y, this.ancho, this.alto, new Color('F', 'F', 'F')));
        }
        else {
            // Se actualiza
            // Comentar el contenido de este bloque para prevenir la actualizacion
            /*var colorAntiguo = rectangulosPintados[indiceDuplicado].color;

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

Hormiga.prototype.girar = function() {
  if (this.direccion === 0){
      // Mover arriba

      if (this.y - (this.ancho * 2) > 0){
          this.y = this.y - this.ancho;
      }
  }
  else if (this.direccion === 1){
      // Mover derecha

      if (this.x + (this.ancho * 2) < canvas.width){
          this.x = this.x + this.ancho;
      }
  }
  else if (this.direccion === 2){
      // Mover abajo

      if (this.y + (this.ancho * 2) < canvas.height){
          this.y = this.y + this.ancho;
      }
  }
  else if (this.direccion === 3){
      // Mover izquierda

      if (this.x - (this.ancho * 2) > 0){
          this.x = this.x - this.ancho;
      }
  }
};

// Buscar indice en matrix
// Cambiar el objeto de ese indice por un objeto Hormiga
// Setear nuevamente los vecinos para ese indice
Hormiga.prototype.moverOnMapa = function(){
    // Como ejemplo trabajaremos con la celda en la mitad de las columnas y filas
    var x = this.matrix.length,
        y = this.matrix[x].length,
        celda = this.matrix[x][y],
        colorAntiguo = celda.color;

    if (celda.color === "#FFF"){
        this.matrix[x][y] = new Hormiga(celda.x, celda.y, celda.ancho, celda.alto, new Color('0', '0', '0'));
        // rectangulosPintados[indiceDuplicado] = new Rectangulo(this.x, this.y, this.ancho, this.alto, new Color('0', '0', '0'));
    }
    else {
        this.matrix[x][y] = new Hormiga(celda.x, celda.y, celda.ancho, celda.alto, new Color('F', 'F', 'F'));
        // rectangulosPintados[indiceDuplicado] = new Rectangulo(this.x, this.y, this.ancho, this.alto, new Color('F', 'F', 'F'));
    }

    celda.setVecinos();

    if (!celda.direccion){
        celda.direccion = 1;
    }

    if (colorAntiguo === "#000"){
        // Girar hacia izquierda
        if (this.direccion === 1){
            this.direccion = 3;
        } else if  (this.direccion === 4){
            this.direccion = 1;
        } else if  (this.direccion === 6){
            this.direccion = 4;
        }  else if  (this.direccion === 3){
            this.direccion = 6;
        }

        // this.girar();
        // celda.dibujarVecinos(this.contexto, [this.direccion])

    } else {
        // Girara hacia derecha
        if (this.direccion === 1){
            this.direccion = 4;
        } else if  (this.direccion === 4){
            this.direccion = 6;
        } else if  (this.direccion === 6){
            this.direccion = 3;
        }  else if  (this.direccion === 3){
            this.direccion = 1;
        }
        // this.girar();
        // celda.dibujarVecinos(this.contexto, [this.direccion])
    }

};

Hormiga.prototype.mover = function(){
    // Detectamos color del cuadro
    // La deteccion se realiza de la siguiente manera:
    // Si detectamos el cuadro actual (en el que esta la hormiga) en
    // la lista de cuadros visitados...
    // se cambia a color negro, sino... se cambia a color blanco
    // TODO: Eliminar variables globales
    // Cambiamos color del cuadro

    var duplicado = false,
        indiceDuplicado = null,
        colorAntiguo = null;

    for (var i = 0; i !== rectangulosPintados.length; i++){
        if (rectangulosPintados[i].x === this.x && rectangulosPintados[i].y === this.y){
            duplicado = true;
            indiceDuplicado = i;
            break;
        }
    }

    if (!duplicado){
        // Detectamos cuadro negro, Se cambia a color blanco
        colorAntiguo = "#000";
        rectangulosPintados.push(new Rectangulo(this.x, this.y, this.ancho, this.alto, new Color('F', 'F', 'F')));
    } else {
        colorAntiguo = rectangulosPintados[indiceDuplicado].color;

        if (colorAntiguo === "#FFF"){
            rectangulosPintados[indiceDuplicado] = new Rectangulo(this.x, this.y, this.ancho, this.alto, new Color('0', '0', '0'));
        }
        else {
            rectangulosPintados[indiceDuplicado] = new Rectangulo(this.x, this.y, this.ancho, this.alto, new Color('F', 'F', 'F'));
        }
    }

    if (!this.direccion){
        // Seteamos direccion hacia arriba
        this.direccion = 0;
    }

    // Giramos de acuerdo al color del cuadro
    // Avanzamos un cuadro
    if (colorAntiguo === "#000"){
        // Girar hacia izquierda
        if (this.direccion === 0){
            this.direccion = 3;
        } else if  (this.direccion === 1){
            this.direccion = 0;
        } else if  (this.direccion === 2){
            this.direccion = 1;
        }  else if  (this.direccion === 3){
            this.direccion = 2;
        }
        this.girar();
    } else {
        // Girara hacia derecha
        if (this.direccion === 0){
            this.direccion = 1;
        } else if  (this.direccion === 1){
            this.direccion = 2;
        } else if  (this.direccion === 2){
            this.direccion = 3;
        }  else if  (this.direccion === 3){
            this.direccion = 0;
        }
        this.girar();
    }
};
