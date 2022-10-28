p5.disableFriendlyErrors = true
/*
Estagio de testes

TODOS:

    - zoom in e out
    - mover o terreno

    - criar paleta de peças movivel (UI)
        shape draggable
        coisas nela q andam junto


*/


//coisas da paleta

let bx;
let by;
let boxSize = 140;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

//--

let gspr
let imgCSE
let imgCSD
let imgCIE
let imgCID
let imgE
let imgD
let imgC
let imgB
let imgchao
let imgSelecionada

let zoomatual = 2.2

let sprSelecionado

let tabuleiro = [10]
let chaos = []

function CriaSprite (xx, yy)
{   
    //console.log ("["+floor(xx/(width/10)) +  "][" +floor(yy/(height/10))+ "]" )
    xx =  floor(xx/(width/10))*(width/10)+(width/20) 
    yy= floor(yy/(height/10))*(height/10)+(height/20)
    let spr = new Sprite(xx, yy, width/10,height/10)
    
    spr.tileSize = width/10
    
    

    if (imgSelecionada === chaos[0])
    {
     shuffleArray(chaos)
     spr.addAni(chaos[0])
     spr.rotation = 90 * floor(random (4))
    }else{

        spr.addAni (imgSelecionada)
    }
    spr.scale = 1.25
    spr.overlap (allSprites)
    sprSelecionado= spr
  //  spr.move ('up')
    gspr.push (spr)
}

function geraGrade()
{
    const linhas = 10
    const colunas = 10
    //imgSelecionada = chaos[0]
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
           // line (0,yy*(height/linhas), width,yy*(height/linhas) )
            //meio

            imgSelecionada = chaos[0]
            CriaSprite (xx * (width/colunas), yy * (height/linhas))
            //point(xx*(width/colunas)+(width/10)/2, yy * (height/linhas)+ (height/10)/2)
            
            //colunas
            //line ( xx * (width/colunas), 0 , xx * (width/colunas), height )

        }


    }


}
/*

    entra: 500x300
*/

function keyReleased()
{
    switch (keyCode){
        case 48:
            imgSelecionada = chaos[0]
            break        
        case 49:
            imgSelecionada = imgE
            break
        case 50:
            imgSelecionada = imgCSE
            break
        case 51:
            imgSelecionada = imgC
            break
        case 68:
            sprSelecionado.rotation += 90
            break

        case 189:
            zoomatual -= 0.5
            break
    
        case 187:
            zoomatual += 0.5
            break
        case UP_ARROW:
            camera.y -= 10
            break
        case DOWN_ARROW:
            camera.y += 10
            break
        case LEFT_ARROW:
            camera.x -= 10
            break
        case RIGHT_ARROW:
            camera.x += 10
            break
        case 87:
            sprSelecionado.move ("up")
            break
    }

}

function mouseClicked()
{

CriaSprite(mouse.x, mouse.y);


}
function mousePressed() {
    if (overBox) {
      locked = true;
      fill(150, 122, 158)
    } else {
      locked = false;
    }
    xOffset = mouseX - bx;
    yOffset = mouseY - by;
  }

function mouseDragged() {
    if (locked) {
      bx = mouseX - xOffset;
      by = mouseY - yOffset;
    }
  }
  
  function mouseReleased() {
    locked = false;
  }



function preload ()
{  
   
imgchao = loadImage ("Arte/Paredes/15.png")
chaos.push (imgchao)
imgchao = loadImage ("Arte/Paredes/16.png")
chaos.push (imgchao) 
imgchao = loadImage ("Arte/Paredes/17.png")
chaos.push (imgchao) 

imgCSE= loadImage ("Arte/Paredes/00.png") //alterar pra usar um so mirror h e w
imgCC= loadImage ("Arte/Paredes/08.png")
imgCSE2= loadImage ("Arte/Paredes/07.png")
imgE= loadImage ("Arte/Paredes/14.png")
imgC= loadImage ("Arte/Paredes/02.png")
    
}



function setup()
{
   
   imgSelecionada = imgchao
    gspr = new Group()
    createCanvas (800,800);
    noSmooth()
    background(155)
    geraGrade()
    bx = width / 2.0;
     by = height / 2.0;
    rectMode(RADIUS);
     strokeWeight(2);
   
        
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function draw()
{


clear()

camera.on();

camera.zoom = zoomatual;


allSprites.draw()
camera.off()

strokeCap(ROUND)
strokeWeight(5)

  if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      stroke(255);
     
      fill(150, 122, 158);
    }
  } else {
    stroke(226, 220, 176);
    fill(122, 122, 158);
    overBox = false;
  }

 


  push()
  noStroke()
  fill (0,20)
  rect(bx+10, by+10, boxSize, boxSize);
  pop ()
  rect(bx, by, boxSize, boxSize);
  noStroke()
  fill (10)
  textSize(17)
  //rectMode(CORNERS)
  textAlign(CENTER)
  text ("BG mapeador - by @ZeDnaked", bx, by-100)

  text ("Paleta de Tiles", bx, by-74)
  
  image(chaos[0], bx-120, by -40,50,50)
  image(chaos[1], bx-60, by -40,50,50)
  image(chaos[2], bx, by -40,50,50)
  image(imgC, bx+60, by -40,50,50)

  image(imgCSE, bx-120, by +20,50,50)
  image(imgCC, bx-60, by +20,50,50)
  image(imgC, bx, by +20,50,50)
  image(imgE, bx+60, by +20,50,50)


  image(imgCSE2, bx-120, by +80,50,50)
  image(chaos[1], bx-60, by +80,50,50)
  image(chaos[2], bx, by +80,50,50)
  image(chaos[2], bx+60, by +80,50,50)




//allSprites.draw();

//o codigo abaixo possibilita vc mudar de cor apenas um pedaço do personagem
//tint (200,10,10)
//personagem.corpo.cabeca.draw()

//personagem.corpo.bracoesquerdo.rotation = rotation

}

