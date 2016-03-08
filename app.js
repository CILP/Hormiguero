// app.js
// Carlos Linares
var fondo,
    frente,
    hormiga,
    dimensionHormiga;

function repaint(){
  window.requestAnimationFrame(repaint);
  hormiga.mover(fondo.contexto);
}

window.addEventListener('load', function(){
  // Se establecen valores de variables
  dimensionHormiga = 8;

  // Se inican las capas
  fondo = new Mapa(document.getElementById('fondo'), '2d', null, dimensionHormiga);
  frente = new Mapa(document.getElementById('frente'), '2d', null, dimensionHormiga);

  // configCanvasListener();

  frente.dibujarCuadricula();
  fondo.contexto.fillStyle = "#000";
  fondo.contexto.fillRect(0, 0, fondo.ancho, fondo.alto);

  hormiga = new Hormiga('Alfa', frente.ancho / 2, frente.alto / 2, dimensionHormiga, dimensionHormiga);

  repaint();
}, false);

document.onmouseup = function(e){
  e = e || window.event;
  var boton = e.which || e.button;
  return (boton == 1);
};

// TODO
document.onmousemove = function(e){
  // console.info({x: e.pageX, y: e.pageY});
};

// TODO
function configCanvasListener(){
  // frente.canvas.addEventListener('mousemove', function(e){
  //   console.info({x: e.pageX, y: e.pageY});
  // });
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 17);
    };
}());
