function geraGrade()
{
    const linhas = tamanhotabuleiro
    const colunas = tamanhotabuleiro

    for (xx = 0; xx < colunas;xx ++ )
    {
        for (yy = 0; yy <linhas; yy++)
        {    
           selecao.img = paleta[rolaDado(2,5)].img
           criaEntidade (xx * (width/colunas),yy * (height/linhas))
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
function mousePressed() 
{
if (!mostrapaleta){return}
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
    if (!mostrapaleta){return}
    if (locked) {
      bx = mouseX - xOffset;
      by = mouseY - yOffset;
    }
  }
  
  function mouseReleased() 
  {
    if (!mostrapaleta){return}
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

function keyReleased()
{
    switch (keyCode){

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

        case 83: //s
        let buffer = []
        fill2DimensionsArray(buffer,tamanhotabuleiro,tamanhotabuleiro)
        for (a= 0; a < tamanhotabuleiro; a++)
        {
            for (b=0; b < tamanhotabuleiro; b++)
                
                 {
                    buffer[a][b] = paredes[a][b]
                    buffer[a][b].spr = 0
                 }
        }
            
            saveJSON (paredes,  "/mapas.json")
          //  window.localStorage.setItem("mapa",JSON.stringify(buffer),)
           console.log ("mapa salvo")
            break
        case 76://l
        carregaMapa()
            break
        case 87:
            selecao.spr.move ("up") //w
            break
        case 80:
            mostrapaleta = !mostrapaleta

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


function mapeiaMouse()
{
    if (mostrapaleta)
    {
        if (
            mouseX > bx - boxSize &&
            mouseX < bx + boxSize &&
            mouseY > (by-160 ) - (boxSize-160) &&
            mouseY < (by +160) + (boxSize)
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
    }
}
function mouseClicked()
{
    
    getItemPaleta()

    if (!mostrapaleta)
    {
        overBox = false
    }
    if (!overBox){
   
        criaEntidade(mouse.x, mouse.y);
    }else{

        if (
                mouseX > bx-110 &&
                mouseX < bx-70 &&
                mouseY > by+240 &&
                mouseY < by+260 
         )
        {
            selecao.spr.mirror.x = !selecao.spr.mirror.x
            console.log("espelhah")
        }

        if (
            mouseX > bx-15 &&
            mouseX < bx+15 &&
            mouseY > by+240 &&
            mouseY < by+260 
           )
        {
            selecao.spr.rotation += 90
            console.log("roda")
        }

        if (
            mouseX > bx+90-15 &&
            mouseX < bx+90+15 &&
            mouseY > by+240 &&
            mouseY < by+260 
           )
        {
            selecao.spr.mirror.y = !selecao.spr.mirror.y
            console.log("espelhav")
        }


     //   text ("espelharh", bx-90,by+250)
    //text ("rodar", bx,by+250)
    //text ("espelharv", bx+90,by+250)

    }


}
function getItemPaleta (ncolunas = 4){
    if (!mostrapaleta) return;
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
    
                    //se for player ele coloca o jogador dentro da selecao.entidade para facil acesso no subpainel
                    if (selecao.tipo == tipos.PLAYER){
                        selecao.entidade = Jogador
                    }
                    if (selecao.tipo == tipos.INIMIGO){
                        selecao.entidade = inimigos[inimigos.length-1]
    
                    }
                    if (selecao.tipo == tipos.ITEM){
    
                        
                        console.log (ipaleta)
                        console.log (itens.length)
                        console.log (itens.length - (13-ipaleta))
                        selecao.item = paleta[ipaleta].item
    
                    }
                    
                    return
                }
    
            xxx += hspc
            ii++
            ipaleta ++
       
        }
    
    }
    
    