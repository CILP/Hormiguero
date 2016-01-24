var canvas = null;
var contexto = null;
var hormiga = null;
var fondoMapa = null; 
var colorJugador = null; 
var cursor = null;
var click = null;
var hormigados = null;
var x = null ,
    y = null;
    
var rectangulosPintados = null;

window.addEventListener('load', init, false);

document.onmousemove = function(e) {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
}

document.onmouseup = function(e) {
    e = e || window.event;
    var button = e.which || e.button;
    click = button == 1;
}

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
    
    contexto.fillStyle = "#f00";
    contexto.fillRect(cursor.x -  16, cursor.y - 16, 32, 32);
    
    /*
    if (click){
        console.log("Click");
        click = false;
    }
    
    if (hormigados){
        hormigados.setDireccion(random(39));
        hormigados.mover();
        //hormigados.changeColor();
        hormiga.pintar(contexto, colorJugador);
    }
    else {
        hormigados = new Hormiga('Carlos', cursor.x, cursor.y, 32, 32);
    }*/
    
}

function run() {
    setTimeout(run, 17);
}

function init() {
    cursor = { x : 0, y : 0 };
    click = false;
    
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