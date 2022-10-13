//primeiramente iremos fazer uma engine que abra  os meus sprites quebrados
let splayer;
let fundo;

let gsprites

let imgplayer;
let imgcabeca;
let buffer;
let clicks;

let zoomz = 4


function preload(){


  imgplayer = loadImage (
    "/Arte/Sprites/Player/meninagato.png");

   
}

function keyReleased(){ 

if (keyCode === LEFT_ARROW)
{
  splayer.scale +=1
  zoomz += 1
}else if (keyCode === RIGHT_ARROW)
{
  splayer.scale -= 1
  zoomz -= 1
ß
}



}

function mouseClicked()
{
 
   //imgplayer = crop (imgplayer,54,33,24,21)


  clicks.push ({
      x : mouseX,
      y : mouseY
    });
  if (clicks.length == 2)
  {
   let xini = round(clicks[0].x/zoomz) 
   let yini = round(clicks[0].y/zoomz)
   let wini = round((clicks[1].x - clicks[0].x)/zoomz)
   let hini = round((clicks[1].y - clicks[0].y)/zoomz)
   let ani = splayer.animation
   let imagem = ani.images[0]
   let vetorimg = crop (imagem,xini,yini,wini,hini)

    //cria novo sprite e separa
    let pedaco = new Sprite ()
    
    pedaco.addImage(vetorimg); 
    gsprites.add (pedaco)
 
    pedaco.scale = zoomz
    pedaco.h = hini
    pedaco.w = wini
    pedaco.x = width/2
    pedaco.y = 20

    clicks = []
   
  }
}


function crop(image, x, y, w, h) {
  let cropped = createImage(w, h);
  noSmooth()
  cropped.copy(image, x, y, x + w, y + h, 0, 0, x + w, y + h);
 

  return cropped;
}

function setup() {
  clicks = [];
  gsprites = new Group();
  createCanvas(500, 500);

  //rectMode()
  strokeWeight(1); 
  //imgplayer = crop(imgplayer,0,0,60,60);
  camera.on();
  //camera.zoom = zoomz;


  splayer = new Sprite ();
  splayer.overlap(allSprites);
  push()
  splayer.addAni (imgplayer);
  
  
  pop()
  splayer.scale =zoomz
  splayer.x = width/2;
  splayer.y = height/2;

  
}

function draw() {
//clear()
  noSmooth();
  background(150)
  camera.on();
  //camera.zoom = zoomz;
  //tint(0, 153, 204);
  allSprites.draw();
}
