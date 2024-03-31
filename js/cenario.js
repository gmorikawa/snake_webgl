function Cenario(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.velocidade = 0;
    this.posicaoEmenda = 0;
}

Cenario.prototype = {
    atualizar: function() {
        // atualizar posição da emenda
        this.posicaoEmenda += this.velocidade;
        // verificar se a emenda passou da posição
        if(this.posicaoEmenda > this.imagem.width) {
            this.posicaoEmenda = 0;
        }
    },
    desenhar: function() {
        var img = this.imagem;
        var posicaoX = this.posicaoEmenda - img.width;
        this.context.drawImage(img, posicaoX, 0, img.width, img.height);
        //segunda imagem
        posicaoX = this.posicaoEmenda;
        this.context.drawImage(img, posicaoX, 0, img.width, img.height);
    }
    
}