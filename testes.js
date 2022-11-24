p5.disableFriendlyErrors = true
/*
Estagio de testes

TODOS:
 #########COMEÇAR A FAZER SANGUE NO CHÃO E COISAS FOFOGORE##########
 ###### FAZER COM QUE LUZES TENHAM "LUZ" ao redor usando o overlay


*/

/**
 * globais 
 */
let mostraPaleta = false
let inicializa = true
let tamanhoCelula = 64
let tamanhoTabuleiro = 50


let zoomatual = 1 //2.5
let sprSelecionado
var tabuleiro = []
var inimigos = []
var itens = [] // isso é a lista de itens tipo a paleta só que de itens
var itensnomapa = []
var paredes = []
var tabuleirox = []
var chaos = []
var paleta = []
var mapa = []
var imgOverlay


/**
 * ENUMS 
 */
let n = 0
movimentos = {
    CIMA: n,
    BAIXO: n++,
    ESQUERDA: n++,
    DIREITA: n++
}

modos = {
    CRIASALA: 0,
    EDICAO: 1,
    JOGO: 2
}

var modoAtual = modos.CRIASALA

n = 0
tipos = {
    PAREDE: n++,
    CHAO: n++,
    DECORACAO: n++,
    PLAYER: n++,
    INIMIGO: n++,
    ITEM: n++,
    VAZIO: n++, // / QUANDO RESETAR QQUER COISA VIRA ISSO
    ARMA: n++,
    ESCUDO: n++,
    EFEITO: n++,
    MAGIA: n++,
    POCAO: n++,
    DELETAR: n++,
    PORTA: n++
}

n = 0
subtipos = {
    CANTOCIMAESQUERDA: n++,
    CIMA: n++,
    ESQUERDA: n++,
    SOMBRACIMA: n++,
    BANDEIRA: n++,
    VAZIO: n++,
    PORTA: n++
}

n = 0
tipoitem = {
    ESCUDODEMADEIRA: n,
    ESCUDOFERRO: n++,
    ESCUDOACO: n++,
    ESPADACURTA: n++,
    ESPADALONGA: n++,
    MACHADO: n++,
    POCAOVIDA: n++,
    FACA: n++,
    BAU: n++,
    NADA: n++
}

/**
 * OBJETOS
 */
item = {
    min: 1, // minimo def, ataque, life steal, recuperacao vida sei la
    max: 2, // mesma logica
    ipaleta: 0, // qual é imagem que simboliza ela
    nome: "item",
    tipo: tipos.ITEM,
    tipoitem: tipoitem.ESCUDODEMADEIRA,
    img: 0,
    historia: ""
}


selecao = {
    ipaleta: 0,
    spr: 0,
    img: 0,
    tipo: tipos.CHAO, // parede chao player
    subtipo: -1,
    entidade: 0
}


oSala = {
    x: 0, 
    y: 0,
    xi: 0,
    yi: 0,
    nome: "sala1",
    tipo: 0,
    gSala: 0,
    portas: -1,//coloca o buffer de lados
    largura: 0,
    altura:0,
    celulas:[]

}

var salas = []


entidade = {
    ipaleta: 3, // indice da imagem na paleta[i]
    rotation: 0,
    scale: 0.0,
    xmirror: false,
    ymirror: false,
    x: 0, // posicao na tela
    y: 0,
    xi: 0, // posiçao na tabela
    yi: 0,
    tipo: tipos.VAZIO, // parede inimigo item
    vida: 5,
    velocidade: tamanhoCelula * 1,
    maoesquerda: 0,
    maodireita: 0,
    nome: "VAZIO",
    item: 0,
    inimigo: 0,
    spr: 0
}

var Jogador = structuredClone(entidade)

// inicializa entidade jogador

/**
 * variaveis da paleta
 */
let bx = 150.0;
let by = 150.0;
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

let lados = {
    CIMA : 0,
    BAIXO: 1,
    ESQUERDA: 2,
    DIREITA:3
}
let ladon = {
    0 : "CIMA",
    1: "BAIXO",
    2: "ESQUERDA",
    3:"DIREITA",
}


function criaEntidadeSala(sala, tipo, x, y)
{

    let vmeiosala = sala.x + ((sala.largura/2)*64)
    let hmeiosala = sala.y + ((sala.altura/2)*64)
    let darknumberx = sala.x +(floor (random(2,sala.largura -1)) * tamanhoCelula)
    let darknumbery =sala.y  +(floor (random(2,sala.altura  -1)) * tamanhoCelula)

    
    if (vmeiosala/2 == darknumberx)
    {
        darknumberx ++
    }

    if (tipo == tipos.PLAYER)
    {
        
        getItemTipo(tipos.PLAYER, subtipos.VAZIO)   
        criaEntidade(vmeiosala, hmeiosala, 1.25, -1, -1, true)

    }
    if (tipo == tipos.INIMIGO)
    {
        getItemTipo(tipos.INIMIGO, subtipos.VAZIO)   
        criaEntidade(darknumberx, darknumbery, 1.25, -1, -1, true)
    }


}






