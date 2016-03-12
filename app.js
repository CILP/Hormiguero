// app.js
// Carlos Linares
var fondo,
    media,
    frente,
    hormiga,
    cabezaHormiga,
    dimensionHormiga;

function repaint(){
  window.requestAnimationFrame(repaint);

  hormiga.mover(fondo.contexto);
  
  cabezaHormiga.x = hormiga.x;
  cabezaHormiga.y = hormiga.y;
  cabezaHormiga.pintar(media.contexto, "#F00", true);
}

window.addEventListener('load', function(){
  // Se establecen valores de variables
  dimensionHormiga = 8;

  // Se inican las capas
  fondo = new Mapa(document.getElementById('fondo'), '2d', null, dimensionHormiga);
  frente = new Mapa(document.getElementById('frente'), '2d', null, dimensionHormiga);

  // Se inicia la capa media
  // donde se muestra el color de la hormiga
  media = new Mapa(document.getElementById('media'), '2d', null, dimensionHormiga);

  frente.dibujarCuadricula();
  fondo.contexto.fillStyle = "#000";
  fondo.contexto.fillRect(0, 0, fondo.ancho, fondo.alto);

  hormiga = new Hormiga('Alfa', frente.ancho / 2, frente.alto / 2, dimensionHormiga, dimensionHormiga);
  cabezaHormiga = new Hormiga('HeadAlfa', media.ancho / 2, media.alto / 2, dimensionHormiga, dimensionHormiga);

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
