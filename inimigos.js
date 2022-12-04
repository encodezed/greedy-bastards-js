
let ginimigos


let goblin 
let traps = []
const GOBLIN = 0
const SOMBRA = 0
const PERNAS = 1 
const BRACODIREITO = 2
const TRONCO = 3
const BRACOESQUERDO = 4
const CABECA = 5

function iniInimigos ()
{


   
    traps.push({
                nome:"goblin",
                x:width/2 + 64,
                y:height/2 + 64,
                corpo : new Group()

    });


    let sombra = new Sprite (loadImage("Arte/Sprites/Goblin/sombra.png"));
    sombra.overlap(allSprites);
    sombra.x = traps[GOBLIN].x 
    sombra.y = traps[GOBLIN].y +21
    sombra.scale = 1.9
  
    traps[GOBLIN].corpo.push (sombra);

    let pernas = new Sprite (loadImage("Arte/Sprites/Goblin/pernas.png"));
    pernas.overlap(allSprites);
    pernas.x = traps[GOBLIN].x -1
    pernas.y = traps[GOBLIN].y +29
    pernas.scale = 1.2
  
    traps[GOBLIN].corpo.push (pernas);

    let bracodireito = new Sprite (loadImage("Arte/Sprites/Goblin/bracodireito.png"));
    bracodireito.overlap(allSprites);
    bracodireito.x = traps[GOBLIN].x+19
    bracodireito.y = traps[GOBLIN].y +3
    bracodireito.scale = 1.2
  
    traps[GOBLIN].corpo.push (bracodireito);

    let tronco = new Sprite (loadImage("Arte/Sprites/Goblin/tronco.png"));
    tronco.overlap(allSprites);
    tronco.x = traps[GOBLIN].x
    tronco.y = traps[GOBLIN].y
    tronco.scale = 1.2
  
    traps[GOBLIN].corpo.push (tronco);


    let bracoesquerdo = new Sprite (loadImage("Arte/Sprites/Goblin/bracoesquerdo.png"));
    bracoesquerdo.overlap(allSprites);
    bracoesquerdo.x = traps[GOBLIN].x-12
    bracoesquerdo.y = traps[GOBLIN].y 
    bracoesquerdo.scale = 1.2
  
    traps[GOBLIN].corpo.push (bracoesquerdo);



    let cabeca = new Sprite (loadImage("Arte/Sprites/Goblin/cabeca.png"));
    cabeca.overlap(allSprites);
    cabeca.x = traps[GOBLIN].x +1.1
    cabeca.y = traps[GOBLIN].y -13
    cabeca.scale = 1.2
  
    traps[GOBLIN].corpo.push (cabeca);

}

function doAnimIni()
{
    
    p5.tween.manager
        .addTween (traps[GOBLIN].corpo.get(TRONCO))
        .addMotion ('scale', 1.25,3100,'easeInOutElastic')
        .startLoop()
    p5.tween.manager
        .addTween (traps[GOBLIN].corpo.get(CABECA))
        .addMotion ('scale', 1.25,4000,'easeInOutElastic')
        .startLoop()

        p5.tween.manager
        .addTween (traps[GOBLIN].corpo.get(BRACODIREITO))
        .addMotion ('rotation', 1,2000,'easeInOutElastic')
        .startLoop()

        p5.tween.manager
        .addTween (traps[GOBLIN].corpo.get(BRACOESQUERDO))
        .addMotion ('rotation', -2,2300,'easeInOutElastic')
        .startLoop()

}
function criaInimigo()
{



}

function drawInimigos()
{
 
    for (inimigo of traps)
    {

        inimigo.corpo.draw()

    }


}