function criaPortas ()
{
   

    var buff = []
    buff.push (lados.CIMA)
    buff.push (lados.BAIXO)
    buff.push (lados.ESQUERDA)
    buff.push (lados.DIREITA)
   
    let rnd = floor(random (1, 4))
   // p (rnd)
    for (a = 0 ;a < rnd; a++)
    {
        let num = floor (random (0, buff.length))
        buff.splice(num,1)
       
    }
    return buff
}
function temPorta (arr,lado)
{
    for (_lado of arr )
    {
        if (_lado == lado)
        {
            return true
        }
    }
    return false

}


function shuffle(arr) {
    // For each slot in the array (starting at the end), 
    // pick an element randomly from the unplaced elements and
    // place it in the slot, exchanging places with the 
    // element in the slot. 
    for(var slot = arr.length - 1; slot > 0; slot--){
      var element = randInt(slot+1);
      swap(arr, element, slot);
    }
  }



function fechaPortaNorte(sala)
{


}

function fechaPortaSul(sala)
{



}

function criaSalaCima (sala)
{
    let meiosalax = floor (sala.largura/2)
    let meiosalay = floor (sala.altura/2)
    let largura = floor(random (1,3)) *2
    let altura = floor(random (4,6))

    let xini = sala.xi + floor(meiosalax - (largura/2))
    let yini = sala.yi - altura -1
    
    if (xini < 0 || yini < 0) return 0 //sala fora do tabuleiro


    criaSala(xini * tamanhoCelula, yini * tamanhoCelula,largura, altura, lados.BAIXO)
    
    
    return salas [salas.length - 1] //retorna a ultima sala
}

function criaSalaBaixo (sala)
{
    let meiosalax = floor (sala.largura/2)
    let meiosalay = floor (sala.altura/2)
    let largura = floor(random (1,3)) *2
    let altura = floor(random (4,6))

    let xini = sala.xi + floor(meiosalax - (largura/2))
    let yini = sala.yi + sala.altura  +1
    
    if (xini < 0 || yini < 0) return 0 //sala fora do tabuleiro


    criaSala(xini * tamanhoCelula, yini * tamanhoCelula,largura, altura, lados.CIMA)
    
    
    return salas [salas.length - 1] //retorna a ultima sala
}

function criaSalaEsquerda (sala)
{
    let meiosalax = floor (sala.largura/2)
    let meiosalay = floor (sala.altura/2)
    let largura = floor(random (1,3)) *2
    let altura = floor(random (2,3)) * 2

    //let xini = sala.xi + floor(meiosalax - (largura/2))
    //let yini = sala.yi + sala.altura  +1
    
    let xini =   sala.xi - largura  -1
    let yini = sala.yi + floor(meiosalay - (altura/2))
  
    if (xini < 0 || yini < 0) return 0 //sala fora do tabuleiro


    criaSala(xini * tamanhoCelula, yini * tamanhoCelula,largura, altura, lados.DIREITA)
    
    
    return salas [salas.length - 1] //retorna a ultima sala
}

function criaSalaDireita (sala)
{
    let meiosalax = floor (sala.largura/2)
    let meiosalay = floor (sala.altura/2)
    let largura = floor(random (1,3)) *2
    let altura = floor(random (2,3)) * 2

    //let xini = sala.xi + floor(meiosalax - (largura/2))
    //let yini = sala.yi + sala.altura  +1
    
    let xini =   sala.xi + sala.largura  +1
    let yini = sala.yi + floor(meiosalay - (altura/2))
  
    if (xini < 0 || yini < 0) return 0 //sala fora do tabuleiro


    criaSala(xini * tamanhoCelula, yini * tamanhoCelula,largura, altura, lados.ESQUERDA)
    
    
    return salas [salas.length - 1] //retorna a ultima sala
}




/***
 * A ideia é usar salas como celulas, saber onde ficam as aberturas dela e usar um algoritimo tipo game of life para criar o mapa
 * ele analiza o que tem do lado e muda e assim por diante
 * 
 * 
 * 
 */


