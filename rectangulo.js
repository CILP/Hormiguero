// rectangulo.js
// Carlos Linares

function Rectangulo(x, y, ancho, alto, color) {

    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.ancho = (ancho == null) ? 0 : ancho;
    this.alto = (alto == null) ? 0 : alto;
    this.color = (color == null) ? '#000' : color.valor();
}

Rectangulo.prototype.setColor = function (color) {
    if (color) {
        this.color = color.valor();
    }
};