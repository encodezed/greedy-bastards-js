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