function criaSala(xini, yini, lSala, aSala, origem = -1) {
    let _mirrorx
    let _mirrory
    let i = salas.push(structuredClone(oSala))
    xi = floor(xini / tamanhoCelula) // indicex
    yi = floor(yini / tamanhoCelula) // indice y
    salas[i - 1].largura = lSala
    salas[i - 1].altura = aSala
    salas[i - 1].x = xini
    salas[i - 1].y = yini
    salas[i - 1].xi = xi
    salas[i - 1].yi = yi
    salas[i - 1].nome = "Sala" + (i - 1)
    salas[i - 1].gSala = new Group()

    salas[i - 1].portas = structuredClone (criaPortas())
    
   
    for (xx = 0; xx <= lSala; xx ++) {
        for (yy = 0; yy <= aSala; yy ++) {
             
            getItemTipo(tipos.CHAO, subtipos.VAZIO)
            _mirrorx = false
            _mirrory = false

            if (yy == 0) {//CIMA
                if (xx != floor(lSala/2) ){
                   getItemTipo(tipos.PAREDE, subtipos.CIMA)
                }else{
                    if(temPorta(salas[i - 1].portas, lados.CIMA) || origem == lados.BAIXO)
                    {
                       
                        getItemTipo(tipos.PAREDE, subtipos.PORTA)
                    }else{
                        getItemTipo(tipos.PAREDE, subtipos.CIMA)
                    }
                }

            }
            if (yy == aSala) {
                if (xx != floor(lSala/2)){
                    getItemTipo(tipos.PAREDE, subtipos.CIMA)
                     _mirrory = true
                }else{

                    if(temPorta(salas[i - 1].portas, lados.BAIXO) || origem == lados.CIMA)
                    {
                        getItemTipo(tipos.PAREDE, subtipos.PORTA)
                    }else{
                        getItemTipo(tipos.PAREDE, subtipos.CIMA)
                    }
                    _mirrory = true

                    
                }
            }
            if (yy == 1 && xx > 0 && xx < lSala) {
               

                if (xx == 1 || xx == (lSala - 1)) {

                    getItemTipo(tipos.DECORACAO, subtipos.VAZIO)
                    //_mirrory = true
                    criaEntidade(-1, -1, 1.25, xi + xx, yi + yy, _mirrorx, _mirrory)
                }
                if (xx != floor(lSala/2)){
                getItemTipo(tipos.CHAO, subtipos.SOMBRACIMA)
                 }

            }
            if (yy == aSala - 1 && xx > 0 && xx < lSala) {
                
                
                if (xx == 1 || xx == (lSala - 1)) {

                    getItemTipo(tipos.DECORACAO, subtipos.VAZIO)
                    _mirrory = true
                    criaEntidade(-1, -1, 1.25, xi + xx, yi + yy, _mirrorx, _mirrory)
                }
                
                if (xx != floor(lSala/2)){
                    _mirrory = true
                    _mirrorx = true
                    getItemTipo(tipos.CHAO, subtipos.SOMBRACIMA)
                }
            }
            if (xx == 0 && yy > 0 && yy < aSala) {//PAREDE ESQUERDA

                if (yy != floor(aSala/2)){
                    getItemTipo(tipos.PAREDE, subtipos.ESQUERDA)
                  }else{

                    //p(origem == lados.DIREITA)
                    //p(temPorta(salas[i - 1].portas, lados.DIREITA))

                    if(origem == lados.DIREITA || temPorta(salas[i - 1].portas, lados.ESQUERDA))
                    {
                        p (i-1 +" tem que ter porta na parede esquerda")
                        //porta vai aqui
                    }else{
                        getItemTipo(tipos.PAREDE, subtipos.ESQUERDA)
                    }
                }
            }
            if (xx == 0 && yy == 0) {
                getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA)
            }
            if (xx == lSala && yy > 0 && yy < aSala) {
                if (yy != floor(aSala/2)){
                    getItemTipo(tipos.PAREDE, subtipos.ESQUERDA)//PAREDE DA DIREITA
                    _mirrorx = true
                }else{

                   // p (origem == lados.ESQUERDA || temPorta(salas[i - 1].portas, lados.DIREITA))
                    //SE ESSA SALA TIVER ORIGEM A PARTIR DA ESQUERDA ELA PRECISA
                    if(origem == lados.ESQUERDA || temPorta(salas[i - 1].portas, lados.DIREITA))
                    {
                        p( "tem que ter porta na parede direita")
                        //porta vai aqui
                    }else{
                        getItemTipo(tipos.PAREDE, subtipos.ESQUERDA)
                        _mirrorx = true
                    }
                }
            }
            if (xx == lSala && yy == 0) {
                getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA)
                _mirrorx = true
            }

            if (xx == lSala && yy == aSala) {
                getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA)
                _mirrorx = true
                _mirrory = true
            }
            if (xx == 0 && yy == aSala) {
                getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA)

                _mirrory = true
            }


            // criaEntidade(xini+ (xx * tamanhoCelula),yini + (yy * tamanhoCelula),1.25,-1,-1,_mirrorx, _mirrory )


            criaEntidade(-1, -1, 1.25, xi + xx, yi + yy, _mirrorx, _mirrory)
            salas[i - 1].gSala.push(selecao.spr) // banco de salas, usar depois na geração usando game of lifeish
        }
    }
    // mudaSala(i -1 )
    // console.table (salas )
    criaPortas()
}


function mudaSala(i) {
    for (spr of salas[i].gSala) {
        spr.visible = false

    }


}


function criaItem(nome, tipo, tipoitem, min, max, img, historia = "") {

    let i = itens.push(structuredClone(item))
    itens[i - 1].tipoitem = tipoitem
    itens[i - 1].min = min
    itens[i - 1].max = max
    itens[i - 1].tipo = tipo
    itens[i - 1].nome = nome
    itens[i - 1].img = img
    itens[i - 1].historia = historia

    if (tipo === tipos.ITEM) {
        paleta.push({
            img: img,
            tipo: tipo,
            item: itens[i - 1]
        })
    }


}


