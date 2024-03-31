function Corpo(context) {
    this.context = context;
    this.x       = 0;
    this.y       = 0;
    this.largura = 0;
    this.altura  = 0;
    this.cor     = "black";
}

Corpo.prototype = {
    desenhar: function() {
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
        ctx.restore();
    },
    atualizar: function() {
        
    },
    retangulosColisao: function() {
        return [
            {x: this.x, y: this.y, largura: this.largura, altura: this.altura}
        ];
    },
    colidiuCom: function(sprite) {
        
    }
}