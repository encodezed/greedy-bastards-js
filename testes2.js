

let tipos = {
    PAREDE:0,
    CHAO:1,
    PLAYER:2,
    INIMIGO:3,
    ITEM:4
}

let selecao = {
    ipaleta:0,
    spr:0,
    img:0,
    tipo:tipos.CHAO //parede chao player
}

let entidade = {
ipaleta :  3, //indice da imagem na paleta[i]
rotation : 0.0,
scale:0.0,
x : 0.0,
y : 0.0,
tipo: tipos.CHAO //parede inimigo item
}
var mapa        = []



function preload()
{
    fill2DimensionsArray(mapa,10,10)

    mapa[1][1].ipaleta = 2
    console.table(mapa)
}

function setup()
{
    gspr = new Group()
    createCanvas (800,800);
    noSmooth()//importante sempre usar


}

function draw()
{
    clear()
    background(130)
    camera.on();
  
    allSprites.draw()
}

function fill2DimensionsArray(arr, rows, columns){
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = structuredClone(entidade);
        }
    }
}