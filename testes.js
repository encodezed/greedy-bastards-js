p5.disableFriendlyErrors = true
/*
Estagio de testes

TODOS:



*/

let gspr

let tabuleiro = [10]

function CriaSprite (xx, yy)
{   
   
    let spr = new Sprite(xx, yy, width/10,height/10)
    spr.tileSize = width/10
    spr.overlap (allSprites)
    
  //  spr.move ('up')
    gspr.push (spr)
}

function geraGrade()
{
    const linhas = 10
    const colunas = 10

    for (xx = 0; xx < colunas;xx ++ )
    {
        for (yy = 0; yy <linhas; yy++)
        {
            tabuleiro[xx] = [yy];
            tabuleiro[xx][yy] = { 
                                    x:xx*(width/colunas),
                                    y:yy*(height/linhas)

            }
            //linhas
            line (0,yy*(height/linhas), width,yy*(height/linhas) )
            //meio
            point(xx*(width/colunas)+(width/10)/2, yy * (height/linhas)+ (height/10)/2)
            
            //colunas
            line ( xx * (width/colunas), 0 , xx * (width/colunas), height )

        }


    }


}
/*

    entra: 500x300

*/

function keyReleased()
{


}

function mouseClicked()
{

CriaSprite(floor(mouse.x/(width/10))*(width/10)+(width/20), floor(mouse.y/(height/10))*(height/10)+(height/20))


}

function preload ()
{  
    
    

}



function setup()
{
   //
   gspr = new Group()
    createCanvas (800,800);
    noSmooth()
    background(155)
    geraGrade()
        
}




function draw()
{




camera.on();

//camera.zoom = 2.5;
//allSprites.draw();

//o codigo abaixo possibilita vc mudar de cor apenas um pedaço do personagem
//tint (200,10,10)
//personagem.corpo.cabeca.draw()

//personagem.corpo.bracoesquerdo.rotation = rotation

}

