/*
coisas relacionadas ao player



*/
let gchar
let personagem

function iniPersonagem() {

    personagem = {
        nome: "Menina Gato",
        velocidade: 64,
        x:width/2
        
        ,//offset x da posicao
        y:height/2,//offset y da posicao
        corpo:{
            katana: new Sprite(loadImage("Arte/Sprites/Player/meninagato/katana.png")),
            rabo: new Sprite(loadImage("Arte/Sprites/Player/meninagato/rabo.png")),
            bracoesquerdo: new Sprite(loadImage("Arte/Sprites/Player/meninagato/bracoesquerdo.png")),
            bracodireito: new Sprite(loadImage("Arte/Sprites/Player/meninagato/bracodireito.png")),
            pernas: new Sprite(loadImage("Arte/Sprites/Player/meninagato/pernas.png")),
            tronco: new Sprite(loadImage("Arte/Sprites/Player/meninagato/tronco.png")),
            cabeca: new Sprite(loadImage("Arte/Sprites/Player/meninagato/cabeca.png")),
            sombra: new Sprite(loadImage("Arte/Sprites/Player/meninagato/sombra.png"))
        }
    };

   
    gchar = new Group() //um grupo com o corpo todo 
    gchar.push (personagem.corpo.katana)
    gchar.push (personagem.corpo.rabo)
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

    doAnim(animacoes.idle)
}


function drawPlayer()
{

gchar.draw()

}