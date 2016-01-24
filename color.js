// color.js
// Carlos Linares

function Color(rojo, verde, azul) {

    this.rojo = (rojo == null) ? '0' : rojo;
    this.verde = (verde == null) ? '0' : verde;
    this.azul = (azul == null) ? '0' : azul;
}

Color.prototype.valor = function () {
    return '#@rojo@verde@azul'
        .replace('@rojo', this.rojo)
        .replace('@verde', this.verde)
        .replace('@azul', this.azul);
};