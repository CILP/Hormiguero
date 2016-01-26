var canvas = null;
var contexto = null;
var hormiga = null;
var fondoMapa = null; 
var colorJugador = null; 
var cursor = null;
var click = null;
var hormigados = null;
// var x = null ,
//    y = null;
    
var rectangulosPintados = null;

window.addEventListener('load', init, false);

document.onmousemove = function(e) {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
}

document.onmouseup = function(e) {
    e = e || window.event;
    var button = e.which || e.button;
    // click = button == 1;
}

function repaint() {
    window.requestAnimationFrame(repaint);
    contexto.fillStyle = fondoMapa;
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    
    hormiga.setDireccion(random(39));
    
    // TEST: 
    if (hormigados){
        if (!hormiga.colision(hormigados)){
            hormiga.mover();
            hormiga.changeColor();
        }    
    }
    else
    {
        hormiga.mover();
        hormiga.changeColor();
    }
    
    //hormiga.mover();
    //hormiga.changeColor();
    
    for (var i = 0; i !== rectangulosPintados.length; i++){
        contexto.fillStyle = rectangulosPintados[i].color;
        contexto.fillRect(rectangulosPintados[i].x, rectangulosPintados[i].y, rectangulosPintados[i].ancho, rectangulosPintados[i].alto);
    }
    
    hormiga.pintar(contexto, colorJugador);
    
    contexto.fillStyle = "#f00";
    contexto.fillRect(cursor.x -  16, cursor.y - 16, 32, 32);
    
    if (click){
        console.log("Click");
        click = false;
        
        // hormigados = new Hormiga('Carlos', cursor.x + 16, cursor.y + 16, 32, 32);
        hormigados = new Hormiga('Carlos', random(canvas.width - 32), random(canvas.height - 32), 32, 32);
    }
    
    //TEST
    /*
    if (hormigados){
        
        hormigados.setDireccion(random(39));
        hormigados.mover();
        
        if (hormiga.colision(hormigados)){
            console.log("Colisionaron las hormigas");
        }
        
        hormigados.changeColor();
        hormigados.pintar(contexto, colorJugador);
    }
    else {
        
    }*/
    
}

/*
function run() {
    setTimeout(run, 17);
}
*/

function init() {
    cursor = { x : 0, y : 0 };
    click = false;
    
    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');
    
    // TEST:
    // rectangulosPintados = [];

    // Posicion random X Y
    // x = random(canvas.width - 32);
    // y = random(canvas.height - 32);
    
    // console.log("X: " + x + " Y: " + y);
    hormiga = new Hormiga('Ivan', random(canvas.width - 32), random(canvas.height - 32), 32, 32);

    fondoMapa = new Color('0', '0', '0').valor();
    colorJugador = new Color('F', '0', '0').valor();
    
    // Funcion que esta de mas
    //run();
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