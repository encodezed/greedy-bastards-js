
let ginimigos


let goblin 
let inimigos = []
const GOBLIN = 0
const SOMBRA = 0
const PERNAS = 1 
const BRACODIREITO = 2
const TRONCO = 3
const BRACOESQUERDO = 4
const CABECA = 5

function iniInimigos ()
{


   
    inimigos.push({
                nome:"goblin",
                x:width/2 + 50,
                y:height/2+7,
                corpo : new Group()

    });


    let sombra = new Sprite (loadImage("Arte/Sprites/Goblin/sombra.png"));
    sombra.overlap(allSprites);
    sombra.x = inimigos[GOBLIN].x 
    sombra.y = inimigos[GOBLIN].y +13.4
    sombra.scale = 0.8
  
    inimigos[GOBLIN].corpo.push (sombra);

    let pernas = new Sprite (loadImage("Arte/Sprites/Goblin/pernas.png"));
    pernas.overlap(allSprites);
    pernas.x = inimigos[GOBLIN].x -0.5
    pernas.y = inimigos[GOBLIN].y +18
    pernas.scale = 0.8
  
    inimigos[GOBLIN].corpo.push (pernas);

    let bracodireito = new Sprite (loadImage("Arte/Sprites/Goblin/bracodireito.png"));
    bracodireito.overlap(allSprites);
    bracodireito.x = inimigos[GOBLIN].x+17
    bracodireito.y = inimigos[GOBLIN].y +1
    bracodireito.scale = 0.8
  
    inimigos[GOBLIN].corpo.push (bracodireito);

    let tronco = new Sprite (loadImage("Arte/Sprites/Goblin/tronco.png"));
    tronco.overlap(allSprites);
    tronco.x = inimigos[GOBLIN].x
    tronco.y = inimigos[GOBLIN].y
    tronco.scale = 0.8
  
    inimigos[GOBLIN].corpo.push (tronco);


    let bracoesquerdo = new Sprite (loadImage("Arte/Sprites/Goblin/bracoesquerdo.png"));
    bracoesquerdo.overlap(allSprites);
    bracoesquerdo.x = inimigos[GOBLIN].x-7.5
    bracoesquerdo.y = inimigos[GOBLIN].y 
    bracoesquerdo.scale = 0.8
  
    inimigos[GOBLIN].corpo.push (bracoesquerdo);



    let cabeca = new Sprite (loadImage("Arte/Sprites/Goblin/cabeca.png"));
    cabeca.overlap(allSprites);
    cabeca.x = inimigos[GOBLIN].x +1.1
    cabeca.y = inimigos[GOBLIN].y -10
    cabeca.scale = 0.8
  
    inimigos[GOBLIN].corpo.push (cabeca);

}

function doAnimIni()
{
    
    p5.tween.manager
        .addTween (inimigos[GOBLIN].corpo.get(TRONCO))
        .addMotion ('scale', 0.83,3100,'easeInOutElastic')
        .startLoop()
    p5.tween.manager
        .addTween (inimigos[GOBLIN].corpo.get(CABECA))
        .addMotion ('scale', 0.81,4000,'easeInOutElastic')
        .startLoop()

        p5.tween.manager
        .addTween (inimigos[GOBLIN].corpo.get(BRACODIREITO))
        .addMotion ('rotation', 1,2000,'easeInOutElastic')
        .startLoop()

        p5.tween.manager
        .addTween (inimigos[GOBLIN].corpo.get(BRACOESQUERDO))
        .addMotion ('rotation', -2,2300,'easeInOutElastic')
        .startLoop()

}
function criaInimigo()
{



}

function drawInimigos()
{
 
    for (inimigo of inimigos)
    {

        inimigo.corpo.draw()

    }


}