/**
 * estava olhando a lista de inimigos, que serão um array 1D 
 * com varias celulas dentro , com o tipo INIMIGO
 * 
 */

// subir isso
let decoracaoCima = []
let numDeco = 7
function preload() { /**
 * inicializa as imagens
 * chao como tem variacoes usa uma array
 * o mesmo sera feito com paredes etc... o que muda é o tipo
 */
    longa = loadImage("Arte/Sprites/Item/Longa2.png")
    pocaovida = loadImage("Arte/Sprites/Item/PocaoVida.png")
    escudo = loadImage("Arte/Sprites/Item/EscudoSimples.png")


    imgOverlay = loadImage("Arte/UI/spotlight.png")
    imgchao = loadImage("Arte/Paredes/15.png")
    chaos.push(imgchao)
    imgchao = loadImage("Arte/Paredes/16.png")
    chaos.push(imgchao)
    imgchao = loadImage("Arte/Paredes/17.png")
    chaos.push(imgchao)

    imgCSE = loadImage("Arte/Paredes/00.png") // alterar pra usar um so mirror h e w
    imgCC = loadImage("Arte/Paredes/08.png")
    imgCSE2 = loadImage("Arte/Paredes/07.png")
    imgE = loadImage("Arte/Paredes/14.png")
    imgC = loadImage("Arte/Paredes/02.png")

    player = loadImage("Arte/Sprites/Player/meninagato/MGFULL.png")
    goblin = loadImage("Arte/Sprites/Goblin/0 2.png")

    Jogador.tipo = tipos.PLAYER


    /**
    * inicializa a variavel paleta com 2 variaveis, imagem e tipo 
    * ####>>>>>>>> implementar escala personalizada<<<<<<######
    */

    paleta.push({img: goblin, tipo: tipos.INIMIGO, subtipo: subtipos.VAZIO, escala : -1})
    paleta.push({img: player, tipo: tipos.PLAYER, subtipo: subtipos.VAZIO, escala : -1})
    paleta.push({img: chaos[0], tipo: tipos.CHAO, subtipo: subtipos.VAZIO, escala : -1})
    paleta.push({img: chaos[1], tipo: tipos.CHAO, subtipo: subtipos.VAZIO, escala : -1})
    paleta.push({img: chaos[2], tipo: tipos.CHAO, subtipo: subtipos.VAZIO, escala : -1})
    paleta.push({img: imgCSE, tipo: tipos.PAREDE, subtipo: subtipos.CANTOCIMAESQUERDA, escala : -1})
    paleta.push({img: imgCC, tipo: tipos.CHAO, subtipo: subtipos.SOMBRACIMA, escala : -1})
    paleta.push({img: imgCSE2, tipo: tipos.PAREDE, subtipo: subtipos.CANTOCIMAESQUERDA, escala : -1})
    paleta.push({img: imgE, tipo: tipos.PAREDE, subtipo: subtipos.ESQUERDA, escala : -1})
    paleta.push({img: imgC, tipo: tipos.PAREDE, subtipo: subtipos.CIMA, escala : -1})
    paleta.push({img: loadImage("Arte/Paredes/porta.png"), tipo: tipos.PAREDE, subtipo: subtipos.PORTA, escala : -1})
    paleta.push({img: loadImage("Arte/Sprites/Misc/luz.png"), tipo: tipos.DECORACAO, subtipo: subtipos.VAZIO, escala : -1})
    criaItem("Espada Longa do Poder", tipos.ITEM, tipoitem.ESPADALONGA, 1, 2, longa, "Criada pelo beyonder")
    criaItem("Escudo simples", tipos.ITEM, tipoitem.ESCUDODEMADEIRA, 1, 2, escudo, "Escudo Simples")
    criaItem("Pocao de vida", tipos.ITEM, tipoitem.POCAOVIDA, 1, 2, pocaovida, "Pocao de vida")

    for (a = 0; a < numDeco; a ++) {

        let imgDeco = loadImage("Arte/Sprites/Misc/top_" + a + ".png")

        paleta.push({img: imgDeco, tipo: tipos.DECORACAO, subtipo: subtipos.VAZIO, escala : -1})
    }
/***
 * 
 * #############UNIFICAR O TABULEIRO NUMA ARRAY APENAS 
 * resolver que algumas coisas tem q estar em cima tipo porta
 * 
 */
    fill2DimensionsArray(tabuleiro, tamanhoTabuleiro, tamanhoTabuleiro) // inicializa a array que é o chao
    //fill2DimensionsArray(tabuleirox, tamanhoTabuleiro, tamanhoTabuleiro)
    
    fill2DimensionsArray(paredes, tamanhoTabuleiro, tamanhoTabuleiro) // inicializa tabuleiro das paredes



}

