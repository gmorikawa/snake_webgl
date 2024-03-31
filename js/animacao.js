function Animacao(context) {
    this.context = context; // obtem o objeto contexto HTML5
    this.sprites = []; // permite a inclusão de sprites na animação
    this.ligado = false; // definirá se pode ou não animar
    this.processamentos = [];
}

Animacao.prototype = {
    novoSprite: function(sprite) {
        // inclui um sprite no array de sprites de animação
        this.sprites.push(sprite);
        // associando a animação ao Sprite recebido 
        sprite.animacao = this;
    },
    ligar: function() {
        this.ligado = true;
        this.proximoFrame(); // coração da classe animação
    },
    desligar: function() {
        this.ligado = false;
    },
    limparTela: function() {
        var ctx = this.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    proximoFrame: function() {
        if(!this.ligado) return; // verifica se pode animar
        this.limparTela(); // limpa a tela a cada ciclo
        // percorre o array de sprite para atualizar
        for(var i in this.sprites)
            this.sprites[i].atualizar();
        
        // percorre o array de sprite para desenhar
        for(var i in this.sprites)
            this.sprites[i].desenhar();
        
        // percorre o processamento de colisão
        for(var i in this.processamentos) {
            this.processamentos[i].processar();
        }
        // referenciar o objeto de animação na função
        var animacao = this; // TEM QUE SER FEITO ASSIM
        requestAnimationFrame(function() {
            animacao.proximoFrame();
        });
    },
    novoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    }
}