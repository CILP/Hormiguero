// rectangulo.js
// Carlos Linares

function Rectangulo(x, y, ancho, alto, color) {

    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.ancho = (ancho == null) ? 0 : ancho;
    this.alto = (alto == null) ? 0 : alto;
    this.color = (color == null) ? '#000' : color.valor();
    this.listavecinos = [];
}

Rectangulo.prototype.setColor = function (color) {
    if (color) {
        this.color = color.valor();
    }
};

Rectangulo.prototype.vecinos = function(source){
    var celda = {
        rectangulo : null,
        ia : null,
        ib : null,
        uno : null,
        dos : null,
        tres : null,
        cuatro : null,
        cinco : null,
        seis : null,
        siete : null,
        ocho : null
    };

    var limite = source.length - 1;

    for (var i = 0; i !== source.length; i++){

        if (!celda.rectangulo){
            for (var j = 0; j !== source[i].length; j++){
                if (source[i][j].x === this.x && source[i][j].y === this.y){
                    celda.rectangulo = source[i][j];
                    celda.ia = i;
                    celda.ib = j;
                    break;
                }
            }
        }
        else {
            break;
        }
    }

    // Ya tenemos nuestra celda y sus indices
    // Ahora a obtener sus vecinos...
    // Celdas a la derecha checamos si es el limite del arreglo
    // Siempre buscamos por condiciones al inicio o al fin del arreglo

    // Vecinos superiores...
    // celda.uno = (source[celda.ia] === 0) ? null : source[celda.ia - 1][celda.ib - 1];
    // celda.uno = (celda.ia === 0) ? null : source[celda.ia - 1][celda.ib - 1];
    celda.uno = (celda.ia === 0 || celda.ib === 0) ? null : source[celda.ia - 1][celda.ib - 1];
    celda.dos = (celda.ia === 0) ? null : source[celda.ia - 1][celda.ib];
    celda.tres = (celda.ia === 0 || celda.ib === source[celda.ia].length - 1 ) ? null : source[celda.ia - 1][celda.ib + 1];

    // Vecinos centrales...

    // Si el ib === 0 no hay vecino cuatro
    celda.cuatro = (celda.ib === 0) ? null : source[celda.ia][celda.ib - 1];
    celda.cinco = (celda.ib === source[celda.ia].length -1 ) ? null : source[celda.ia][celda.ib + 1];

    // Vecinos inferiores
    // Si el ib === 0 no hay vecino seis
    celda.seis = (celda.ib === 0 || celda.ia === limite) ? null : source[celda.ia + 1][celda.ib - 1];
    celda.siete = (celda.ia === limite) ? null : source[celda.ia + 1][celda.ib];
    celda.ocho = (celda.ia === limite || celda.ib === source[celda.ia].length - 1) ? null : source[celda.ia + 1][celda.ib + 1];

    // Guardamos los vecinos
    this.listavecinos = (this.listavecinos === null) ? [] : this.listavecinos;
    this.listavecinos.push(celda.uno);
    this.listavecinos.push(celda.dos);
    this.listavecinos.push(celda.tres);
    this.listavecinos.push(celda.cuatro);
    this.listavecinos.push(celda.cinco);
    this.listavecinos.push(celda.seis);
    this.listavecinos.push(celda.siete);
    this.listavecinos.push(celda.ocho);

    // quitamos la referencia de matrix
    //matrix = null;
};

Rectangulo.prototype.dibujarVecinos = function (contexto){
    for (var i = 0; i !== this.listavecinos.length; i++){
        if (this.listavecinos[i]){
            // console.info(this.listavecinos[i]);
            // contexto.fillStyle = this.listavecinos[i].color;
            contexto.fillStyle = "#F00";
            contexto.fillRect(this.listavecinos[i].x, this.listavecinos[i].y, this.listavecinos[i].ancho, this.listavecinos[i].alto);
        }
    }
};

// TODO: Definir color para pintar los vecinos
Rectangulo.prototype.dibujarVecinos = function(contexto, patron){
    // General([0, 1, 2, 3, 4, 5, 6, 7])
    //
    //      (Todos los vecinos):    [0, 1, 2]
    //                              [3, X, 4]
    //                              [5, 6, 7]

    // Cruz([1, 3, 4, 6])
    //          (Norte,
    //           Sur,
    //           Este,              [X, 1, X]
    //           Oeste):            [3, X, 4]
    //                              [X, 6, X]

    // Diagonal([0, 2, 5, 7])
    //          (Este superior,     [0, X, 2]
    //           Oeste superior,    [X, X, X]
    //           Este inferior,     [5, X, 7]
    //           Oeste inferior):
    patron = (patron == null) ? [0, 1, 2, 3, 4, 5, 6, 7] : patron;

    for (var i = 0; i !== patron.length; i++){
        if (this.listavecinos[patron[i]]){
            contexto.fillStyle = "#F00";
            contexto.fillRect(this.listavecinos[patron[i]].x, this.listavecinos[patron[i]].y, this.listavecinos[patron[i]].ancho, this.listavecinos[patron[i]].alto);
        }
    }
};
