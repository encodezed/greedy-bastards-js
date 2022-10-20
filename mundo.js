let gsala
let imgchao
function initMundo ()
{
    imgchao = loadImage ("Arte/Paredes/19.png")
    gsala = new Group()
    const tsala = 4
    const ttile = 64
    const woffset = width/2 - ((ttile*tsala)/2)
    const hoffset = height/2 - ((ttile*tsala)/2)

    for (let ax = woffset; ax<woffset + (ttile*tsala); ax += ttile){
        for (let ay = hoffset; ay<hoffset + (ttile*tsala); ay += ttile){

            let spr = new Sprite (imgchao);

            spr.overlap (allSprites)
            spr.x = ax+64
            spr.y = ay+64
            gsala.push (spr)
        }

    }


}


function drawMundo ()
{
    gsala.draw()
}