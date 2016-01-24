var canvas = null;
var contexto = null;
var hormiga = null;
var fondoMapa = null; 
var colorJugador = null; 
var x = null ,
    y = null;
    
var rectangulosPintados = null;

window.addEventListener('load', init, false);

function repaint() {
    window.requestAnimationFrame(repaint);
    contexto.fillStyle = fondoMapa;
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    
    hormiga.setDireccion(random(39));
    hormiga.mover();
    hormiga.changeColor();
    
    for (var i = 0; i !== rectangulosPintados.length; i++){
        contexto.fillStyle = rectangulosPintados[i].color;
        contexto.fillRect(rectangulosPintados[i].x, rectangulosPintados[i].y, rectangulosPintados[i].ancho, rectangulosPintados[i].alto);
    }
    hormiga.pintar(contexto, colorJugador);
}

function run() {
    setTimeout(run, 17);
}

function init() {
    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');

    // Posicion random X Y
    x = random(canvas.width - 32);
    y = random(canvas.height - 32);
    
    console.log("X: " + x + " Y: " + y);
    hormiga = new Hormiga('Ivan', x, y, 32, 32);

    fondoMapa = new Color('0', '0', '0').valor();
    colorJugador = new Color('F', '0', '0').valor();
    run();
    repaint();
}

function random(maximo){
    return Math.floor(Math.random() * maximo);
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 17);
    };
}());