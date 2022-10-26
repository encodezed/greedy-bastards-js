/*
coisas relacionadas ao player

todo:
COLOCAR colisores dentro do corpo ja setar todos

*/
let gchar
let personagem

let bcima 
let bbaixo
let besquerda
let bdireita

const animacoes = {
    idle:0,
    ataca:1
}

//funcao que anima o corpo do personagem
//todo: selecionar se faz uma vez ou loop, se for uma vez oq vem depois ou volta pro idle
function doAnim(animacao = animacoes.idle){


    if (animacao == animacoes.idle)
    {
        let ani = personagem.corpo.cabeca.animation //pega a spritesheet
        let imagem = ani.images[0] //pega a imagem que esta no personagem
    
        p5.tween.manager
            .addTween (personagem.corpo.tronco)
            .addMotion ('scale', 1.03,1000,'easeInOutSin')
            .startLoop()
        p5.tween.manager
            .addTween (personagem.corpo.cabeca)
            .addMotion ('scale', 1.01,2000,'easeInOutSin')
            .startLoop()
        p5.tween.manager
            .addTween (personagem.corpo.bracodireito)
            .addMotion ('scale', 1.01,2000,'easeInOutSin')
            .startLoop()
    //    p5.tween.manager
      //      .addTween (personagem.corpo.armaesquerda)
        //    .addMotion ('rotation', 151,2000,'easeInOutSin')
         //   .startLoop()
    }
}

function iniPersonagem() {

    personagem = {
        nome: "Menina Gato",
        velocidade: 64,
        x:width/2,//offset x da posicao
        y:height/2,//offset y da posicao
        colisorcima :  new Sprite(0,0,20,20),
        colisorbaixo :  new Sprite(0,0,20,20),
        colisoresquerda :  new Sprite(0,0,20,20),
        colisordireita :  new Sprite(0,0,20,20),

        corpo:{
            katana: new Sprite(loadImage("Arte/Sprites/Player/meninagato/katana.png")),
            rabo: new Sprite(loadImage("Arte/Sprites/Player/meninagato/rabo.png")),
            bracoesquerdo: new Sprite(loadImage("Arte/Sprites/Player/meninagato/bracoesquerdo.png")),
            bracodireito: new Sprite(loadImage("Arte/Sprites/Player/meninagato/bracodireito.png")),
            pernas: new Sprite(loadImage("Arte/Sprites/Player/meninagato/pernas.png")),
            armaesquerda: new Sprite(loadImage("Arte/Sprites/Item/Longa.png")),
            tronco: new Sprite(loadImage("Arte/Sprites/Player/meninagato/tronco.png")),
            cabeca: new Sprite(loadImage("Arte/Sprites/Player/meninagato/cabeca.png")),
            sombra: new Sprite(loadImage("Arte/Sprites/Player/meninagato/sombra.png"))
       
        }
    };


    gchar = new Group() //um grupo com o corpo todo 
    gchar.push (personagem.corpo.katana)
    gchar.push (personagem.corpo.rabo)
    gchar.push (personagem.corpo.armaesquerda)
    gchar.push (personagem.corpo.bracoesquerdo)
    gchar.push (personagem.corpo.bracodireito)
    gchar.push (personagem.corpo.pernas)
    gchar.push (personagem.corpo.tronco)
    gchar.push (personagem.corpo.cabeca)
    gchar.push (personagem.corpo.sombra)



    personagem.corpo.cabeca.x = width / 2;
    personagem.corpo.cabeca.y = height / 2;
    personagem.corpo.cabeca.overlap(allSprites);

    personagem.corpo.tronco.x = width / 2;
    personagem.corpo.tronco.y = height / 2 + 8;
    personagem.corpo.tronco.overlap(allSprites);

    personagem.corpo.bracoesquerdo.x = width / 2 - 9;
    personagem.corpo.bracoesquerdo.y = height / 2 + 8;
    personagem.corpo.bracoesquerdo.overlap(allSprites);
    personagem.corpo.bracoesquerdo.rotation = 23
   
    personagem.corpo.armaesquerda.x = width /2-14
    personagem.corpo.armaesquerda.y = height/2+4
    personagem.corpo.armaesquerda.rotation = 150
    personagem.corpo.armaesquerda.scale = 0.25
    
    

    personagem.corpo.bracodireito.x = width / 2 + 8;
    personagem.corpo.bracodireito.y = height / 2 + 9;
    personagem.corpo.bracodireito.overlap(allSprites);

    personagem.corpo.pernas.x = width / 2 - 1;
    personagem.corpo.pernas.y = height / 2 + 17;
    personagem.corpo.pernas.overlap(allSprites);

    personagem.corpo.sombra.x = width / 2 - 0.5;
    personagem.corpo.sombra.y = height / 2 + 19;
    personagem.corpo.sombra.overlap(allSprites);

    personagem.corpo.rabo.x = width / 2 + 13.5;
    personagem.corpo.rabo.y = height / 2 + 4;
    personagem.corpo.rabo.overlap(allSprites);

    personagem.corpo.katana.x = width / 2 + 10;
    personagem.corpo.katana.y = height / 2 - 5;
    personagem.corpo.katana.overlap(allSprites);
    
    personagem.colisorcima.nome = "colisor-cima"
    personagem.colisorcima.x = personagem.corpo.tronco.x
    personagem.colisorcima.y = personagem.corpo.tronco.y-64
    personagem.colisorcima.rotationLock = true

    personagem.colisorbaixo.nome = "colisor-baixo"
    personagem.colisorbaixo.x = personagem.corpo.tronco.x
    personagem.colisorbaixo.y = personagem.corpo.tronco.y+64
    personagem.colisorbaixo.rotationLock = true


    personagem.colisoresquerda.nome = "colisor-esquerda"
    personagem.colisoresquerda.x = personagem.corpo.tronco.x-34
    personagem.colisoresquerda.y = personagem.corpo.tronco.y
    personagem.colisoresquerda.rotationLock = true


    personagem.colisordireita.nome = "colisor-direita"
    personagem.colisordireita.x = personagem.corpo.tronco.x+64
    personagem.colisordireita.y = personagem.corpo.tronco.y
    personagem.colisordireita.rotationLock = true

    personagem.corpo.armaesquerda.overlap(allSprites)
    //personagem.colisorcima.overlaps(gparedes)
    doAnim(animacoes.idle)
}


function drawPlayer()
{
    personagem.corpo.armaesquerda.draw()  
    gchar.draw()
}
