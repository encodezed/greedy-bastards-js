p5.disableFriendlyErrors = true
/*
esse é o main 

TODOS:
    -animação relativa a player no player.js e inimigo em inimigos.js
    -animar um createGraphics() e plotar isso no sprite e não animar os sprites, 
    qdo animar o sprite vai tudo junto
    -carregar imagens no preload()


*/
var rotation = 100  
var gui



function preload ()
{  
    
    

}



function setup()
{
   //
    createCanvas (800,600);
    noSmooth()
    

    iniPersonagem();
    initMundo()
   
    iniUi()

//    gui = createGui ()
 //   gui.addGlobals ('rotation')
   // sliderRange (0,360,10)
   // gui.addGlobals ('personagem.corpo.bracoesquerdo.rotation' )
    
    iniInimigos()
    doAnimIni()
    //doGreedynomicon()
        
}




function draw()
{
camera.x = personagem.x
camera.y = personagem.y

background (0);


camera.on();
//allSprites.debug = true 
tint(240+ noise (frameCount)*300,240+ noise (frameCount)*300,140+ noise (frameCount)*200)
//gparedes.debug = true

camera.zoom = 2.5;
//allSprites.draw();

//o codigo abaixo possibilita vc mudar de cor apenas um pedaço do personagem
//tint (200,10,10)
//personagem.corpo.cabeca.draw()

//personagem.corpo.bracoesquerdo.rotation = rotation
drawMundo();


drawInimigos();


drawPlayer()


drawGreedynomicon();
drawSpotlight();
drawVida()
drawUI();


}

