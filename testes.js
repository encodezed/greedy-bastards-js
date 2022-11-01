p5.disableFriendlyErrors = true
/*
Estagio de testes

TODOS:

    COMEÇAR A PARTE QUE SALVA E CARREGA


*/

/**
 * globais 
 */
 let tamanhocelula = 64
 let tamanhotabuleiro = 10
 let inicializa  = true
 let zoomatual   = 2.2
 let sprSelecionado
 var tabuleiro   = []
 var inimigos    = []
 var itens       = []   
 var paredes     = []
 var tabuleirox  = []
 var chaos       = []
 var paleta      = []
 var mapa        = []

/**
 * ENUMS 
 */
 let n=0
movimentos = {
            CIMA: n++,
            BAIXO: n++,
            ESQUERDA: n++,
            DIREITA:n++
}
n=0
tipos = {
            PAREDE:n++,
            CHAO:n++,
            DECORACAO:n++,
            PLAYER:n++,
            INIMIGO:n++,
            ITEM:n++,
            VAZIO:n++,
            ARMA:n++,
            ESCUDO:n++,
            EFEITO:n++,
            MAGIA:n++,
            POCAO:n++
 }
 n=0
tipoitem = {
            ESCUDODEMADEIRA:n++,
            ESCUDOFERRO:n++,
            ESCUDOACO:n++,
            ESPADACURTA:n++,
            ESPADALONGA:n++,
            MACHADO:n++,
            POCAOVIDA:n++,
            FACA:n++,
            BAU:n++,
            NADA:n++
}
//console.log(tipoitem)
/**
 * OBJETOS
 */
item = {
                min:1, //minimo def, ataque, life steal, recuperacao vida sei la
                max:2, //mesma logica
                ipaleta:0, //qual é imagem que simboliza ela
                nome:"item",
                tipo:tipos.ARMA,
                tipoitem:tipoitem.ESCUDODEMADEIRA,
                img:0,
                historia:""
       }


selecao = {
            ipaleta:0,
            spr:0,
            img:0,
            tipo:tipos.CHAO //parede chao player
}

entidade = {
    ipaleta :  3, //indice da imagem na paleta[i]
    rotation : 0,
    scale:0.0,
    xmirror:false,
    ymirror:false,
    x : 0,//posicao na tela
    y : 0,
    xi:0,//posiçao na tabela
    yi:0,
    tipo: tipos.CHAO, //parede inimigo item
    vida:5,
    velocidade : tamanhocelula * 1,
    maoesquerda : 0,
    maodireita :0,
    nome: "ENTIDADE"
}

var Jogador = structuredClone(entidade) //inicializa entidade jogador

/**
 * variaveis da paleta
 */
let bx;
let by;
let boxSize = 140;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;


/**
 * variaveis usadas na paleta, 
 * -TODO-
 * trocar isso fazendo uma array de cada tipo
 */
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


function criaItem (nome, tipo,tipoitem,min,max, img, historia = ""){

    let i = itens.push ( structuredClone(item))
    itens[i-1].tipoitem = tipoitem
    itens[i-1].min = min
    itens[i-1].max = max
    itens[i-1].tipo = tipo 
    itens[i-1].nome = nome
    itens[i-1].img = img
    itens[i-1].historia = historia

    if (
        tipo == tipos.ARMA ||
        tipo == tipos.ESCUDO ||
        tipo == tipos.POCAO
    )
    {
        paleta.push({
         img:img,
         tipo:tipo
        })
    }


}


/**
 * estava olhando a lista de inimigos, que serão um array 1D 
 * com varias celulas dentro , com o tipo INIMIGO
 * 
 */

