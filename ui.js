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
let fontegoteca
let spotlight
let imgspotlight
let inventario = false

let imggreedynomicon
let greedynomicon


function iniUi()
{
    imgspotlight = loadImage("Arte/UI/spotlight.png")

    imggreedynomicon = loadImage ("Arte/UI/greedynomicon.png")


    fonte = loadFont("/fontes/blocks.ttf")
    fontegoteca = loadFont("/fontes/gothic.ttf")

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
    spotlight.static = true
   

}
function drawGreedynomicon(){

    //camera.off()
    //push()
    if (inventario)
    {
        fill(0,150)
        rect(0,0,width,height)
        tint(355,355,190,250)
        greedynomicon.draw()
        
        
        
        noFill()
        
        rect(personagem.x +50,personagem.y-10, 15,15)
        rect(personagem.x+50,personagem.y-10-16, 15,15)
        rect(personagem.x+50,personagem.y-10+16, 15,15)
        rect(personagem.x+50+16,personagem.y-10, 15,15)
        rect(personagem.x+50-16,personagem.y-10, 15,15)
     

        for (let a=0;a <5;a++)
        {
            for (let b=0; b< 3;b++)
            {
                rect(personagem.x-98+(a*17),personagem.y-27+(b*17), 15,15)

            }
           
        }
        

        blendMode(MULTIPLY)

 
        
        
        fill(0)
        rectMode(CENTER)
        rotate(radians(-200))

        
        blendMode(MULTIPLY)

        textFont(fontegoteca)
        textSize(14)
        fill (244,10,10)
        text("The Greedynomicon", (personagem.x)-120 ,(personagem.y)-25)
        rotate(radians(-210))
        textSize(12)
        text("Mochila", personagem.x-140 ,personagem.y+9)
        text("Equipado", personagem.x ,personagem.y+27)
        //camera.on()
        //pop()
    }


}

function doGreedynomicon ()

{   
    if (!inventario){
       
        greedynomicon = new Sprite(imggreedynomicon)

        greedynomicon.scale = .3
        greedynomicon.overlap (allSprites)
        greedynomicon.x = personagem.x
        greedynomicon.y = personagem.y
    }else{

        greedynomicon.remove()

    }
    inventario = !inventario

    



}

function drawSpotlight()
{
    camera.off()
    push()
    blendMode(OVERLAY)
    tint (215,225,140,210+noise(cos(frameCount*15))*25)
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
text ("PER??CIAS",width/2,height-130)
text ("XP: 5",width/2,height-40)
pop()
camera.on()
}