function pt (texto)
{

    console.table(texto)

}
function p (texto)
{

    console.log(texto)

}

/**
 * pega da paleta uma entidade do tipo e subtipo escolhido
 */
function getItemTipo(_tipo, _subtipo) {

    let n = 1
    if (_tipo === tipos.DECORACAO)
    {
        let bdecos = []
        for (_item of paleta) {
            if (_item.tipo == tipos.DECORACAO)
            {
                bdecos.push (_item)
            }
            n++
        }
        let rnd = floor(random (0, bdecos.length -1))
        
        //selecao.ipaleta = n
        selecao.img = bdecos[rnd].img
        selecao.tipo =bdecos[rnd].tipo
        

        return 2
    }

    
    for (_item of paleta) {
        if (_item.tipo == _tipo && _item.subtipo == _subtipo) {
            selecao.ipaleta = n
            selecao.img = _item.img
            selecao.tipo = _item.tipo
            return 1
        }
        n++
    }

    return 0
}




function setup() {
    gspr = new Group()
    createCanvas(800, 800);
    noSmooth() // importante sempre usar

    rectMode(RADIUS);
    strokeWeight(2);


}

function draw() {
    var flutuacao = (0.03 * (sin(frameCount* 8)))  +1
    clear()
    camera.on();
    camera.zoom = zoomatual;
    if (inicializa) {
        geraGrade()
        tamanhosalainicial = 6

        criaSala(tamanhoTabuleiro / 2 * tamanhoCelula, tamanhoTabuleiro / 2 * tamanhoCelula, tamanhosalainicial, tamanhosalainicial)
        // o 2 o tamanho da sala/2
        camera.x = ((tamanhoTabuleiro / 2) * tamanhoCelula) + 2 * tamanhoCelula
        camera.y = ((tamanhoTabuleiro / 2) * tamanhoCelula) + 2 * tamanhoCelula
         

        criaEntidadeSala(salas[0], tipos.PLAYER)
        criaEntidadeSala(salas[0], tipos.INIMIGO)
        
        criaEntidadeSala(salas[0], tipos.INIMIGO)
        criaEntidadeSala(salas[0], tipos.INIMIGO)

        for (porta of salas[0].portas)
        {

            if (porta == lados.CIMA)
                criaEntidadeSala(criaSalaCima(salas[0]), tipos.INIMIGO)

            if (porta == lados.BAIXO)
                criaEntidadeSala(criaSalaBaixo(salas[0]), tipos.INIMIGO)
            
            if (porta == lados.ESQUERDA)
                criaEntidadeSala(criaSalaEsquerda(salas[0]), tipos.INIMIGO)
            if (porta == lados.DIREITA)
                criaEntidadeSala(criaSalaDireita(salas[0]), tipos.INIMIGO)

        }
        /*criaEntidadeSala(criaSalaNorte(salas[0]), tipos.INIMIGO)
        criaEntidadeSala(criaSalaSul(salas[0]), tipos.INIMIGO)
        criaEntidadeSala(criaSalaOeste(salas[0]), tipos.INIMIGO)
        criaEntidadeSala(criaSalaLeste(salas[0]), tipos.INIMIGO)*/

        //getItemTipo(tipos.PLAYER, subtipos.VAZIO)

        //criaEntidade(-1, -1, 1.25, (tamanhoTabuleiro / 2 + 2), (tamanhoTabuleiro / 2 + 2), true)

        //getItemTipo(tipos.INIMIGO, subtipos.VAZIO)
        //criaEntidade(-1, -1, 1.25, (tamanhoTabuleiro / 2 + 3), (tamanhoTabuleiro / 2 + 2))


    }
    allSprites.draw()

    for (xx = 0; xx < tamanhoTabuleiro; xx ++) {
        for (chao of tabuleiro[xx]) {

            chao.draw()

        }
    }
    if (Jogador.spr) {
        push()

        tint(0, 0, 0, 220)
        Jogador.sprSombra.scale = flutuacao +0.05
        Jogador.sprSombra.draw()

        pop()

        
        Jogador.spr.scale = flutuacao +0.05
        /**
         * funciona assim, eu quero a variação de 0.1 no numero 1 o 2 é a velocidade
         * 
         */
        Jogador.spr.draw()
    }
    if (! inicializa) {

        for (inimigo of inimigos) {

            push()

            tint(0, 0, 0, 220)
            inimigo.sprSombra.scale = flutuacao + 0.02
            inimigo.sprSombra.draw()

            pop()
            inimigo.spr.scale = flutuacao + 0.02
            inimigo.spr.draw()

        }


        for (xx = 0; xx < tamanhoTabuleiro; xx ++) {
            for (yy = 0; yy < tamanhoTabuleiro; yy ++) {
                if (paredes[xx][yy].spr) {
                    paredes[xx][yy].spr.draw()
                }

            }

        }
        for (decoracao of decoracaoCima) {
            decoracao.spr.draw()

        }
    }


    camera.off() // desliga acamera para fazer a ui
    push()
    blendMode(MULTIPLY)
    tint(240 + noise(frameCount) * 300, 240 + noise(frameCount) * 300, 140 + noise(frameCount) * 200, 170)
    image(imgOverlay, -100, -100)


    pop()
    strokeWeight(8)
    if (mostraPaleta) {

        drawPaleta()
    }

    fill(20, 22, 26)

    text("Greedy Bastars - CatGirls Tail - maptool v0.5 - @zednaked", width / 2, 20)
}

