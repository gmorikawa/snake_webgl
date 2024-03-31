function Ponto(context) {
    this.context    = context;
    this.x          = 0;
    this.y          = 0;
    this.largura    = 0;
    this.altura     = 0;
    this.cor        = "black";
}

Ponto.prototype = {
    atualizar: function() {
        
    },
    desenhar: function() {
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
        ctx.restore();
    },
    retangulosColisao: function() {
        return [
            { x:this.x, y:this.y, largura:this.largura, altura:this.altura }
        ];
    },
    colidiuCom: function(sprite) {
        if(sprite instanceof Cobra) {
            this.respawn(this.largura, this.cor);
        }
    },
    respawn: function(tamanho, cor) {
        var canvas = this.context.canvas;
        this.largura = tamanho;
        this.altura = tamanho;
        this.x = Math.floor(Math.random() * (canvas.width/this.largura)) * 10;
        this.y = Math.floor(Math.random() * (canvas.height/this.altura)) * 10;
        this.cor = cor;
    }
}