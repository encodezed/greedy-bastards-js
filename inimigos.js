
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
                x:width/2 + 64,
                y:height/2 + 64,
                corpo : new Group()

    });


    let sombra = new Sprite (loadImage("Arte/Sprites/Goblin/sombra.png"));
    sombra.overlap(allSprites);
    sombra.x = inimigos[GOBLIN].x 
    sombra.y = inimigos[GOBLIN].y +21
    sombra.scale = 1.9
  
    inimigos[GOBLIN].corpo.push (sombra);

    let pernas = new Sprite (loadImage("Arte/Sprites/Goblin/pernas.png"));
    pernas.overlap(allSprites);
    pernas.x = inimigos[GOBLIN].x -1
    pernas.y = inimigos[GOBLIN].y +29
    pernas.scale = 1.2
  
    inimigos[GOBLIN].corpo.push (pernas);

    let bracodireito = new Sprite (loadImage("Arte/Sprites/Goblin/bracodireito.png"));
    bracodireito.overlap(allSprites);
    bracodireito.x = inimigos[GOBLIN].x+19
    bracodireito.y = inimigos[GOBLIN].y +3
    bracodireito.scale = 1.2
  
    inimigos[GOBLIN].corpo.push (bracodireito);

    let tronco = new Sprite (loadImage("Arte/Sprites/Goblin/tronco.png"));
    tronco.overlap(allSprites);
    tronco.x = inimigos[GOBLIN].x
    tronco.y = inimigos[GOBLIN].y
    tronco.scale = 1.2
  
    inimigos[GOBLIN].corpo.push (tronco);


    let bracoesquerdo = new Sprite (loadImage("Arte/Sprites/Goblin/bracoesquerdo.png"));
    bracoesquerdo.overlap(allSprites);
    bracoesquerdo.x = inimigos[GOBLIN].x-12
    bracoesquerdo.y = inimigos[GOBLIN].y 
    bracoesquerdo.scale = 1.2
  
    inimigos[GOBLIN].corpo.push (bracoesquerdo);



    let cabeca = new Sprite (loadImage("Arte/Sprites/Goblin/cabeca.png"));
    cabeca.overlap(allSprites);
    cabeca.x = inimigos[GOBLIN].x +1.1
    cabeca.y = inimigos[GOBLIN].y -13
    cabeca.scale = 1.2
  
    inimigos[GOBLIN].corpo.push (cabeca);

}

function doAnimIni()
{
    
    p5.tween.manager
        .addTween (inimigos[GOBLIN].corpo.get(TRONCO))
        .addMotion ('scale', 1.25,3100,'easeInOutElastic')
        .startLoop()
    p5.tween.manager
        .addTween (inimigos[GOBLIN].corpo.get(CABECA))
        .addMotion ('scale', 1.25,4000,'easeInOutElastic')
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