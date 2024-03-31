function Colisor() {
    this.sprites = [];
    //função abstrata para tratar a ação de colisão
    this.aoColidir = null;
}

Colisor.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    processar: function() {
        console.log(this.sprites.length);
        var jaTestados = new Object();
        for(var i in this.sprites) {
            for(var j in this.sprites) {
                if(i == j)
                    continue;
                
                // gerando os ids
                var id1 = this.stringUnica(this.sprites[i]);
                var id2 = this.stringUnica(this.sprites[j]);
                if(!jaTestados[id1])
                    jaTestados[id1] = [];
                if(!jaTestados[id2])
                    jaTestados[id2] = [];
                
                if(!(jaTestados[id1].indexOf(id2) >= 0 || jaTestados[id2].indexOf(id1) >= 0)) {
                    this.testarColisao(this.sprites[i], this.sprites[j]);
                    jaTestados[id1].push(id2);
                    jaTestados[id2].push(id1);
                }
            }
        }
    },
    testarColisao: function(sprite1, sprite2) {
        // recuperando os retangulos de colisao
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();
        
        // testar as colisoes entre os sprites
        // label: para encerrar o loop caso ocorra colisão
        colisoes:
            for(var i in rets1) {
                for(var j in rets2) {
                    if(this.retangulosColidem(rets1[i], rets2[j])) {
                        // ao colidir notificar sprite
                        sprite1.colidiuCom(sprite2);
                        sprite2.colidiuCom(sprite1);
                        
                        if(this.aoColidir) {
                            this.aoColidir(sprite1, sprite2);
                        }
                        
                        // encerra o loop
                        break colisoes;
                    }
                }
            }
    },
    retangulosColidem: function(ret1, ret2) {
        return ((ret1.x + ret1.largura) > ret2.x && 
               ret1.x < (ret2.x + ret2.largura) &&
               (ret1.y + ret1.altura) > ret2.y &&
               ret1.y < (ret2.y + ret2.altura));
    },
    stringUnica: function(sprite) {
        var str = "";
        var retangulos = sprite.retangulosColisao();
        
        for(var i in retangulos) {
            str += "x:" + retangulos[i].x + 
                   " y:" + retangulos[i].y+
                   " altura:" + retangulos[i].altura +
                   " largura:" + retangulos[i].largura;
        }
        return str;
    }
}