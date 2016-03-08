function Hormiga(nombreHormiga, x, y, ancho, alto) {

    // Constructor padre
    Rectangulo.call(this, x, y, ancho, alto);

    // Inicializacion de propiedades
    var nombreHormiga = (nombreHormiga == null) ? "Sin Nombre" : nombreHormiga;
    this.direccion = null;
    this.ultimo = {x: 0, y: 0, ancho: this.ancho, alto: this.alto};
}

// Creamos el objeto Hormiga.prototype
Hormiga.prototype = Object.create(Rectangulo.prototype);

Hormiga.prototype.constructor = Hormiga;

Hormiga.prototype.pintar = function (contexto, color, limpiar) {
  if (this.ultimo.x !== this.x || this.ultimo.y !== this.y){
    contexto.fillStyle = color;
    contexto.fillRect(this.x, this.y, this.ancho, this.alto);

    if (limpiar){
      // Evitamos cambiar el estado si el estilo no ha cambiado
      if (color !== "#FFF"){
        contexto.fillStyle = "#FFF";
      }
      contexto.fillRect(this.ultimo.x, this.ultimo.y, this.ultimo.ancho, this.ultimo.alto);
    }

    this.ultimo.x = this.x;
    this.ultimo.y = this.y;
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


Hormiga.prototype.girar = function() {
  if (this.direccion === 0){
      // Mover arriba

      if (this.y - (this.ancho * 2) > 0){
          this.y = this.y - this.ancho;
      }
  }
  else if (this.direccion === 1){
      // Mover derecha

      if (this.x + (this.ancho * 2) < fondo.ancho){
          this.x = this.x + this.ancho;
      }
  }
  else if (this.direccion === 2){
      // Mover abajo

      if (this.y + (this.ancho * 2) < fondo.alto){
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

Hormiga.prototype.mover = function(contexto){
  // Detectamos color
  var color = this.detectarColor(contexto);

  // Seteamos la direccion
  if (!this.direccion){
      // Seteamos direccion hacia arriba
      this.direccion = 0;
  }

  // Giramos
  if (color === "#000000"){
    this.pintar(contexto, "#FFF", false);
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
    this.pintar(contexto, "#000", false);
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

Hormiga.prototype.detectarColor = function(contexto){
  var data = contexto.getImageData(this.x, this.y, 1, 1).data;
  return rgbToHex(data[0], data[1], data[2]);
};

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
