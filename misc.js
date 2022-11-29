function geraGrade() {
    const linhas = tamanhoTabuleiro
    const colunas = tamanhoTabuleiro

    for (xx = 0; xx < colunas; xx ++) {
        for (yy = 0; yy < linhas; yy ++) {
            //selecao.img = paleta[rolaDado(2, 5)].img
            //getItemTipo(tipos.CHAO, subtipos.VAZIO)
           // camera.on()
            criaEntidade(xx*tamanhoCelula,yy*tamanhoCelula,1.25)
            //camera.off()
        }
    }
    inicializa = false
   
  //  criaGrade()
}

function criaGrade() { // linhas
    const linhas = tamanhoTabuleiro
    const colunas = tamanhoTabuleiro
    line(0, yy * (height / linhas), width, yy * (height / linhas))
    // meio
    point(xx * (width / colunas) + (width / tamanhoTabuleiro) / 2, yy * (height / linhas) + (height / tamanhoTabuleiro) / 2)
    // colunas
    line(xx * (width / colunas), 0, xx * (width / colunas), height)
}
function mousePressed() {
    if (mouseButton === RIGHT) {

       
       // sisParticulas (mouse.x,mouse.y)
        //selecionaItem(getItemMapa(mouse.x,mouse.y))

     
    }
    if (!mostraPaleta) {
        return
    }
    if (overBox) {
        locked = true;
        fill(150, 122, 158)
    } else {
        locked = false;
    }
    xOffset = mouseX - bx;
    yOffset = mouseY - by;
}

function mouseDragged() {
    if (!mostraPaleta) {
        return
    }
    if (locked) {
        bx = mouseX - xOffset;
        by = mouseY - yOffset;
    }
}

function mouseReleased() {
    if (!mostraPaleta) {
        return
    }
    locked = false;
}

function fill2DimensionsArray(arr, rows, columns) {
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = structuredClone(entidade);
        }
    }
}

function rolaDado(min = 0, max = 10) {

    return floor(random(min, max))

}
function plotaPaleta(i = 0, ncolunas = 4) {
    xini = bx - 133
    xxx = xini
    yini = by - 65
    yyy = yini
    vspc = 67
    hspc = 67

    xxxr = bx - 95
    yyyr = by - 15

    ii = 0

    for (item of paleta) {

        if (ii == ncolunas) {
            yyy += vspc
            xxx = xini
            ii = 0

        }
        const itemMenor = item.img
        image(itemMenor, xxx, yyy)
        //itemMenor.resize (32,32)
  
        
        xxx += hspc

        ii ++

    }
}

function keyReleased() {
    switch (keyCode) {
       
        case 56: //cima no numpad
            if (moveEntidade(Jogador, 0,-1))camera.y -= 64
            setTimeout(doAiInimigos,200)
           // doAiInimigos()
            
        break
        case 50: //baixo no numpad
           if( moveEntidade(Jogador, 0,1))camera.y += 64
           setTimeout(doAiInimigos,200)
        break
        case 52: //esquerda no numpad
           if ( moveEntidade(Jogador, 1,0)) camera.x -= 64
           setTimeout(doAiInimigos,200)
        break
        case 54: //direita numpad
            if (moveEntidade(Jogador, -1,0))  camera.x += 64
            setTimeout(doAiInimigos,200)
        break
        
        case 67: 
            limpaMapa()
            break
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
            camera.y -= 64
            break
        case DOWN_ARROW:
            camera.y += 64
            break
        case LEFT_ARROW:
            camera.x -= 64
            break
        case RIGHT_ARROW:
            camera.x += 64
            break

        case 83: // s
            let buffer = []
            fill2DimensionsArray(buffer, tamanhoTabuleiro, tamanhoTabuleiro)
            for (a = 0; a < tamanhoTabuleiro; a ++) {
                for (b = 0; b < tamanhoTabuleiro; b ++) {
                    buffer[a][b] = paredes[a][b]
                    buffer[a][b].spr = 0
                }
            }

            saveJSON(paredes, "/mapas.json")
            window.localStorage.setItem("mapa", JSON.stringify(buffer),)
            console.log("mapa salvo")
            break
        case 76: // l
            carregaMapa()
            break
        case 87:
            //selecao.spr.move("up") // w
            switch (modoAtual){
                case modos.CRIASALA:
                    modoAtual = modos.EDICAO
                    console.log ("modo edicao")
                    mostraPaleta = true
                    break
                case modos.EDICAO:
                    modoAtual = modos.CRIASALA
                    console.log("modo criasala")
                    mostraPaleta  = false
                    break


            }
            
            break
        case 80:
            mostraPaleta = !mostraPaleta
            break
        case 72:
            // h
            // atualizar
            selecao.spr.mirror.x = !selecao.spr.mirror.x

            break
        case 86:
            // v

            // atualizar
            selecao.spr.mirror.y = !selecao.spr.mirror.y
            break
    }

}


