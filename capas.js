// capas.js
// Carlos Linares
var fondo,
    frente,
    hormiga,
    dimensionHormiga;

// Volver a dibujar
function repaint(){
  window.requestAnimationFrame(repaint);
  // fondo.dibujarRelleno();
  // frente.dibujarCuadricula();

  // No se puede usar
  // bajo prueba...
  // hormiga.mover();
  hormiga.pintar(fondo.contexto, "#FF0", true);
  // hormiga.detectarColor(fondo.contexto);
}

// Eventos
// Load
window.addEventListener("load", config, false);

// onmouseup
document.onmouseup = function(e){
  e = e || window.event;
  var boton = e.which || e.button;
  return (boton == 1);
};

// onmousemove
document.onmousemove = function(e){
  return {x: e.pageX, y: e.pageY};
};

// Configuracion
function config(){

  // Se establecen valores de variables
  dimensionHormiga = 16;

  // ccontextoFondo = document.getElementById('fondo').getContext('2d');

  // Se inican las capas
  fondo = new Mapa(document.getElementById('fondo'), '2d', null, dimensionHormiga);
  frente = new Mapa(document.getElementById('frente'), '2d', null, dimensionHormiga);

  // contextoFondo = fondo.contexto;

  frente.dibujarCuadricula();
  console.log(fondo.contexto.fillStyle);
  hormiga = new Hormiga('Alfa', frente.ancho / 2, frente.alto / 2, dimensionHormiga, dimensionHormiga);
  repaint();
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 17);
    };
}());
