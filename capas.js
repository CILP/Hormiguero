// capas.js
// Carlos Linares
var fondo,
    frente,
    hormiga,
    dimensionHormiga;

// Volver a dibujar
function repaint(){
  window.requestAnimationFrame(repaint);
  // Pintamos el fondo de negro
  //fondo.contexto.fillStyle = "#000";
  //fondo.contexto.fillRect(0, 0, fondo.ancho, fondo.alto);

  // fondo.dibujarRelleno();
  // frente.dibujarCuadricula();

  // No se puede usar
  // bajo prueba...
  // hormiga.mover();
  hormiga.beta(fondo.contexto);
  // hormiga.pintar(fondo.contexto, "#F00", false);
  // hormiga.detectarColor(fondo.contexto);
}

// Eventos
// Load
// window.addEventListener("load", config, false);
window.addEventListener('load', function(){
  // Se establecen valores de variables
  dimensionHormiga = 8;

  // Se inican las capas
  fondo = new Mapa(document.getElementById('fondo'), '2d', null, dimensionHormiga);
  frente = new Mapa(document.getElementById('frente'), '2d', null, dimensionHormiga);

  frente.dibujarCuadricula();
  hormiga = new Hormiga('Alfa', frente.ancho / 2, frente.alto / 2, dimensionHormiga, dimensionHormiga);

  repaint();
}, false);

// onmouseup
document.onmouseup = function(e){
  e = e || window.event;
  var boton = e.which || e.button;
  return (boton == 1);
};

// onmousemove
document.onmousemove = function(e){
  // console.info({x: e.pageX, y: e.pageY});
};

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 17);
    };
}());