/**
 * SELECIONA O ITEM 
 */
function selecionaItem(_entidade) {
    selecao.spr = _entidade.spr
    selecao.ipaleta = _entidade.ipaleta
    selecao.tipo = _entidade.tipo
    selecao.entidade = _entidade

    console.log("selecionado : " + _entidade.nome)
}

/***
 * DIZ O QUE TEM NUM TILE POR COORDENADA DE TELA OU DE XIYI
 * 
 */
function getItemMapa(xx = -1, yy = -1, xi = -1, yi = -1) {

    if (xi === -1) {
        xi = floor(xx / tamanhoCelula) // indicex
        yi = floor(yy / tamanhoCelula) // indice y

    }
    if (xx === -1) {
        xx = xi * tamanhoCelula
        yy = yi * tamanhoCelula
        console.log("entrou aqui")
    }

    xx = xi * tamanhoCelula
    yy = yi * tamanhoCelula

    /*
    if (xi === -1) {
        xi = floor(xx / (width / tamanhoTabuleiro)) // indicex
        yi = floor(yy / (height / tamanhoTabuleiro)) // indice y
    }

    if (xx === -1) {
        xx = floor(xi * (width / tamanhoTabuleiro))
        yy = floor(yi * (height / tamanhoTabuleiro))
    }
    xx = floor(xx / (width / tamanhoTabuleiro)) * (width / tamanhoTabuleiro) - (width / (tamanhoTabuleiro * 2)) // localização na tela
    yy = floor(yy / (height / tamanhoTabuleiro)) * (height / tamanhoTabuleiro) - (height / (tamanhoTabuleiro * 2)) // localização na tela
*/
    if (paredes[xi][yi].tipo == tipos.PAREDE) {
        console.log("tem uma parede aqui")
        console.log(paredes[xi][yi].nome)
        return paredes[xi][yi]
    }

    if (Jogador.xi === xi && Jogador.yi === yi) {
        console.log("a menina gato ta qui")
        return Jogador
    }
    if (tabuleiro[xi][yi].tipo == tipos.CHAO) {
        console.log("tem um chao aqui")

        return tabuleiro[xi][yi]
    }
    for (_inimigo of inimigos) {

        if (_inimigo.xi === xi && _inimigo.yi === yi) {
            console.log("tem um inimigo aqui")
            console.log(_inimigo.nome)
            return _inimigo
        }
    }

    for (_item of itensnomapa) {

        if (_item.xi === xi && _item.yi === yi) {
            console.log("tem um item aqui")
            console.log(_item.nome)
            return _item
        }
    }


    return -1
}


/**
 * CONVERTER ISSO PARA UMA FUNCAO QUE CRIA PAINEIS
 * 
 */
function drawPaleta() {


    mapeiaMouse()

    push()
    noStroke()
    fill(0, 20)
    rect(bx + 9, by + 11 + 80, boxSize, boxSize + 180);
    pop()
    strokeCap(ROUND)
    rect(bx, by + 180, boxSize, boxSize + 180);


    /**
     * MUDAR AQUI PARA APARECER COISAS DIFERENTES DEPENDENDO
     * DO QUE ESTIVER SELECIONADO !!!!
     *FOCO AQUI
     * 
     */

    if (selecao.item) {

        text("nome:", bx - 90, by + 450 - 30)
        text(selecao.item.nome, bx, by + 450 - 30)
        text("", bx + 90, by + 250 - 30)
    } else {

        if (selecao.entidade) {


            text(selecao.entidade.nome, bx - 90, by + 550 - 30)
            text("", bx, by + 550 - 30)
            text("", bx + 90, by + 550 - 30)
        }
    }

    text("espelharh", bx - 90, by + 450)
    text("rodar", bx, by + 450)
    text("espelharv", bx + 90, by + 450)
    noStroke()
    fill(10)
    textSize(17)
    textAlign(CENTER)


    text("Paleta de Tiles", bx, by - 100)

    fill(255, 0, 0, 100)
    plotaPaleta()

}

function removeEntidade(_entidade) {
    console.log(_entidade.tipo)
    if (_entidade.tipo === tipos.PAREDE) {
        _entidade.tipo = tipos.VAZIO
        _entidade.spr.remove()
    }

    if (_entidade.tipo === tipos.INIMIGO) {
        console.log("deletou um inimigo")
        _entidade.tipo = tipos.VAZIO
        _entidade.spr.remove()
        inimigos.splice(_entidade.index, 1)

    }
    if (_entidade.tipo === tipos.ITEM) {
        console.log("deletou um item")
        _entidade.tipo = tipos.VAZIO
        _entidade.spr.remove()
        itensnomapa.splice(_entidade.index, 1)

    }

}
/**
 * cria celula 
 * TODO.
 * 
 */
