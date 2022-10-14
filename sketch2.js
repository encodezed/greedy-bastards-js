let gchar
let personagem
function preload ()
{
   
    gchar = new Group()
    personagem = {
        nome: "Menina Gato",
        velocidade: 20,
        x:width/2,//offset x da posicao
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
}

//funcao que anima o corpo do personagem
function doAnim(){



}

function mouseClicked()
{
   
}

function moveDireita (qtd)
{

    personagem.corpo.cabeca.x += qtd
    personagem.corpo.tronco.x += qtd
    personagem.corpo.bracodireito.x += qtd
    personagem.corpo.bracoesquerdo.x += qtd
   
    personagem.corpo.pernas.x += qtd
    if (personagem.corpo.rabo.mirror.x){

        personagem.corpo.katana.x += qtd 
        personagem.corpo.rabo.x += qtd
    }else{
        personagem.corpo.katana.x += qtd -22
        personagem.corpo.rabo.mirror.x = true
        personagem.corpo.katana.mirror.x = true
        personagem.corpo.rabo.x += qtd -28
    }
    personagem.corpo.sombra.x += qtd
    personagem.corpo.cabeca.mirror.x = true
    

}

function moveEsquerda (qtd)
{
    personagem.corpo.cabeca.x -= qtd
    personagem.corpo.tronco.x -= qtd
    personagem.corpo.bracodireito.x -= qtd
    personagem.corpo.bracoesquerdo.x -= qtd
    
    personagem.corpo.pernas.x -= qtd
    if (personagem.corpo.rabo.mirror.x)
    {
        personagem.corpo.katana.x -= qtd -22
        personagem.corpo.rabo.mirror.x = false
        personagem.corpo.katana.mirror.x = false
        personagem.corpo.rabo.x -= (qtd - 28)
    }else{
        personagem.corpo.rabo.x -= qtd
        personagem.corpo.katana.x -= qtd 
    }
     
    personagem.corpo.sombra.x -= qtd
    personagem.corpo.cabeca.mirror.x = false
    
}

function moveCima (qtd)
{
    personagem.corpo.cabeca.y -= qtd
    personagem.corpo.tronco.y -= qtd
    personagem.corpo.bracodireito.y -= qtd
    personagem.corpo.bracoesquerdo.y -= qtd
    personagem.corpo.katana.y -= qtd 
    personagem.corpo.pernas.y -= qtd
    personagem.corpo.rabo.y -= qtd 
    personagem.corpo.sombra.y -= qtd
}
function moveBaixo (qtd)
{
    personagem.corpo.cabeca.y += qtd
    personagem.corpo.tronco.y += qtd
    personagem.corpo.bracodireito.y += qtd
    personagem.corpo.bracoesquerdo.y += qtd
    personagem.corpo.katana.y += qtd 
    personagem.corpo.pernas.y += qtd
    personagem.corpo.rabo.y += qtd 
    personagem.corpo.sombra.y += qtd
}

function keyReleased()
{
    switch (keyCode){
        case RIGHT_ARROW:
            moveDireita (personagem.velocidade)
            break;
        case LEFT_ARROW:
            moveEsquerda(personagem.velocidade)
            break;
        case UP_ARROW:
            moveCima(personagem.velocidade)
            break
        case DOWN_ARROW:
            moveBaixo(personagem.velocidade)
            break
    }


}

function setup()
{
   
    createCanvas (500,500);
    noSmooth()
    personagem.corpo.cabeca.x = width/2;
    personagem.corpo.cabeca.y = height/2;
    personagem.corpo.cabeca.overlap(allSprites)

    personagem.corpo.tronco.x = width/2;
    personagem.corpo.tronco.y = height/2+8;
    personagem.corpo.tronco.overlap(allSprites)

    personagem.corpo.bracoesquerdo.x = width/2- 9;
    personagem.corpo.bracoesquerdo.y = height/2+8;
    personagem.corpo.bracoesquerdo.overlap(allSprites)

    personagem.corpo.bracodireito.x = width/2+ 8;
    personagem.corpo.bracodireito.y = height/2+9;
    personagem.corpo.bracodireito.overlap(allSprites)

    personagem.corpo.pernas.x = width/2-1;
    personagem.corpo.pernas.y = height/2+17;
    personagem.corpo.pernas.overlap(allSprites)

    personagem.corpo.rabo.x = width/2+13.5;
    personagem.corpo.rabo.y = height/2+4;
    personagem.corpo.rabo.overlap(allSprites)

    personagem.corpo.katana.x = width/2+10;
    personagem.corpo.katana.y = height/2-5;
    personagem.corpo.katana.overlap(allSprites)

    let ani = personagem.corpo.cabeca.animation
    let imagem = ani.images[0]
  
    p5.tween.manager
        .addTween (personagem.corpo.tronco)
        .addMotion ('scale', 1.03,1000,'easeInOutQuint')
        .startLoop()
    p5.tween.manager
        .addTween (personagem.corpo.cabeca)
        .addMotion ('scale', 1.01,2000,'easeInOutQuint')
        .startLoop()
    p5.tween.manager
        .addTween (personagem.corpo.bracodireito)
        .addMotion ('scale', 1.01,2000,'easeInOutQuint')
        .startLoop()
        
}

function draw()
{
background (155)
camera.on()
camera.zoom = 5
allSprites.draw()

//o codigo abaixo possibilita vc mudar de cor apenas um pedaço do personagem
//tint (200,10,10)
//personagem.corpo.cabeca.draw()

}