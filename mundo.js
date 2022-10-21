/* 
coisas relativas a criação do mundo salas e os escambau

TODOS:
    
    -criar paredes
    -portas
    -perfumarias
    -overlays com efeitos de luz

    -montar um sistema de enxaixe de uma sala na outra


*/

let gsala
let imgchao

let imgCSE
let imgCSD
let imgCIE
let imgCID
let imgE
let imgD
let imgC
let imgB

function initMundo ()
{
    imgchao = loadImage ("Arte/Paredes/19.png")
    imgCSE= loadImage ("Arte/Paredes/00.png") //alterar pra usar um so mirror h e w
  //  imgCSD= loadImage ("Arte/Paredes/00.png")
   // imgCIE= loadImage ("Arte/Paredes/00.png")
   // imgCID= loadImage ("Arte/Paredes/00.png")
    imgE= loadImage ("Arte/Paredes/14.png")
  //  imgD= loadImage ("Arte/Paredes/14.png")
    imgC= loadImage ("Arte/Paredes/02.png")
  //  imgB= loadImage ("Arte/Paredes/02.png")


    gsala = new Group()
    const tsala = 4
    const ttile = 64
    
    const woffset = width/2 - ((ttile*tsala)/2)
    const hoffset = height/2 - ((ttile*tsala)/2)

    const tsalapxw = woffset + (ttile*tsala)
    const tsalapxh = hoffset + (ttile*tsala)

    for (let ax = woffset; ax<=tsalapxw; ax += ttile){
        for (let ay = hoffset; ay<=tsalapxh; ay += ttile){
            //primeira coluna
            

            if(ay==hoffset)
            {
                //canto superior esquerdo
                if (ax==woffset)
                {
                    plotaTile (imgCSE, ax, ay)
                }
                //canto inferior esquerdo
                if (ax===tsalapxw)
                {
                    plotaTile (imgCSE, ax, ay)
                }
                
                //coloca toda a parte superior que faltou
                if ((ax>woffset) && (ax <tsalapxw))
                {
                    plotaTile (imgC, ax, ay)
                }

            }

            if (ay==tsalapxh)
            {
                //canto inferior esquerdo
                if (ax==woffset)
                {
                    plotaTile (imgCSE, ax, ay)
                }
                //canto inferior direito
                if (ax==tsalapxw)
                {
                    plotaTile (imgCSE, ax, ay)
                }
                //coloca toda a parte superior que faltou
                if ((ax>woffset) && (ax <tsalapxw))
                {
                    plotaTile (imgC, ax, ay)
                }
            }

            if (ay > hoffset)
            {
                //parede esquerda
                if (ax == woffset)
                {
                    plotaTile (imgE, ax, ay)

                }
                //parede direita
                if (ax == tsalapxw)
                {

                    plotaTile (imgE, ax, ay)
                }



            }

            //aqui plota o chao
            if ( (ay>hoffset) && (ay < tsalapxh) && (ax>woffset) && (ax<tsalapxw) )
            {
                
                plotaTile(imgchao,ax,ay)
            } 


            
        }

    }


}


function plotaTile (imagem, ax, ay)
{   
    
    let spr = new Sprite (imagem);

    spr.overlap (allSprites)
    spr.x = ax+64
    spr.y = ay+64
    gsala.push (spr)

}


function drawMundo ()
{
    gsala.draw()
}