function criaEntidade(xx, yy, escala = 1.25, xi = -1, yi = -1, mirrorx = false, mirrory = false, rotation = -1) {

    if (xi === -1) {
        xi = floor(xx / tamanhoCelula) // indicex
        yi = floor(yy / tamanhoCelula) // indice y

    }
    if (xx === -1) {
        xx = xi * tamanhoCelula
        yy = yi * tamanhoCelula
        // console.log("entrou aqui")
    }xx = xi * tamanhoCelula
    yy = yi * tamanhoCelula


    // xx = floor(xx / tamanhoCelula)  // localização na tela
    // yy = floor(xx / tamanhoCelula)  // faz so um <<<<<<<<< sao iguais

    // tabuleiro[xi][yi].addImage(selecao.img)
    // console.log (xx+"x"+yy)
    /**
    * se for do tipo item
    */
    if (selecao.tipo == tipos.VAZIO) {
        return
    }


    if (selecao.tipo === tipos.DECORACAO) {
        var ini = decoracaoCima.push(structuredClone(entidade))
        decoracaoCima[ini - 1].x = xx
        decoracaoCima[ini - 1].y = yy
        decoracaoCima[ini - 1].xi = xi
        decoracaoCima[ini - 1].yi = yi
        decoracaoCima[ini - 1].tipo = tipos.ITEM
        decoracaoCima[ini - 1].item = selecao.item
        // esse nome tem q ter em algum lugar
        decoracaoCima[ini - 1].nome = "Decoracao " + ini - 1


        selecao.entidade = decoracaoCima[ini - 1]

        decoracaoCima[ini - 1].index = ini - 1

        decoracaoCima[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula)
        decoracaoCima[ini - 1].spr.scale = 1.50
        if (mirrorx) {

            decoracaoCima[ini - 1].spr.mirror.x = true
            
            
            
        }
        if (mirrory) {

            decoracaoCima[ini - 1].spr.mirror.y = true
            decoracaoCima[ini - 1].spr.y += 55

        }else{

            decoracaoCima[ini - 1].spr.y -= 55
        }
        
        decoracaoCima[ini - 1].spr.addImage(selecao.img)
        decoracaoCima[ini - 1].spr.overlap(allSprites)
        selecao.entidade = decoracaoCima[ini - 1]
        selecao.spr = decoracaoCima[ini - 1].spr
      
        return
    }
    // console.log (selecao.tipo)
    if (selecao.tipo === tipos.ITEM) { /**
     * precisa fazer
     */
        var ini = itensnomapa.push(structuredClone(entidade))

        itensnomapa[ini - 1].x = xx
        itensnomapa[ini - 1].y = yy
        itensnomapa[ini - 1].xi = xi
        itensnomapa[ini - 1].yi = yi
        itensnomapa[ini - 1].tipo = tipos.ITEM
        itensnomapa[ini - 1].item = selecao.item
        // esse nome tem q ter em algum lugar
        itensnomapa[ini - 1].nome = selecao.item.nome
        selecao.entidade = itensnomapa[ini - 1]
        itensnomapa[ini - 1].index = ini - 1
        itensnomapa[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula)
        itensnomapa[ini - 1].spr.addImage(selecao.img)
        itensnomapa[ini - 1].spr.overlap(allSprites)
        selecao.entidade = itensnomapa[ini - 1]
        selecao.spr = itensnomapa[ini - 1].spr
        return

    }

    /**
 * se for do tipo CHAO
 */

    if (selecao.tipo == tipos.CHAO) {
        if (paredes[xi][yi].tipo == tipos.PAREDE) {

            paredes[xi][yi].spr.remove()
            paredes[xi][yi].tipo = tipos.VAZIO


        }

    }

    /**
 * Se for do tipo INIMIGO
 */
    if (selecao.tipo === tipos.INIMIGO) {
        for (inimigo of inimigos) {
            if (inimigo.xi == xi && inimigo.yi == yi) {
                console.log("ja tem outro inimigo")
                // tabuleiro[xi][yi].remove()
                return

            }

        }
        if (Jogador.xi == xi && Jogador.yi == yi) {
            // tabuleiro[xi][yi].remove()
            // console.log("o jogador esta ai")
            return

        }
        var ini = inimigos.push(structuredClone(entidade))

        inimigos[ini - 1].x = xx
        inimigos[ini - 1].y = yy
        inimigos[ini - 1].xi = xi
        inimigos[ini - 1].yi = yi
        // esse nome tem q ter em algum lugar
        inimigos[ini - 1].nome = "Goblinzitus:" + xi + "x" + yi
        inimigos[ini - 1].tipo = tipos.INIMIGO

        inimigos[ini - 1].index = ini - 1

        inimigos[ini - 1].sprSombra = new Sprite(xx - 2, yy + 36, tamanhoCelula, tamanhoCelula)
        inimigos[ini - 1].sprSombra.overlap(allSprites)
        inimigos[ini - 1].sprSombra.addImage(selecao.img)
        inimigos[ini - 1].sprSombra.mirror.y = true
        inimigos[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula)
        inimigos[ini - 1].spr.addImage(selecao.img)
        inimigos[ini - 1].spr.overlap(allSprites)
        selecao.entidade = inimigos[ini - 1]
        selecao.spr = inimigos[ini - 1].spr
        return


    }
    /**
    * se for do tipo PLAYER
    */
    if (selecao.tipo === tipos.PLAYER) {

        /*
        if (paredes[xi][yi].tipo == tipos.PAREDE) {
            console.log("tem uma parede ai")

            //tabuleiro[xi][yi].remove()
            return

        }
        */

        // tabuleiro[xi][yi].remove()
        if (Jogador.spr != 0) {
            Jogador.spr.remove()
            Jogador.sprSombra.remove()

        }
        Jogador.x = xx
        Jogador.y = yy
        Jogador.xi = xi
        Jogador.yi = yi
        Jogador.ipaleta = selecao.ipaleta
        Jogador.tipo = tipos.PLAYER
        Jogador.subtipo = subtipos.VAZIO


        Jogador.sprSombra = new Sprite(xx - 2, yy + 26, tamanhoCelula, tamanhoCelula)
        Jogador.sprSombra.overlap(allSprites)

        Jogador.sprSombra.mirror.y = true
        Jogador.spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula)
        Jogador.spr.addImage(selecao.img)
        Jogador.spr.overlap(allSprites)
        selecao.entidade = Jogador
        selecao.spr = Jogador.spr
        if (mirrorx) {

            Jogador.spr.mirror.x = true
            Jogador.sprSombra.mirror.x = true
        }
        if (mirrory) {

            Jogador.spr.mirror.y = true
            Jogador.sprSombra.mirror.y = true

        }

        Jogador.sprSombra.addImage(selecao.img)


        Jogador.nome = "Menina Gato"
        return
    }
    /**
 * se for do tipo PAREDE
 */

    if (selecao.tipo == tipos.PAREDE) {
        if (paredes[xi][yi].tipo == tipos.PAREDE) { // tabuleiro[xi][yi].remove()
            paredes[xi][yi].spr.remove()
            paredes[xi][yi].tipo = tipos.VAZIO
            console.log("ja tinha uma parede ai")
            return
        }
        // console.log (xx+" "+yy)

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
        // paredes[xi][yi].scale = 1
        paredes[xi][yi].rotation = 0

        paredes[xi][yi].nome = "Parede:" + xi + "x" + yi
        paredes[xi][yi].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula)


        if (mirrorx) {

            paredes[xi][yi].spr.mirror.x = true
            paredes[xi][yi].mirrorx = true
        }
        if (mirrory) {

            paredes[xi][yi].spr.mirror.y = true
            paredes[xi][yi].mirrory = true

        }
        paredes[xi][yi].spr.overlap(allSprites)
        paredes[xi][yi].spr.addImage(selecao.img)
        // paredes[xi][yi].spr.scale = escala
        selecao.entidade = paredes[xi][yi]
        selecao.spr = paredes[xi][yi].spr
        return
        // console.log ("criou uma parede")
        // console.table (paredes[xi][yi])

    }tabuleiro[xi][yi] = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula)
    // tabuleiro[xi][yi].scale = escala

    if (mirrorx) {
        tabuleiro[xi][yi].mirror.x = true
    }
    if (mirrory) {
        tabuleiro[xi][yi].mirror.y = true

    }
    tabuleiro[xi][yi].overlap(allSprites)
    // tabuleiro[xi][yi].tileSize = tamanhoCelula
    // tabuleiro[xi][yi].scale = escala
    if (! inicializa) {
        if (tabuleiro[xi][yi].tipo == selecao.tipo) {
            tabuleiro[xi][yi].remove()

        }
    }


    if (inicializa) {
        rnum = 90 * floor(random(4))
        ri = floor(random(2, 4))
        getItemTipo(tipos.CHAO, subtipos.VAZIO)
        tabuleiro[xi][yi].addImage(selecao.img)
        tabuleiro[xi][yi].rotation = rnum
        // tabuleirox[xi][yi].ipaleta = ri
        // tabuleirox[xi][yi].rotation = rnum
    } else { // arrumar ISSO TA ESCULHAMBADO
        if (selecao.tipo != tipos.parede) {
            tabuleiro[xi][yi].addImage(selecao.img)
        }
        // tabuleiro[xi][yi].debug = true
    }
    // arrumar ESTA ESCULHAMBADO
    if (selecao.tipo != tipos.CHAO) {
        selecao.spr = tabuleiro[xi][yi]
    } else {
        tabuleiro[xi][yi].remove()
    }
}
