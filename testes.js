p5.disableFriendlyErrors = true
/*
Estagio de testes

TODOS:

    COMEÇAR A PARTE QUE SALVA E CARREGA


*/

/**
 * globais 
 */
let mostrapaleta =  true
 let tamanhocelula = 64
 let tamanhotabuleiro = 10
 let inicializa  = true
 let zoomatual   = 1.2
 let sprSelecionado
 var tabuleiro   = []
 var inimigos    = []
 var itens       = [] // isso é a lista de itens tipo a paleta só que de itens
 var itensnomapa = []   
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
            VAZIO:n++, /// QUANDO RESETAR QQUER COISA VIRA ISSO
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

/**
 * OBJETOS
 */
item = {
                min:1, //minimo def, ataque, life steal, recuperacao vida sei la
                max:2, //mesma logica
                ipaleta:0, //qual é imagem que simboliza ela
                nome:"item",
                tipo:tipos.ITEM,
                tipoitem:tipoitem.ESCUDODEMADEIRA,
                img:0,
                historia:""
       }


selecao = {
            ipaleta:0,
            spr:0,
            img:0,
            tipo:tipos.CHAO, //parede chao player
            entidade:0
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
    tipo: tipos.VAZIO, //parede inimigo item
    vida:5,
    velocidade : tamanhocelula * 1,
    maoesquerda : 0,
    maodireita :0,
    nome: "VAZIO",
    item: 0,
    inimigo:0,
    spr: 0
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
let jsonparedes

function limpaMapa ()
{

    for (a= 0; a < tamanhotabuleiro; a++)
    {
        for (b=0; b < tamanhotabuleiro; b++)
            {
                //redundancia
                if (paredes[a][b].tipo === tipos.PAREDE)
                {
                    //console.table (paredes[a][b])
                    paredes[a][b].spr.remove()
                    paredes[a][b].tipo = tipos.VAZIO
                    paredes[a][b].nome = "VAZIO"
                    //console.table (paredes[a][b])
                }

            }
    }
    

}



function itemJson ()
{
 //console.log()

 //tem que carrregar e ja botar o sprite la
 for (a= 0; a < tamanhotabuleiro; a++)
 {
     for (b=0; b < tamanhotabuleiro; b++)
         {
            if ( jsonparedes[a][b].tipo == tipos.PAREDE)
            {
                jsonparedes[a][b].xi = a
                jsonparedes[a][b].yi = b
                selecao.entidade =0
                selecao.tipo = tipos.PAREDE
                selecao.ipaleta = jsonparedes[a][b].ipaleta
                selecao.img =  paleta[selecao.ipaleta].img
            //agora manda um cria entidade
                criaEntidade(-1,-1,1.25,a,b)

           // paredes[a][b].spr.rotation = jsonparedes[a][b].rotation
                selecao.spr  = paredes[a][b].spr
                selecao.spr.x = selecao.entidade.x
                selecao.spr.y = selecao.entidade.y
            }
        }

}

}


function carregaMapa ()
{
   limpaMapa()
    jsonparedes = loadJSON("mapas.json", itemJson)

 //console.log(jsonparedes[""]["1"])
 
    

 




}


function criaItem (nome, tipo,tipoitem,min,max, img, historia = ""){

    let i = itens.push ( structuredClone(item))
    itens[i-1].tipoitem = tipoitem
    itens[i-1].min = min
    itens[i-1].max = max
    itens[i-1].tipo = tipo 
    itens[i-1].nome = nome
    itens[i-1].img = img
    itens[i-1].historia = historia

    if (tipo === tipos.ITEM)
    {
        paleta.push({
         img:img,
         tipo:tipo,
         item:itens[i-1]
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
paleta.push({img:imgCC,tipo:tipos.CHAO})
paleta.push({img:imgCSE2,tipo:tipos.PAREDE})
paleta.push({img:imgE,tipo:tipos.PAREDE})
paleta.push({img:imgC,tipo:tipos.PAREDE})

criaItem ("Espada Longa do Poder",tipos.ITEM,tipoitem.ESPADALONGA,1,2,longa,"Criada pelo beyonder")
criaItem ("Escudo simples",tipos.ITEM,tipoitem.ESCUDODEMADEIRA,1,2,escudo,"Escudo Simples")
criaItem ("Pocao de vida",tipos.ITEM,tipoitem.POCAOVIDA,1,2,pocaovida,"Pocao de vida")


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
    if (mostrapaleta){
        
        drawPaleta()
    }
    fill (20,22,26)
    text ("Greedy Bastars - CatGirls Tail - maptool v0.5 - @zednaked",width/2,20)
}





/**
 * CONVERTER ISSO PARA UMA FUNCAO QUE CRIA PAINEIS
 * 
 */
function drawPaleta()
{


  mapeiaMouse()

    push()
    noStroke()
    fill (0,20)
    rect(bx+9, by+11+80, boxSize, boxSize+80);
    pop ()
    strokeCap(ROUND)
    rect(bx, by+80, boxSize, boxSize+80);


    /**
     * MUDAR AQUI PARA APARECER COISAS DIFERENTES DEPENDENDO
     * DO QUE ESTIVER SELECIONADO !!!!
     *FOCO AQUI
     * 
     */

    if (selecao.item)
    {

        text ("nome:", bx-90,by+250-30)
        text (selecao.item.nome, bx,by+250-30)
        text ("", bx+90,by+250-30)
    }else{
    
        if (selecao.entidade){

        // console.log("vrau")
        text (selecao.entidade.nome, bx-90,by+250-30)
        text ("", bx,by+250-30)
        text ("", bx+90,by+250-30)
        }
    }

    text ("espelharh", bx-90,by+250)
    text ("rodar", bx,by+250)
    text ("espelharv", bx+90,by+250)
    noStroke()
    fill (10)
    textSize(17)
    textAlign(CENTER)
    
    
 
  
    text ("Paleta de Tiles", bx, by-100)   
  
    fill (255,0,0,100)
    plotaPaleta()

}

function removeEntidade (xx, yy)
{


}
/**
 * cria celula 
 * TODO.
 * mudar isso para criaEntidade
 */
function criaEntidade (xx, yy, escala = 1.25, xi= -1 , yi= -1)
{   

    if ( xi === -1)
    {
        xi =floor(xx/(width/tamanhotabuleiro)) //indicex
        yi =floor(yy/(height/tamanhotabuleiro))//indice y
    
    }

    if (xx === -1){
        xx = floor (xi * (width/tamanhotabuleiro))
        yy = floor (yi * (height/tamanhotabuleiro))

       
    }

    xx     =floor(xx/(width/tamanhotabuleiro))*(width/tamanhotabuleiro)+(width/(tamanhotabuleiro*2))  //localização na tela
    yy     =floor(yy/(height/tamanhotabuleiro))*(height/tamanhotabuleiro)+(height/(tamanhotabuleiro*2)) //localização na tela
    tabuleiro[xi][yi] = new Sprite(xx, yy, width/tamanhotabuleiro,height/tamanhotabuleiro)
  //  tabuleiro[xi][yi].addImage(selecao.img)
  //  console.log (xx+"x"+yy)
/**
 * se for do tipo item
 */
if (selecao.tipo == tipos.VAZIO) return

//console.log (selecao.tipo)
if (selecao.tipo === tipos.ITEM)
{

     /**
     * precisa fazer
     */
    var ini = itensnomapa.push(structuredClone(entidade))
        
    itensnomapa[ini-1].x = xx
    itensnomapa[ini-1].y = yy
    itensnomapa[ini-1].xi = xi
    itensnomapa[ini-1].yi = yi
    itensnomapa[ini-1].tipo = selecao.tipo
    itensnomapa[ini-1].item = selecao.item
     //esse nome tem q ter em algum lugar
    itensnomapa[ini-1].nome =  selecao.item.nome    
    selecao.entidade = itensnomapa[ini-1]
  
}

 /**
 * se for do tipo CHAO
 */

    if (selecao.tipo === tipos.CHAO)
    {
        if (paredes[xi][yi].tipo == tipos.PAREDE){

            paredes[xi][yi].tipo = tipos.CHAO
            paredes[xi][yi].nome = "chao:"+xi+"x"+yi

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
                tabuleiro[xi][yi].remove()
                return
                
            }
            
       }
       if (
            Jogador.xi == xi &&
            Jogador.yi == yi
       ){
         tabuleiro[xi][yi].remove()
            console.log ("o jogador esta ai")
            return

       }
        var ini = inimigos.push(structuredClone(entidade))
        
        inimigos[ini-1].x = xx
        inimigos[ini-1].y = yy
        inimigos[ini-1].xi = xi
        inimigos[ini-1].yi = yi
        //esse nome tem q ter em algum lugar
        inimigos[ini-1].nome = "Goblinzitus:"+xi+"x"+yi
        console.table(inimigos)

    }
/**
 * se for do tipo PLAYER
 */
    if (selecao.tipo === tipos.PLAYER)
    {
      

        if (paredes[xi][yi].tipo == tipos.PAREDE)
        {
            console.log("tem uma parede ai")
            
            tabuleiro[xi][yi].remove()
            return

        }
        //tabuleiro[xi][yi].remove()
        if (Jogador.spr != 0 )
        {
            Jogador.spr.remove()

        }
        Jogador.x = xx
        Jogador.y = yy
        Jogador.xi = xi
        Jogador.yi = yi
        Jogador.ipaleta = selecao.ipaleta
        Jogador.tipo = tipos.PLAYER
        Jogador.spr = tabuleiro[xi][yi]
        Jogador.nome = "Menina Gato"
        console.table(Jogador)
    }
/**
 * se for do tipo PAREDE
 */

    if (selecao.tipo == tipos.PAREDE)
    {
        if (paredes[xi][yi].tipo == tipos.PAREDE)
        {
            tabuleiro[xi][yi].remove()
            paredes[xi][yi].spr.remove()
            paredes[xi][yi].tipo= tipos.VAZIO
            console.log("ja tinha uma parede ai")
            return


        }else{
            //console.log (xx+" "+yy)
    
/**
 * 
 * criar o sprite direto na entidade como é feito aqui
 * apagar esse tabuleiro nada a ver e usar direto
 */

            paredes[xi][yi].ipaleta = selecao.ipaleta
            paredes[xi][yi].x = xx
            paredes[xi][yi].y = yy
            paredes[xi][yi].xi = xi
            paredes[xi][yi].yi = yi
            paredes[xi][yi].tipo = tipos.PAREDE
            paredes[xi][yi].scale = escala
            paredes[xi][yi].rotation = 0     
            paredes[xi][yi].nome = "Parede:"+xi+"x"+yi
            paredes[xi][yi].spr = new Sprite(xx, yy, width/tamanhotabuleiro,height/tamanhotabuleiro)
            paredes[xi][yi].spr.overlap (allSprites)
            paredes[xi][yi].spr.addImage(selecao.img)
            paredes[xi][yi].spr.scale = escala
           // paredes[xi][yi].spr
            selecao.entidade = paredes[xi][yi]
            selecao.spr = paredes[xi][yi].spr
           
           // console.log ("criou uma parede")
         //   console.table (paredes[xi][yi])
        }
    }

    if (!inicializa)
    {
        if (tabuleiro[xi][yi].tipo == selecao.tipo)
        {   
                tabuleiro[xi][yi].remove()
                
        }
    }
   
   
    tabuleiro[xi][yi].overlap (allSprites)
    tabuleiro[xi][yi].tileSize = width/tamanhotabuleiro
   // tabuleirox[xi][yi].scale = escala
    tabuleiro[xi][yi].scale = escala

    if (inicializa)
    {
        rnum = 90 * floor(random (4))
        ri = floor (random (2,4))
        tabuleiro[xi][yi].addImage(selecao.img)
        tabuleiro[xi][yi].rotation = rnum
     //   tabuleirox[xi][yi].ipaleta = ri
      //  tabuleirox[xi][yi].rotation = rnum
    }else{

        //arrumar
        if (selecao.tipo != tipos.parede ){
        tabuleiro[xi][yi].addImage(selecao.img)
    }
        //tabuleiro[xi][yi].debug = true
    
    
      
    }
    //arrumar
    if (selecao.tipo != tipos.PAREDE){
    selecao.spr = tabuleiro[xi][yi]
    }else{
        tabuleiro[xi][yi].remove()
    }
}











