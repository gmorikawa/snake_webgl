function Cobra(context) {
    this.context    = context;
    this.x          = 0;
    this.y          = 0;
    this.velocX     = 0;
    this.velocY     = 0;
    this.largura    = 0;
    this.altura     = 0;
    this.cor        = "black";
    this.interval   = 200;
    this.anterior   = new Date().getTime();
    this.objetos    = [];
}

Cobra.prototype = {
    atualizar: function() {
        if(this.x > this.context.canvas.width)
            this.x = -this.largura;
        if(this.x < -this.largura)
            this.x = this.context.canvas.width;
        
        if(this.y > this.context.canvas.height)
            this.y = -this.altura;
        if(this.y < -this.altura)
            this.y = this.context.canvas.height;
        
        var agr = new Date().getTime();
        var decorrido = agr - this.anterior;
        if(decorrido >= this.interval) {
            if(this.objetos.length > 0) {
                for(var i = this.objetos.length-1; i > 0; i--) {
                    this.objetos[i].x = this.objetos[i-1].x;
                    this.objetos[i].y = this.objetos[i-1].y;
                }
                this.objetos[0].x = this.x;
                this.objetos[0].y = this.y;
            }
            
            this.x += this.velocX;
            this.y += this.velocY;
            this.anterior = agr;
        }
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
        if(sprite instanceof Ponto) {
            this.adicionarCorpo();
        }
        if(sprite instanceof Corpo) {
            alert("COLIDIU COM CORPO");
        }
    },
    adicionarCorpo: function() {
        var qtde = this.objetos.length;
        var corpo = new Corpo(this.context);
        if(qtde == 0) {
            corpo.x = this.x - this.velocX;
            corpo.y = this.y - this.velocY;
        }
        else {
            corpo.x = this.objetos[qtde-1].x;
            corpo.y = this.objetos[qtde-1].y;
        }
        
        corpo.largura = this.largura;
        corpo.altura = this.altura;
        corpo.cor = "green";
        this.animacao.novoSprite(corpo);
        this.colisor.novoSprite(corpo);
        this.objetos.push(corpo);
    },
    moverDireita: function() {
        if(this.velocX == 0) {
            this.velocX = this.velocY;
            this.velocY = 0;
        }
        if(this.velocX < 0)
            this.velocX *= -1;
    },
    moverEsquerda: function() {
        if(this.velocX == 0) {
            this.velocX = this.velocY;
            this.velocY = 0;
        }
        if(this.velocX > 0)
            this.velocX *= -1;
    },
    moverAcima: function() {
        if(this.velocY == 0) {
            this.velocY = this.velocX;
            this.velocX = 0;
        }
        if(this.velocY > 0)
            this.velocY *= -1;
    },
    moverAbaixo: function() {
        if(this.velocY == 0) {
            this.velocY = this.velocX;
            this.velocX = 0;
        }
        if(this.velocY < 0)
            this.velocY *= -1;
    },
}