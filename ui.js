/*
UI
TODOS:



DONE:
    -overlay transparente

*/

let vial
let vial2
let vida
let vidaoverlay
let fonte
let spotlight
let imgspotlight


function iniUi()
{
    imgspotlight = loadImage("Arte/UI/spotlight.png")

    fonte = loadFont("/fontes/blocks.ttf")


    vial = new Sprite (loadImage("Arte/UI/vial.png"))
    vial.overlap (allSprites)
    vial.x = 90
    vial.y = height - 90
    vial.scale = 2.5

    vial2 = new Sprite (loadImage("Arte/UI/vial.png"))
    vial2.overlap (allSprites)
    vial2.x = width-90
    vial2.y = height - 90
    vial2.scale = 2.5

    vida = new Sprite (loadImage("Arte/UI/vida.png"))
    vida.overlap (allSprites)
    vida.x = 90
    vida.y = height - 90
    vida.scale = 2.8


    vidaoverlay = new Sprite (loadImage("Arte/UI/vida.png"))
    vidaoverlay.overlap (allSprites)
    vidaoverlay.x = 90
    vidaoverlay.y = height - 140
    vidaoverlay.scale = 2.8


    spotlight = new Sprite(imgspotlight)
    spotlight.x =width/2
    spotlight.y = height/2
    spotlight.scale = 0.75
    spotlight.overlap(allSprites)
   

}

function drawSpotlight()
{
    camera.off()
    push()
    blendMode(OVERLAY)
    tint (210,210,190,noise(cos(frameCount*2))*455)
    spotlight.draw()
    pop()
    spotlight.x =width/2
    spotlight.y = height/2
    camera.on()


}

function drawVida ()
{

    camera.off()

    push()
    vida.draw()
  
    blendMode(REMOVE)
    
    vidaoverlay.draw()
   
    pop()
    camera.on()

}

function drawUI ()
{
camera.off ()


vial.draw()
vial2.draw()
push()
fill (155)
textSize(20)
rectMode(CENTER)

rect(width/2,height-90, 50,50)

rect(width/2- 60,height-90, 50,50)

rect(width/2+60 ,height-90, 50,50)

textFont (fonte)


textAlign(CENTER)
text ("greedy bastards - the catgirls tail - ver. 0.1a - @zednaked - 2022",width/2,15)
text ("OURO: 10",width/2,height-20)
text ("PERÍCIAS",width/2,height-130)
text ("XP: 5",width/2,height-40)
pop()
camera.on()
}