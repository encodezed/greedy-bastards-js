

const animacoes = {
    idle:0,
    ataca:1
}

function preload ()
{  
    
    

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
    }
}

function setup()
{
   
    createCanvas (800,600);
    noSmooth()
    initMundo()
    iniPersonagem();
    iniUi()

    doAnim(animacoes.idle)
    
    iniInimigos()
    doAnimIni()
        
}




function draw()
{
camera.x = personagem.x
camera.y = personagem.y
background (20);
gradiente();

camera.on();

camera.zoom = 2.5;
//allSprites.draw();

//o codigo abaixo possibilita vc mudar de cor apenas um pedaço do personagem
//tint (200,10,10)
//personagem.corpo.cabeca.draw()
drawMundo();
drawPlayer();

drawInimigos();
drawUI();


}



function gradiente ()
{
   
    c1 = color(25,30);
    c2 = color(63, 91, 91,100);
    
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
    
}