function preload ()
{  

/**
 * inicializa as imagens
 * chao como tem variacoes usa uma array
 * o mesmo sera feito com paredes etc... o que muda é o tipo
 */
longa =  loadImage("Arte/Sprites/Item/Longa2.png")
pocaovida =  loadImage("Arte/Sprites/Item/PocaoVida.png")
escudo =  loadImage("Arte/Sprites/Item/EscudoSimples.png")

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

player = loadImage("Arte/Sprites/Player/meninagato/MGFULL.png")
goblin = loadImage("Arte/Sprites/Goblin/0 2.png")

Jogador.tipo = tipos.PLAYER



console.table(itens)

/**
 * inicializa a variavel paleta com 2 variaveis, imagem e tipo 
 */
paleta.push({img:goblin,tipo:tipos.INIMIGO})
paleta.push ({img:player,tipo:tipos.PLAYER})
paleta.push ({img:chaos[0],tipo:tipos.CHAO})
paleta.push ({img:chaos[1],tipo:tipos.CHAO})
paleta.push ({img:chaos[2],tipo:tipos.CHAO})
paleta.push ({img:imgCSE, tipo:tipos.PAREDE})
paleta.push({img:imgCC,tipo:tipos.PAREDE})
paleta.push({img:imgCSE2,tipo:tipos.PAREDE})
paleta.push({img:imgE,tipo:tipos.PAREDE})
paleta.push({img:imgC,tipo:tipos.PAREDE})

criaItem ("Espada Longa do Poder",tipos.ARMA,tipoitem.ESPADALONGA,1,2,longa,"Criada pelo beyonder")
criaItem ("Escudo simples",tipos.ESCUDO,tipoitem.ESCUDODEMADEIRA,1,2,escudo,"Escudo Simples")
criaItem ("Pocao de vida",tipos.POCAO,tipoitem.POCAOVIDA,1,2,pocaovida,"Pocao de vida")


/**
 * aqui inicializa as arrays usadas para o tabuleiro, uma para salvar outra para uso
 * mudar para usar uma 
 * 
 */
 
fill2DimensionsArray(tabuleiro,tamanhotabuleiro,tamanhotabuleiro) //inicializa a array que é o chao
fill2DimensionsArray(tabuleirox,tamanhotabuleiro,tamanhotabuleiro)
//fill2DimensionsArray(inimigos,tamanhotabuleiro,tamanhotabuleiro) //inicializa tabuleiro dos inimigos
fill2DimensionsArray(paredes,tamanhotabuleiro,tamanhotabuleiro) //inicializa tabuleiro das paredes


}

function setup()
{
    gspr = new Group()
    createCanvas (800,800);
    noSmooth()//importante sempre usar
    geraGrade()

    bx = 150.0; //posicao da paleta
    by = 150.0; //coisas de paleta
    rectMode(RADIUS);
    strokeWeight(2);    
}

function draw()
{
    clear()
    camera.on();
    camera.zoom = zoomatual;
    allSprites.draw()
    camera.off() //desliga acamera para fazer a ui
    strokeWeight(8)

    if (
        mouseX > bx - boxSize &&
        mouseX < bx + boxSize &&
        mouseY > by - boxSize &&
        mouseY < by + boxSize
    ) {//esta dentro da caixa
        overBox = true;
        if (!locked) 
        {
            stroke(255);
            fill(150, 122, 158);
        }
    }else{
        stroke(226, 220, 176);
        fill(122, 122, 158);
        overBox = false;
    }

    push()
    noStroke()
    fill (0,20)
    rect(bx+9, by+11+80, boxSize, boxSize+80);
    pop ()
    strokeCap(ROUND)
    rect(bx, by+80, boxSize, boxSize+80);
    noStroke()
    fill (10)
    textSize(17)
    textAlign(CENTER)
    text ("BG mapeador - @ZeDnaked", bx, by-100)
    text ("Paleta de Tiles", bx, by-74)   
    fill (255,0,0)
    plotaPaleta()
}

function RemoveSprite (xx, yy)
{


}
/**
 * cria celula 
 * TODO.
 * mudar isso para criaCelula
 */
function CriaSprite (xx, yy, escala = 1.25)
{   

    let xi =floor(xx/(width/tamanhotabuleiro)) //indicex
    let yi =floor(yy/(height/tamanhotabuleiro))//indice y
   
    xx     =floor(xx/(width/tamanhotabuleiro))*(width/tamanhotabuleiro)+(width/(tamanhotabuleiro*2))  //localização na tela
    yy     =floor(yy/(height/tamanhotabuleiro))*(height/tamanhotabuleiro)+(height/(tamanhotabuleiro*2)) //localização na tela


/**
 * se for do tipo item
 */

if (selecao.tipo === tipos.ITEM)
{

        /**
         * precisa fazer
         */


}

 /**
 * se for do tipo CHAO
 */

    if (selecao.tipo === tipos.CHAO)
    {
        if (paredes[xi][yi].tipo == tipos.PAREDE){

            paredes[xi][yi].tipo = tipos.VAZIO

        }

    }

 /**
 * Se for do tipo INIMIGO
 */   
    if (selecao.tipo === tipos.INIMIGO)
    {
       for (inimigo of inimigos )
       {
            if (
                inimigo.xi == xi &&
                inimigo.yi == yi
            )
            {
                console.log ("ja tem outro inimigo")
                return
                
            }
       }
       if (
            Jogador.xi == xi &&
            Jogador.yi == yi
       ){
            console.log ("o jogador esta ai")
            return

       }
        var ini = inimigos.push(structuredClone(entidade))
        
        inimigos[ini-1].x = xx
        inimigos[ini-1].y = yy
        inimigos[ini-1].xi = xi
        inimigos[ini-1].yi = yi
    }
/**
 * se for do tipo PLAYER
 */
    if (selecao.tipo === tipos.PLAYER)
    {
        if (paredes[xi][yi].tipo == tipos.PAREDE)
        {
            console.log("tem uma parede ai")
            return

        }
        Jogador.x = xx
        Jogador.y = yy
        Jogador.xi = xi
        Jogador.yi = yi
        Jogador.ipaleta = selecao.ipaleta
        Jogador.tipo = tipos.PLAYER
    }
/**
 * se for do tipo PAREDE
 */

    if (selecao.tipo === tipos.PAREDE)
    {
        if (paredes[xi][yi].tipo == tipos.PAREDE)
        {
            console.log("ja tinha uma parede ai")


        }
        paredes[xi][yi].ipaleta = selecao.ipaleta
        paredes[xi][yi].tipo = tipos.PAREDE
        paredes[xi][yi].scale = escala
        paredes[xi][yi].rotation = 0     
    }

    if (!inicializa)
    {
        if (tabuleiro[xi][yi].tipo == selecao.tipo)
        {   
                tabuleiro[xi][yi].remove()
                
        }
    }
   
    tabuleiro[xi][yi] = new Sprite(xx, yy, width/tamanhotabuleiro,height/tamanhotabuleiro)
    tabuleiro[xi][yi].overlap (allSprites)
    tabuleiro[xi][yi].tileSize = width/tamanhotabuleiro
    tabuleirox[xi][yi].scale = escala
    tabuleiro[xi][yi].scale = escala

    if (inicializa)
    {
        rnum = 90 * floor(random (4))
        ri = floor (random (2,4))
        tabuleiro[xi][yi].addAni(paleta[ri].img)
        tabuleiro[xi][yi].rotation = rnum
        tabuleirox[xi][yi].ipaleta = ri
        tabuleirox[xi][yi].rotation = rnum
    }else{

       
        tabuleiro[xi][yi].addAni (selecao.img)
    }

    selecao.spr = tabuleiro[xi][yi]
}

