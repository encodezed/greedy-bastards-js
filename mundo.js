p5.disableFriendlyErrors = true
/* 
coisas relativas a criação do mundo salas e os escambau

TODOS:
    
    -refazer a geração de mundo para que faça uma matriz e plote essa matriz
    os movimentos e colisoes todas feitas usando a matriz ao inves dessa merda de .play     


    -portas
    -perfumarias
    

    -montar um sistema de enxaixe de uma sala na outra
DONE:

-criar paredes
-overlays com efeitos de luz (UI)
*/

let gsala
let imgchao

let gparedes
let gcolisor

let imgCSE
let imgCSD
let imgCIE
let imgCID
let imgE
let imgD
let imgC
let imgB
function colide (a, b){
    console.log(a.nome+" colidiu com "+ b.nome)

}

function initMundo ()
{
    console.log("initmundo")
    imgchao = loadImage ("Arte/Paredes/17.png")
    imgCSE= loadImage ("Arte/Paredes/00.png") //alterar pra usar um so mirror h e w
    imgCC= loadImage ("Arte/Paredes/08.png")
    imgCSE2= loadImage ("Arte/Paredes/07.png")
   // imgCID= loadImage ("Arte/Paredes/00.png")
    imgE= loadImage ("Arte/Paredes/14.png")
  //  imgD= loadImage ("Arte/Paredes/14.png")
    imgC= loadImage ("Arte/Paredes/02.png")
  //  imgB= loadImage ("Arte/Paredes/02.png")


    gsala = new Group()
    gparedes = new Group()
   // gparedes.overlaps(gcolisor, colide)
   // gcolisor.overlaps(gparedes, colide)
    let spr
    
    const tsala = 4
    const ttile = 64
    

    const woffset = width/2 - ((ttile*tsala)/2)
    const hoffset = height/2 - ((ttile*tsala)/2)

    const tsalapxw = woffset + (ttile*tsala)
    const tsalapxh = hoffset + (ttile*tsala)

    for (let ax = woffset; ax<=tsalapxw; ax += ttile){
        for (let ay = hoffset; ay<=tsalapxh; ay += ttile){
            //primeira coluna
            let xx = (ax - woffset)/ttile
            let yy = (ay - hoffset)/ttile

            if(ay==hoffset)
            {
                //canto superior esquerdo
                if (ax==woffset)
                {
                    plotaTile (imgCSE, ax, ay, true, "CSE")
                    

                    //console.log ((ax - woffset)/ttile)
                }
                //canto inferior esquerdo
                if (ax==tsalapxw)
                {
                 plotaTile (imgCSE, ax, ay, true, "CIE")
                    //console.log ((ax - woffset)/ttile)

                }
                
                //coloca toda a parte superior que faltou
                if ((ax>woffset) && (ax <tsalapxw))
                {
                     plotaTile (imgC, ax, ay, true, "C")
                }

            }

            if (ay==tsalapxh)
            {
                //canto inferior esquerdo
                if (ax==woffset)
                {
                     plotaTile (imgCSE, ax, ay, true, "CIE")
                }
                //canto inferior direito
                if (ax==tsalapxw)
                {
                    plotaTile (imgCSE, ax, ay, true,"CID")
                }
                //coloca toda a parte superior que faltou
                if ((ax>woffset) && (ax <tsalapxw))
                {
                 plotaTile (imgC, ax, ay, true, "B")
                }
            }

            if (ay > hoffset)
            {
                //parede esquerda
                if (ax == woffset)
                {
                   plotaTile (imgE, ax, ay, true, "E")

                }
                //parede direita
                if (ax == tsalapxw)
                {

                  plotaTile (imgE, ax, ay, true), "D"
                }



            }

            //aqui plota o chao
            if ( (ay>hoffset) && (ay < tsalapxh) && (ax>woffset) && (ax<tsalapxw) )
            {
              

               if (yy == 1 && xx>0 ){

                 plotaTile(imgCC,ax,ay)


               }
               
               if (yy == 1 && xx ==0)
               {
                plotaTile(imgCSE2,ax,ay)
               }else if (xx > 0 ){
                plotaTile(imgchao,ax,ay)

               }
                
            } 


            
        }

    }


}


function getIndex()
{

    const tsala = 4
    const ttile = 64
    
    const woffset = personagem.x - ((ttile*tsala)/2)
    const hoffset = personagem.y - ((ttile*tsala)/2)
    console.log(woffset+ " "+ hoffset)
}


function plotaTile (imagem, ax, ay, parede = false, nome = "chao")
{   
    const tsala = 4
    const ttile = 64
    
    const woffset = width/2 - ((ttile*tsala)/2)
    const hoffset = height/2 - ((ttile*tsala)/2)
    let spr = new Sprite (imagem);
    spr.static = true
    spr.x = ax+64
    spr.y = ay+64
    spr.height = 64
    spr.width = 64
    spr.xx = (ax - woffset)/ttile
    spr.yy = (ay - hoffset)/ttile
    spr.parede = false
    spr.nome = nome
    if (parede){

        spr.parede = true
        gparedes.push(spr);
        
        
    }
   
    gsala.push (spr)
}


function drawMundo ()
{

    
    gsala.draw()
}