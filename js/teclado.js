// CONSTANTES QUE DEFINEM OS KEY_CODE
var SETA_DIREITA   = 39;
var SETA_ESQUERDA  = 37;
var SETA_CIMA      = 38;
var SETA_BAIXO     = 40;
var TECLA_E        = 69;
var TECLA_Q        = 81;
var ESPACO         = 32;
var CRTL           = 17;

function Teclado(elemento) {
    this.elemento = elemento;
    // array para controlar teclas pressionadas
    this.pressionadas = [];
    // variável para registrar as teclas no array
    this.disparadas = [];
    // funções (ou ações) de disparos
    this.funcoesDisparo = [];
    var teclado = this;
    // ação para registrar se uma tecla está pressionada
    elemento.addEventListener("keydown", function(evento) {
        var tecla = evento.keyCode; // capturando o keycode
        teclado.pressionadas[tecla] = true;
        // disparar somente se for o 1º keydown
        if(teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            teclado.disparadas[tecla] = true;
            teclado.funcoesDisparo[tecla]();
        }
    });
    
    // ação para registrar se uma tecla foi liberada (solta)
    elemento.addEventListener("keyup", function(evento) {
        var tecla = evento.keyCode; // capturando o keycode
        teclado.pressionadas[tecla] = false;
        teclado.disparadas[tecla] = false;
    });
}

Teclado.prototype = {
    pressionada: function(tecla) {
        return this.pressionadas[tecla];
    },
    disparou: function(tecla, funcaoCallback) {
        this.funcoesDisparo[tecla] = funcaoCallback;
    }
}