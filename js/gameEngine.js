function include(file) {
    var script = document.createElement("script");
    script.src = file;
    script.type = "text/javascript";
    script.defer = true;
    document.getElementsByTagName("head").item(0).appendChild(script);
}

include("js/teclado.js");
include("js/animacao.js");
include("js/colisor.js");
include("js/spritesheet.js");
include("js/cenario.js");
include("js/cobra.js");
include("js/ponto.js");
//include("js/corpo.js");
