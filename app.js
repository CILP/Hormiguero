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

var listaHormigas = null;
var hormigados = null;
var dimensionHormiga = 4;
var rectangulosPintados = null;
var mapa = null;

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

    hormiga.mover();

    for (var i = 0; i !== rectangulosPintados.length; i++){
        contexto.fillStyle = rectangulosPintados[i].color;
        contexto.fillRect(rectangulosPintados[i].x, rectangulosPintados[i].y, rectangulosPintados[i].ancho, rectangulosPintados[i].alto);
    }

    hormiga.pintar(contexto, colorJugador);

    // Se dibuja la hormiga del cursor
    contexto.fillStyle = "#f00";
    contexto.fillRect(cursor.x - (dimensionHormiga / 2), cursor.y - (dimensionHormiga / 2), dimensionHormiga, dimensionHormiga);


    if (click){
        click = false;
        listaHormigas.push(new Hormiga('Beta', cursor.x, cursor.y, dimensionHormiga, dimensionHormiga));
    }

    for (var i = 0; i !==  listaHormigas.length; i++){
        listaHormigas[i].mover();
        listaHormigas[i].pintar(contexto, colorJugador);
    }

    // mapa.dibujarCuadricula();
}

function init() {
    cursor = { x : 0, y : 0 };
    click = false;

    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');

    rectangulosPintados = [];
    listaHormigas = [];

    x = canvas.width / 2;
    y = canvas.height / 2;

    mapa = new Mapa(document.getElementById('canvas'), '2d', null, dimensionHormiga);
    // mapa.dibujarRelleno();
    // mapa.dibujarCuadricula();
    //mapa.setVecinos();
    hormiga = new Hormiga('Alfa', x, y, dimensionHormiga, dimensionHormiga);

    fondoMapa = new Color('0', '0', '0').valor();
    colorJugador = new Color('F', '0', '0').valor();
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
