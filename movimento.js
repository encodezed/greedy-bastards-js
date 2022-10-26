const CIMA = 0
const DIREITA = 1
const BAIXO = 2
const ESQUERDA = 3

function testaCelula (direcao)
{
  

    //let colisor = new Sprite (xxx,yyy, 200,200)
    //colisor.static = true
    //gcolisor.push (colisor)

    switch (direcao){
        case CIMA:
            if (personagem.colisorcima.colliding(gparedes))
            {
                console.log ("cima")
                return false
            }
        break;
        case DIREITA:
            if (personagem.colisordireita.overlapping(gparedes))
            {
                console.log ("direita")
                return false
            }
        break
        case ESQUERDA:
            if (personagem.colisoresquerda.overlapping(gparedes))
            {
                console.log ("esquerda")
                return false
            }
        break;
        case BAIXO:
            if (personagem.colisorbaixo.overlapping(gparedes))
            {
                console.log ("baixo")
                return false
            }
        break;
    }


    return true
 
}


function moveDireita(qtd) {
    if (testaCelula(DIREITA)){
    personagem.x += qtd

    personagem.corpo.cabeca.x += qtd;
    personagem.corpo.tronco.x += qtd;
    personagem.corpo.bracodireito.x += qtd;
    personagem.corpo.bracoesquerdo.x += qtd;
    personagem.corpo.armaesquerda.x += qtd
    personagem.corpo.pernas.x += qtd;
    if (personagem.corpo.rabo.mirror.x) {

        personagem.corpo.katana.x += qtd;
        personagem.corpo.rabo.x += qtd;
       // personagem.corpo.armaesquerda.rotation = false
    } else {
        personagem.corpo.katana.x += qtd - 22;
        personagem.corpo.rabo.mirror.x = true;
        personagem.corpo.katana.mirror.x = true;
        personagem.corpo.armaesquerda.rotation = 590
        personagem.corpo.armaesquerda.x += 29
        personagem.corpo.rabo.x += qtd - 28;
    }
    personagem.corpo.sombra.x += qtd;
    personagem.corpo.cabeca.mirror.x = true;
    }

}
function moveEsquerda(qtd) {
    if (testaCelula(ESQUERDA)){
    personagem.x -= qtd
    personagem.corpo.cabeca.x -= qtd;
    personagem.corpo.tronco.x -= qtd;
    personagem.corpo.bracodireito.x -= qtd;
    personagem.corpo.bracoesquerdo.x -= qtd;
    personagem.corpo.armaesquerda.x -= qtd

    personagem.corpo.pernas.x -= qtd;
    if (personagem.corpo.rabo.mirror.x) {
        personagem.corpo.katana.x -= qtd - 22;
        personagem.corpo.rabo.mirror.x = false;
        personagem.corpo.katana.mirror.x = false;
        personagem.corpo.rabo.x -= (qtd - 28);
        personagem.corpo.armaesquerda.mirror.x = false
        personagem.corpo.armaesquerda.rotation = 150
        personagem.corpo.armaesquerda.x -= 29
    } else {
        personagem.corpo.rabo.x -= qtd;
        personagem.corpo.katana.x -= qtd;
        //personagem.corpo.armaesquerda.mirror.x = true
        //personagem.corpo.katana.mirror.x = true;
    }

    personagem.corpo.sombra.x -= qtd;
    personagem.corpo.cabeca.mirror.x = false;
    }
}



function moveCima(qtd) {


  if (testaCelula(CIMA)){
    personagem.y -= qtd
    personagem.corpo.cabeca.y -= qtd;
    personagem.corpo.tronco.y -= qtd;
    personagem.corpo.bracodireito.y -= qtd;
    personagem.corpo.bracoesquerdo.y -= qtd;
    personagem.corpo.armaesquerda.y -= qtd
    personagem.corpo.katana.y -= qtd;
    personagem.corpo.pernas.y -= qtd;
    personagem.corpo.rabo.y -= qtd;
    personagem.corpo.sombra.y -= qtd;
    }

  
}
function moveBaixo(qtd) {
    if (testaCelula(BAIXO)){
    personagem.corpo.cabeca.y += qtd;
    personagem.corpo.tronco.y += qtd;
    personagem.corpo.bracodireito.y += qtd;
    personagem.corpo.bracoesquerdo.y += qtd;
    personagem.corpo.armaesquerda.y += qtd
    personagem.corpo.katana.y += qtd;
    personagem.corpo.pernas.y += qtd;
    personagem.corpo.rabo.y += qtd;
    personagem.y += qtd
    personagem.corpo.sombra.y += qtd;
    }
}
function keyPressed() {
   
    switch (keyCode) {
        case RIGHT_ARROW:
            if (!inventario){
               moveDireita(personagem.velocidade);
               updateColisor()
        }
            break;
        case LEFT_ARROW:
            if (!inventario){
                moveEsquerda(personagem.velocidade);
                updateColisor()
            }
            break;
        case UP_ARROW:
            if (!inventario)    
            {
                moveCima(personagem.velocidade);
                updateColisor();
            }
            
            break;
        case DOWN_ARROW:
            if (!inventario)   
             { 
                moveBaixo(personagem.velocidade);
                updateColisor()
            }
            break; 
        case 73:
            testaCelula(CIMA)
          //  doGreedynomicon()

    }


}

function updateColisor ()
{

    personagem.colisorcima.x = personagem.x 
    personagem.colisorcima.y = personagem.y -24
    
    personagem.colisorbaixo.x = personagem.x
    personagem.colisorbaixo.y = personagem.y +24
    
    personagem.colisoresquerda.x = personagem.x - 24
    personagem.colisoresquerda.y = personagem.y 
    personagem.colisordireita.x = personagem.x+24 
    personagem.colisordireita.y = personagem.y 


}