function geraGrade()
{
    const linhas = tamanhotabuleiro
    const colunas = tamanhotabuleiro

    for (xx = 0; xx < colunas;xx ++ )
    {
        for (yy = 0; yy <linhas; yy++)
        {    
           selecao.img = paleta[rolaDado(2,5)].img
           CriaSprite (xx * (width/colunas),yy * (height/linhas))
        }  
    }
    inicializa = false
}

function criaGrade()
{

             //linhas
            line (0,yy*(height/linhas), width,yy*(height/linhas) )
            //meio
            point(xx*(width/colunas)+(width/tamanhotabuleiro)/2, yy * (height/linhas)+ (height/tamanhotabuleiro)/2)
            //colunas
            line ( xx * (width/colunas), 0 , xx * (width/colunas), height )
}

function keyReleased()
{
    switch (keyCode){

        case 82:
            selecao.spr.rotation += 90

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
            selecao.spr.move ("up") //w
            break
        case 72: //h
        //atualizar
            selecao.spr.mirror.x = !selecao.spr.mirror.x

            break
        case 86: //v

            //atualizar
            selecao.spr.mirror.y = !selecao.spr.mirror.y
            break
    }

}

function mouseClicked()
{
    getItemPaleta()

    if (!overBox){
        CriaSprite(mouse.x, mouse.y);

    }
}

function mousePressed() 
{

    if (overBox) {
      locked = true;
      fill(150, 122, 158)
    } else {
      locked = false;
    }
    xOffset = mouseX - bx;
    yOffset = mouseY - by;
}

function mouseDragged() 
{
    if (locked) {
      bx = mouseX - xOffset;
      by = mouseY - yOffset;
    }
  }
  
  function mouseReleased() 
  {
    locked = false;
  }

function fill2DimensionsArray(arr, rows, columns){
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = structuredClone(entidade);
        }
    }
}

function rolaDado (min = 0, max = 10)
{

    return floor (random (min, max))

}


function plotaPaleta(i = 0, ncolunas = 4){
    xini =bx-133
    xxx = xini
    yini =by-65 
    yyy = yini
    vspc = 67
    hspc = 67

    xxxr = bx -95
    yyyr = by - 15
    
    ii = 0

    for (item of paleta)
    {

        if (ii == ncolunas)
        {
            yyy += vspc 
            xxx = xini
            ii = 0

        }

        image(item.img, xxx,yyy)

        xxx += hspc
        
        ii++

    }
}

function getItemPaleta (ncolunas = 4){

    xini =bx-133
    xxx = xini
    yini =by-65 
    yyy = yini
    vspc = 67
    hspc = 67

    xxxr = bx -95
    yyyr = by - 15
    
    ii = 0
    ipaleta = 0

    for (item of paleta)
    {

        if (ii == ncolunas)
        {
            yyy += vspc 
            xxx = xini
            ii = 0

        }

        if(
            mouseX > xxx &&
            mouseX < xxx +vspc &&
            mouseY > yyy &&
            mouseY < yyy + hspc
            )
            {
                selecao.img = paleta[ipaleta].img
                selecao.tipo = paleta[ipaleta].tipo
                selecao.ipaleta = ipaleta
                return
            }

        xxx += hspc
        ii++
        ipaleta ++
   
    }

}

