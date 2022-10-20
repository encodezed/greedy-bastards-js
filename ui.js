let vial
let vial2
let vida
let fonte


function iniUi()
{

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

}

function drawUI ()
{
camera.off ()
vida.draw()
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

}