function mapeiaMouse() {
    if (mostraPaleta) {
        if (mouseX > bx - boxSize && mouseX < bx + boxSize && mouseY > (by - 160) - (boxSize - 160) && mouseY < (by + 160) + (boxSize)) { // esta dentro da caixa
            overBox = true;
            if (!locked) {
                stroke(255);
                fill(150, 122, 158);
            }
        } else {
            stroke(226, 220, 176);
            fill(122, 122, 158);
            overBox = false;
        }
    }
}
function mouseClicked() {

    getItemPaleta()

    if (!mostraPaleta) {
        overBox = false
    }
    //se NAO estiver dentro da paleta
    if (!overBox) {

            switch (modoAtual)
            {
                case modos.EDICAO:
                    criaEntidade(mouse.x, mouse.y)
                    break
                case modos.CRIASALA:
                    criaSala (mouse.x, mouse.y,6,4)
                    break


            }
            
        } else {

            if (mouseX > bx - 110 && mouseX < bx - 70 && mouseY > by + 240 && mouseY < by + 260) {
                selecao.spr.mirror.x = !selecao.spr.mirror.x
                console.log("espelhah")
            }

            if (mouseX > bx - 15 && mouseX < bx + 15 && mouseY > by + 240 && mouseY < by + 260) {
                selecao.spr.rotation += 90
                console.log("roda")
            }

            if (mouseX > bx + 90 - 15 && mouseX < bx + 90 + 15 && mouseY > by + 240 && mouseY < by + 260) {
                selecao.spr.mirror.y = !selecao.spr.mirror.y
                console.log("espelhav")
            }


            // text ("espelharh", bx-90,by+250)
            // text ("rodar", bx,by+250)            // text ("espelharv", bx+90,by+250)

    }


}
function getItemPaleta(ncolunas = 4) {
    if (!mostraPaleta) 
        return;
    
    xini = bx - 133
    xxx = xini
    yini = by - 65
    yyy = yini
    vspc = 67
    hspc = 67

    xxxr = bx - 95
    yyyr = by - 15

    ii = 0
    ipaleta = 0

    for (item of paleta) {

        if (ii == ncolunas) {
            yyy += vspc
            xxx = xini
            ii = 0

        }

        if (mouseX > xxx && mouseX < xxx + vspc && mouseY > yyy && mouseY < yyy + hspc) {
            selecao.img = paleta[ipaleta].img
            selecao.tipo = paleta[ipaleta].tipo
            selecao.ipaleta = ipaleta

            // se for player ele coloca o jogador dentro da selecao.entidade para facil acesso no subpainel
            if (selecao.tipo == tipos.PLAYER) {
                selecao.entidade = Jogador
            }
            if (selecao.tipo == tipos.INIMIGO) {
                selecao.entidade = inimigos[inimigos.length - 1]

            }
            if (selecao.tipo == tipos.ITEM) {


                //console.log(ipaleta)
                //console.log(itens.length)
                //console.log(itens.length -(13 - ipaleta))
                selecao.item = paleta[ipaleta].item

            }

            return
        }

        xxx += hspc
        ii ++
        ipaleta ++

    }

}

function limpaMapa() {

    for (a = 0; a < tamanhoTabuleiro; a ++) {
        for (b = 0; b < tamanhoTabuleiro; b ++) { // redundancia
            if (paredes[a][b].tipo === tipos.PAREDE) {

                paredes[a][b].spr.remove()
                paredes[a][b].tipo = tipos.VAZIO
                paredes[a][b].nome = "VAZIO"

            }

        }
    }


}


function itemJson() {
    // console.log()

    // tem que carrregar e ja botar o sprite la
    for (a = 0; a < tamanhoTabuleiro; a ++) {
        for (b = 0; b < tamanhoTabuleiro; b ++) {
            if (jsonparedes[a][b].tipo == tipos.PAREDE) {
                jsonparedes[a][b].xi = a
                jsonparedes[a][b].yi = b
                selecao.entidade = 0
                selecao.tipo = tipos.PAREDE
                selecao.ipaleta = jsonparedes[a][b].ipaleta
                selecao.img = paleta[selecao.ipaleta].img
                // agora manda um cria entidade
                criaEntidade(-1, -1, 1.25, a, b)

                // paredes[a][b].spr.rotation = jsonparedes[a][b].rotation
                selecao.spr = paredes[a][b].spr
                selecao.spr.x = selecao.entidade.x
                selecao.spr.y = selecao.entidade.y
            }
        }

    }

}


function carregaMapa() {
    limpaMapa()
    jsonparedes = loadJSON("mapas.json", itemJson)

}


function makeShadow(img, sigma, shadowColor, opacity) {
  // Gaussian goes to approx. 0 at 3sigma
  // away from the mean; pad image with
  // 3sigma on all sides to give space
  const newW = img.width + 6 * sigma;
  const newH = img.height + 6 * sigma;
  const g = createGraphics(newW, newH);
  
  g.imageMode(CENTER);
  g.translate(newW/2, newH/2);
  //g.tint(0, 0, 0, );
  g.image(img, 0, 0);
  g.filter(BLUR, sigma);
  
  const shadow = g.get();
  const c = color(shadowColor);
  shadow.loadPixels();
  const numVals = 4 * shadow.width * shadow.height;
  for (let i = 0; i < numVals; i+=4) {
    shadow.pixels[i + 0] = c.levels[0];
    shadow.pixels[i + 1] = c.levels[1];
    shadow.pixels[i + 2] = c.levels[2];
    shadow.pixels[i + 3] *= opacity;
  }
  shadow.updatePixels();
  
  g.remove();
  return shadow;
}
