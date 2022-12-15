p5.disableFriendlyErrors = true;
/*

 _____ ____  _____ _____ ____ ___  _   ____  ____  ____  _____  ____  ____  ____  ____ 
/  __//  __\/  __//  __//  _ \\  \//  /  __\/  _ \/ ___\/__ __\/  _ \/  __\/  _ \/ ___\
| |  _|  \/||  \  |  \  | | \| \  /   | | //| / \||    \  / \  | / \||  \/|| | \||    \
| |_//|    /|  /_ |  /_ | |_/| / /    | |_\\| |-||\___ |  | |  | |-|||    /| |_/|\___ |
\____\\_/\_\\____\\____\\____//_/     \____/\_/ \|\____/  \_/  \_/ \|\_/\_\\____/\____/
                                                                                       
 _____       _        _      _ _       _        _ _ 
/  __ \     | |      (_)    | ( )     | |      (_) |
| /  \/ __ _| |_ __ _ _ _ __| |/ ___  | |_ __ _ _| |
| |    / _` | __/ _` | | '__| | / __| | __/ _` | | |
| \__/\ (_| | || (_| | | |  | | \__ \ | || (_| | | |
 \____/\__,_|\__\__, |_|_|  |_| |___/  \__\__,_|_|_|
                 __/ |                              
                |___/                               
                                                 █████╗ ██╗     ██████╗ ██╗  ██╗ █████╗ 
                                                ██╔══██╗██║     ██╔══██╗██║  ██║██╔══██╗
                                                ███████║██║     ██████╔╝███████║███████║
                                                ██╔══██║██║     ██╔═══╝ ██╔══██║██╔══██║
                                                ██║  ██║███████╗██║     ██║  ██║██║  ██║
                                                ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝
                                        
 

TODOS:
 #########COMEÇAR A FAZER SANGUE NO CHÃO E COISAS FOFOGORE##########
 ###### FAZER COM QUE LUZES TENHAM "LUZ" ao redor usando o overlay

	-fazer com que o jogo varra a pasta de paredes e importe tudo proceduralmente conforme o nome da peça

	-ataque


*/

/**
 * globais
 */
let morreu = false;
let dialogOn = false;
let mostraPaleta = false;
let inicializa = true;
let tamanhoCelula = 64;
let tamanhoTabuleiro = 25;
let glitchmode = false;
var gSombras;

let zoomatual = 2.5;
let sprSelecionado;
var tabuleiro = [];
var inimigos = [];
var itens = []; // isso é a lista de itens tipo a paleta só que de itens
var itensnomapa = [];
var paredes = [];
var tabuleirox = [];
var chaos = [];
var paleta = [];
var mapa = [];
var imgOverlay;
var textosFlutuantes = [];

/**
 * ENUMS
 */
let n = 0;
movimentos = {
	CIMA: n,
	BAIXO: n++,
	ESQUERDA: n++,
	DIREITA: n++,
};

modos = {
	CRIASALA: 0,
	EDICAO: 1,
	JOGO: 2,
};

var modoAtual = modos.JOGO;

n = 0;
tipos = {
	PAREDE: n++,
	TRAP: n++,
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
	PORTA: n++,
	TESOURO: n++,
};

n = 0;
subtipos = {
	CANTOCIMAESQUERDA: n++,
	CIMA: n++,
	ESQUERDA: n++,
	SOMBRACIMA: n++,
	BANDEIRA: n++,
	VAZIO: n++,
	PORTA: n++,
	SPIKESOFF: n++,
	SPIKESON: n++,
	BAUON: n++,
	BAUOFF: n++,
	SANGUE: n++,
};

n = 0;
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
	NADA: n++,
};

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
	historia: "",
};

selecao = {
	ipaleta: 0,
	spr: 0,
	img: 0,
	tipo: tipos.CHAO, // parede chao player
	subtipo: -1,
	entidade: 0,
};

oSala = {
	x: 0,
	y: 0,
	xi: 0,
	yi: 0,
	nome: "sala1",
	tipo: 0,
	gSala: 0,
	portas: -1, //coloca o buffer de lados
	largura: 0,
	altura: 0,
	celulas: [],
};

var salas = [];

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
	spr: 0,
	ladoanterior: 0,
	engaged: false,
};

var Jogador = structuredClone(entidade);

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

let imgFumaca;

let gspr;
let imgCSE;
let imgCSD;
let imgCIE;
let imgCID;
let imgE;
let imgD;
let imgC;
let imgB;
let imgchao;
let imgSelecionada;
let jsonparedes;

let decoracaoCima = [];
let traps = [];
let tesouros = [];
let numDeco = 7;

let spikeson;
let spikesoff;

let lados = {
	CIMA: 0,
	BAIXO: 1,
	ESQUERDA: 2,
	DIREITA: 3,
};
let ladon = {
	0: "CIMA",
	1: "BAIXO",
	2: "ESQUERDA",
	3: "DIREITA",
};

let gSangues;
function doSangue(x, y, cor = 0) {
	if (floor(random(-1, 1))) x -= 32;
	if (floor(random(-1, 1))) x += 32;
	if (floor(random(-1, 1))) y -= 32;
	if (floor(random(-1, 1))) y += 32;
	let sangue = new Sprite(x, y, tamanhoCelula, tamanhoCelula);
	sangue.addImage(sangues[floor(random(0, 7))]);
	sangue.img.scale = random(0.7, 1.4);
	sangue.mirror.x = floor(random(-1, 1));
	//sangue.mirror.y =floor(random (-1,1))
	sangue.cor = cor;
	sangue.overlap(allSprites);
	gSangues.push(sangue);
}

/**
 * movimenta os inimigos
 *  se tiver na linha de visao
 */

function doAiInimigos() {
	for (_inimigo of inimigos) {
		_inimigo.engaged = false;
		if (distancia(_inimigo, Jogador) < 3) {
			andaDirecao(_inimigo, Jogador);
			_inimigo.engaged = true;
		}
	}
}

/**
 * Uma funcao que cria um sistema de particulas
 */

let gParticulas;

function sisParticulas(_x, _y, textura = sangues[floor(random(0,sangues.length))]) {
	for (a = 0; a < 8; a++) {
		let sprFumacinha = new Sprite(_x, _y, 50);
		//sprFumacinha.img.scale = 3;
		sprFumacinha.overlap(allSprites);
		//sprFumacinha.rotation = random(360);
		sprFumacinha.direction = random(0, -380);
		sprFumacinha.speed = random(8, 15);
		sprFumacinha.life = random(5, 7);
		sprFumacinha.rotationSpeed = 500;
		sprFumacinha.addImage(textura);
		gParticulas.push(sprFumacinha);
	}
}

function criaEntidadeSala(sala, tipo, subtipo, x, y) {
	let vmeiosala = sala.x + (sala.largura / 2) * 64;
	let hmeiosala = sala.y + (sala.altura / 2) * 64;
	let darknumberx = sala.x + floor(random(2, sala.largura - 1)) * tamanhoCelula;
	let darknumbery = sala.y + floor(random(2, sala.altura - 1)) * tamanhoCelula;

	if (vmeiosala / 2 == darknumberx) {
		darknumberx++;
	}

	if (tipo == tipos.PLAYER) {
		getItemTipo(tipos.PLAYER, subtipos.VAZIO);
		criaEntidade(vmeiosala - 3, hmeiosala - 3, 1.25, -1, -1, true);
	}
	if (tipo == tipos.INIMIGO) {
		getItemTipo(tipos.INIMIGO, subtipos.VAZIO);
		criaEntidade(darknumberx, darknumbery, 1.25, -1, -1, true);
		selecao.entidade.variacao = random(0, 0.2);
		_mirror = floor(random(-1, 2));
		selecao.entidade.spr.mirror.x = _mirror;
		selecao.entidade.sprSombra.mirror.x = _mirror;
	}

	if (tipo == tipos.TRAP) {
		getItemTipo(tipos.TRAP, subtipos.SPIKESOFF);

		criaEntidade(darknumberx, darknumbery - 2, 1.25, -1, -1, true);
	}

	if (tipo == tipos.TESOURO) {
		if (subtipo == subtipos.BAUOFF) {
			getItemTipo(tipos.TESOURO, subtipos.BAUOFF);

			criaEntidade(darknumberx, darknumbery, 2, -1, -1, true, false);
		}
	}
}

function criaPortas() {
	var buff = [];
	buff.push(lados.CIMA);
	buff.push(lados.BAIXO);
	buff.push(lados.ESQUERDA);
	buff.push(lados.DIREITA);

	let rnd = floor(random(1, 4));
	// p (rnd)
	for (a = 0; a < rnd; a++) {
		let num = floor(random(0, buff.length));
		buff.splice(num, 1);
	}
	return buff;
}
function temPorta(arr, lado) {
	for (_lado of arr) {
		if (_lado == lado) {
			return true;
		}
	}
	return false;
}

function shuffle(arr) {
	// For each slot in the array (starting at the end),
	// pick an element randomly from the unplaced elements and
	// place it in the slot, exchanging places with the
	// element in the slot.
	for (var slot = arr.length - 1; slot > 0; slot--) {
		var element = randInt(slot + 1);
		swap(arr, element, slot);
	}
}

function fechaPortaNorte(sala) {}

function fechaPortaSul(sala) {}

function criaSalaCima(sala) {
	let meiosalax = floor(sala.largura / 2);
	let meiosalay = floor(sala.altura / 2);
	let largura = floor(random(1, 3)) * 2;
	let altura = floor(random(4, 6));

	let xini = sala.xi + floor(meiosalax - largura / 2);
	let yini = sala.yi - altura - 1;

	if (xini < 0 || yini < 0) return 0; //sala fora do tabuleiro

	criaSala(
		xini * tamanhoCelula,
		yini * tamanhoCelula,
		largura,
		altura,
		lados.BAIXO
	);

	return salas[salas.length - 1]; //retorna a ultima sala
}

function criaSalaBaixo(sala) {
	let meiosalax = floor(sala.largura / 2);
	let meiosalay = floor(sala.altura / 2);
	let largura = floor(random(1, 3)) * 2;
	let altura = floor(random(4, 6));

	let xini = sala.xi + floor(meiosalax - largura / 2);
	let yini = sala.yi + sala.altura + 1;

	if (xini < 0 || yini < 0) return 0; //sala fora do tabuleiro

	criaSala(
		xini * tamanhoCelula,
		yini * tamanhoCelula,
		largura,
		altura,
		lados.CIMA
	);

	return salas[salas.length - 1]; //retorna a ultima sala
}

function criaSalaEsquerda(sala) {
	let meiosalax = floor(sala.largura / 2);
	let meiosalay = floor(sala.altura / 2);
	let largura = floor(random(1, 3)) * 2;
	let altura = floor(random(2, 3)) * 2;

	//let xini = sala.xi + floor(meiosalax - (largura/2))
	//let yini = sala.yi + sala.altura  +1

	let xini = sala.xi - largura - 1;
	let yini = sala.yi + floor(meiosalay - altura / 2);

	if (xini < 0 || yini < 0) return 0; //sala fora do tabuleiro

	criaSala(
		xini * tamanhoCelula,
		yini * tamanhoCelula,
		largura,
		altura,
		lados.DIREITA
	);

	return salas[salas.length - 1]; //retorna a ultima sala
}

function criaSalaDireita(sala) {
	let meiosalax = floor(sala.largura / 2);
	let meiosalay = floor(sala.altura / 2);
	let largura = floor(random(1, 3)) * 2;
	let altura = floor(random(2, 3)) * 2;

	//let xini = sala.xi + floor(meiosalax - (largura/2))
	//let yini = sala.yi + sala.altura  +1

	let xini = sala.xi + sala.largura + 1;
	let yini = sala.yi + floor(meiosalay - altura / 2);

	if (xini < 0 || yini < 0) return 0; //sala fora do tabuleiro

	criaSala(
		xini * tamanhoCelula,
		yini * tamanhoCelula,
		largura,
		altura,
		lados.ESQUERDA
	);

	return salas[salas.length - 1]; //retorna a ultima sala
}

/***
 * A ideia é usar salas como celulas, saber onde ficam as aberturas dela e usar um algoritimo tipo game of life para criar o mapa
 * ele analiza o que tem do lado e muda e assim por diante
 *
 *
 *
 */

function criaSala(xini, yini, lSala, aSala, origem = -1) {
	let _mirrorx;
	let _mirrory;
	let i = salas.push(structuredClone(oSala));
	xi = floor(xini / tamanhoCelula); // indicex
	yi = floor(yini / tamanhoCelula); // indice y
	salas[i - 1].largura = lSala;
	salas[i - 1].altura = aSala;
	salas[i - 1].x = xini;
	salas[i - 1].y = yini;
	salas[i - 1].xi = xi;
	salas[i - 1].yi = yi;
	salas[i - 1].nome = "Sala" + (i - 1);
	salas[i - 1].gSala = new Group();

	salas[i - 1].portas = structuredClone(criaPortas());

	for (xx = 0; xx <= lSala; xx++) {
		for (yy = 0; yy <= aSala; yy++) {
			getItemTipo(tipos.CHAO, subtipos.VAZIO);
			_mirrorx = false;
			_mirrory = false;

			if (yy == 0) {
				//CIMA
				if (xx != floor(lSala / 2)) {
					getItemTipo(tipos.PAREDE, subtipos.CIMA);
				} else {
					if (
						temPorta(salas[i - 1].portas, lados.CIMA) ||
						origem == lados.BAIXO
					) {
						getItemTipo(tipos.PAREDE, subtipos.PORTA);
					} else {
						getItemTipo(tipos.PAREDE, subtipos.CIMA);
					}
				}
			}
			if (yy == aSala) {
				if (xx != floor(lSala / 2)) {
					getItemTipo(tipos.PAREDE, subtipos.CIMA);
					_mirrory = true;
				} else {
					if (
						temPorta(salas[i - 1].portas, lados.BAIXO) ||
						origem == lados.CIMA
					) {
						getItemTipo(tipos.PAREDE, subtipos.PORTA);
					} else {
						getItemTipo(tipos.PAREDE, subtipos.CIMA);
					}
					_mirrory = true;
				}
			}
			if (yy == 1 && xx > 0 && xx < lSala) {
				if (xx == 1 || xx == lSala - 1) {
					getItemTipo(tipos.DECORACAO, subtipos.VAZIO);
					//_mirrory = true
					criaEntidade(-1, -1, 1.25, xi + xx, yi + yy, _mirrorx, _mirrory);
				}
				if (xx != floor(lSala / 2)) {
					getItemTipo(tipos.CHAO, subtipos.SOMBRACIMA);
				}
			}
			if (yy == aSala - 1 && xx > 0 && xx < lSala) {
				if (xx == 1 || xx == lSala - 1) {
					getItemTipo(tipos.DECORACAO, subtipos.VAZIO);
					_mirrory = true;
					criaEntidade(-1, -1, 1.25, xi + xx, yi + yy, _mirrorx, _mirrory);
				}

				if (xx != floor(lSala / 2)) {
					_mirrory = true;
					_mirrorx = true;
					getItemTipo(tipos.CHAO, subtipos.SOMBRACIMA);
				}
			}
			if (xx == 0 && yy > 0 && yy < aSala) {
				//PAREDE ESQUERDA

				if (yy != floor(aSala / 2)) {
					getItemTipo(tipos.PAREDE, subtipos.ESQUERDA);
				} else {
					//p(origem == lados.DIREITA)
					//p(temPorta(salas[i - 1].portas, lados.DIREITA))

					if (
						origem == lados.DIREITA ||
						temPorta(salas[i - 1].portas, lados.ESQUERDA)
					) {
						//	p(i - 1 + " tem que ter porta na parede esquerda");
						//porta vai aqui
					} else {
						getItemTipo(tipos.PAREDE, subtipos.ESQUERDA);
					}
				}
			}
			if (xx == 0 && yy == 0) {
				getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA);
			}
			if (xx == lSala && yy > 0 && yy < aSala) {
				if (yy != floor(aSala / 2)) {
					getItemTipo(tipos.PAREDE, subtipos.ESQUERDA); //PAREDE DA DIREITA
					_mirrorx = true;
				} else {
					// p (origem == lados.ESQUERDA || temPorta(salas[i - 1].portas, lados.DIREITA))
					//SE ESSA SALA TIVER ORIGEM A PARTIR DA ESQUERDA ELA PRECISA
					if (
						origem == lados.ESQUERDA ||
						temPorta(salas[i - 1].portas, lados.DIREITA)
					) {
						//	p("tem que ter porta na parede direita");
						//porta vai aqui
					} else {
						getItemTipo(tipos.PAREDE, subtipos.ESQUERDA);
						_mirrorx = true;
					}
				}
			}
			if (xx == lSala && yy == 0) {
				getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA);
				_mirrorx = true;
			}

			if (xx == lSala && yy == aSala) {
				getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA);
				_mirrorx = true;
				_mirrory = true;
			}
			if (xx == 0 && yy == aSala) {
				getItemTipo(tipos.PAREDE, subtipos.CANTOCIMAESQUERDA);

				_mirrory = true;
			}

			// criaEntidade(xini+ (xx * tamanhoCelula),yini + (yy * tamanhoCelula),1.25,-1,-1,_mirrorx, _mirrory )

			criaEntidade(-1, -1, 1.25, xi + xx, yi + yy, _mirrorx, _mirrory);
			salas[i - 1].gSala.push(selecao.spr); // banco de salas, usar depois na geração usando game of lifeish
		}
	}
	// mudaSala(i -1 )
	// console.table (salas )
	criaPortas();
}

function mudaSala(i) {
	for (spr of salas[i].gSala) {
		spr.visible = false;
	}
}

function criaItem(nome, tipo, tipoitem, min, max, img, historia = "") {
	let i = itens.push(structuredClone(item));
	itens[i - 1].tipoitem = tipoitem;
	itens[i - 1].min = min;
	itens[i - 1].max = max;
	itens[i - 1].tipo = tipo;
	itens[i - 1].nome = nome;
	itens[i - 1].img = img;
	itens[i - 1].historia = historia;

	if (tipo === tipos.ITEM) {
		paleta.push({
			img: img,
			tipo: tipo,
			item: itens[i - 1],
		});
	}
}

/**
 * estava olhando a lista de inimigos, que serão um array 1D
 * com varias celulas dentro , com o tipo INIMIGO
 *
 */
let sangues = [];
var imgfog 
function preload() {
	/**
	 * inicializa as imagens
	 * chao como tem variacoes usa uma array
	 * o mesmo sera feito com paredes etc... o que muda é o tipo
	 */

	gSangues = new Group();

	gSombras = new Group();

	const dir = "Arte/Sprites/Misc/Sangues";
	imgfog = loadImage("Arte/fog.png") 
	longa = loadImage("Arte/Sprites/Item/Longa2.png");
	pocaovida = loadImage("Arte/Sprites/Item/PocaoVida.png");
	escudo = loadImage("Arte/Sprites/Item/EscudoSimples.png");

	imgFumaca = loadImage("Arte/Sprites/fumacinha.png");
	imgOverlay = loadImage("Arte/UI/spotlight.png");
	imgchao = loadImage("Arte/Paredes/15.png");
	chaos.push(imgchao);
	imgchao = loadImage("Arte/Paredes/16.png");
	chaos.push(imgchao);
	imgchao = loadImage("Arte/Paredes/17.png");
	chaos.push(imgchao);

	imgCSE = loadImage("Arte/Paredes/00.png"); // alterar pra usar um so mirror h e w
	imgCC = loadImage("Arte/Paredes/08.png");
	imgCSE2 = loadImage("Arte/Paredes/07.png");
	imgE = loadImage("Arte/Paredes/14.png");
	imgC = loadImage("Arte/Paredes/02.png");

	player = loadImage("Arte/Sprites/Player/meninagato/MGFULL.png");
	goblin = loadImage("Arte/Sprites/Goblin/0 2.png");

	spikeson = loadImage("Arte/traps/spikeson.png");
	spikesoff = loadImage("Arte/traps/spikesoff.png");
	bauoff = loadImage("Arte/traps/bauoff.png");

	ataque = loadImage("Arte/Sprites/Player/meninagatoattack.png");

	Jogador.tipo = tipos.PLAYER;

	gParticulas = new Group();
	/**
	 * inicializa a variavel paleta com 2 variaveis, imagem e tipo
	 * ####>>>>>>>> implementar escala personalizada<<<<<<######
	 */

	paleta.push({
		img: goblin,
		tipo: tipos.INIMIGO,
		subtipo: subtipos.VAZIO,
		escala: -1,
	});
	paleta.push({
		img: player,
		tipo: tipos.PLAYER,
		subtipo: subtipos.VAZIO,
		escala: -1,
	});
	paleta.push({
		img: chaos[0],
		tipo: tipos.CHAO,
		subtipo: subtipos.VAZIO,
		escala: -1,
	});
	paleta.push({
		img: chaos[1],
		tipo: tipos.CHAO,
		subtipo: subtipos.VAZIO,
		escala: -1,
	});
	paleta.push({
		img: chaos[2],
		tipo: tipos.CHAO,
		subtipo: subtipos.VAZIO,
		escala: -1,
	});
	paleta.push({
		img: imgCSE,
		tipo: tipos.PAREDE,
		subtipo: subtipos.CANTOCIMAESQUERDA,
		escala: -1,
	});
	paleta.push({
		img: imgCC,
		tipo: tipos.CHAO,
		subtipo: subtipos.SOMBRACIMA,
		escala: -1,
	});
	paleta.push({
		img: imgCSE2,
		tipo: tipos.PAREDE,
		subtipo: subtipos.CANTOCIMAESQUERDA,
		escala: -1,
	});
	paleta.push({
		img: imgE,
		tipo: tipos.PAREDE,
		subtipo: subtipos.ESQUERDA,
		escala: -1,
	});
	paleta.push({
		img: imgC,
		tipo: tipos.PAREDE,
		subtipo: subtipos.CIMA,
		escala: -1,
	});
	paleta.push({
		img: loadImage("Arte/Paredes/porta.png"),
		tipo: tipos.PAREDE,
		subtipo: subtipos.PORTA,
		escala: -1,
	});
	paleta.push({
		img: loadImage("Arte/Sprites/Misc/luz.png"),
		tipo: tipos.DECORACAO,
		subtipo: subtipos.VAZIO,
		escala: -1,
	});

	criaItem(
		"Espada Longa do Poder",
		tipos.ITEM,
		tipoitem.ESPADALONGA,
		1,
		2,
		longa,
		"Criada pelo beyonder"
	);
	criaItem(
		"Escudo simples",
		tipos.ITEM,
		tipoitem.ESCUDODEMADEIRA,
		1,
		2,
		escudo,
		"Escudo Simples"
	);
	criaItem(
		"Pocao de vida",
		tipos.ITEM,
		tipoitem.POCAOVIDA,
		1,
		2,
		pocaovida,
		"Pocao de vida"
	);

	for (a = 0; a < numDeco; a++) {
		let imgDeco = loadImage("Arte/Sprites/Misc/top_" + a + ".png");

		paleta.push({
			img: imgDeco,
			tipo: tipos.DECORACAO,
			subtipo: subtipos.VAZIO,
			escala: -1,
		});
	}

	for (a = 0; a < 8; a++) {
		let sangue = loadImage(dir + "/" + a + ".png");
		sangues.push(sangue);
		//sangues.push(dir + a )
		paleta.push({
			img: sangue,
			tipo: tipos.DECORACAO,
			subtipo: subtipos.SANGUE,
			escala: 0.5,
		});
	}

	paleta.push({
		img: spikeson,
		tipo: tipos.TRAP,
		subtipo: subtipos.SPIKESON,
	});
	paleta.push({
		img: spikesoff,
		tipo: tipos.TRAP,
		subtipo: subtipos.SPIKESOFF,
	});
	paleta.push({
		img: bauoff,
		tipo: tipos.TESOURO,
		subtipo: subtipos.BAUOFF,
	});
	/***
	 *
	 * #############UNIFICAR O TABULEIRO NUMA ARRAY APENAS
	 * resolver que algumas coisas tem q estar em cima tipo porta
	 *
	 */
	fill2DimensionsArray(tabuleiro, tamanhoTabuleiro, tamanhoTabuleiro); // inicializa a array que é o chao
	//fill2DimensionsArray(tabuleirox, tamanhoTabuleiro, tamanhoTabuleiro)

	fill2DimensionsArray(paredes, tamanhoTabuleiro, tamanhoTabuleiro); // inicializa tabuleiro das paredes
}

function pt(texto) {
	console.table(texto);
}
function p(texto) {
	console.log(texto);
}

/**
 * pega da paleta uma entidade do tipo e subtipo escolhido
 */
function getItemTipo(_tipo, _subtipo) {
	let n = 1;
	if (_tipo === tipos.DECORACAO) {
		let bdecos = [];
		for (_item of paleta) {
			if (_item.tipo == tipos.DECORACAO) {
				bdecos.push(_item);
			}
			n++;
		}
		let rnd = floor(random(0, bdecos.length - 1));

		//selecao.ipaleta = n
		selecao.img = bdecos[rnd].img;
		selecao.tipo = bdecos[rnd].tipo;

		return 2;
	}

	for (_item of paleta) {
		if (_item.tipo == _tipo && _item.subtipo == _subtipo) {
			selecao.ipaleta = n;
			selecao.img = _item.img;
			selecao.tipo = _item.tipo;
			selecao.subtipo = _subtipo;
			return 1;
		}
		n++;
	}

	return 0;
}

function setup() {
	gspr = new Group();
	createCanvas(window.innerWidth, 800, "pixelated");
	sprFog = new Sprite(imgfog,0,0)
	sprFog.img.scale = 3
	sprFog.overlap(allSprites)
	//noSmooth(); // importante sempre usar
	gSangues.overlap(allSprites)
	gParticulas.overlap(allSprites)
	gSombras.overlap(allSprites)
	rectMode(RADIUS);
	strokeWeight(2);
}

function morre() {
	if (!morreu) return 0;
	camera.off();
	push();
	fill(10, 10, 10, 150);
	rect(0, height / 2, width, height);

	fill(10, 10, 10, 200);
	rect(0, height / 2, width, 100);

	fill(255, 0, 0, 200);
	textAlign(CENTER);
	textFont(fontegoteca);
	textSize(100);
	text("Mors Immatura", width / 2, height / 2 + 20);
	pop();
	camera.on();
}

function doTextoFlutuante() {
	if (!textosFlutuantes.length) return 0;
	//
	n = 0;

	for (texto of textosFlutuantes) {
		if (texto.y < texto.yInicial - 20) {
			textosFlutuantes.splice(n, 1);
		}
		push();
		fill(255, 0, 0);
		textFont(fonte);
		stroke(1);
		text(texto.texto, texto.x, texto.y);

		pop();

		texto.y--;
		n++;
	}
}

var blink = false
var tmr = 0 

fade = true
var tmr2 = 0

function draw() {
	var flutuacao = 0.008 * sin(frame * 4) + 1;
	clear();

	camera.on();
	camera.zoom = zoomatual;




	if (inicializa) {
		geraGrade();
		tamanhosalainicial = 6;

		criaSala(
			(tamanhoTabuleiro / 2) * tamanhoCelula,
			(tamanhoTabuleiro / 2) * tamanhoCelula,
			tamanhosalainicial,
			tamanhosalainicial
		);
		// o 2 o tamanho da sala/2
		camera.x = (tamanhoTabuleiro / 2) * tamanhoCelula + 2 * tamanhoCelula;
		camera.y = (tamanhoTabuleiro / 2) * tamanhoCelula + 2 * tamanhoCelula;

		criaEntidadeSala(salas[0], tipos.PLAYER, subtipos.VAZIO);

		criaEntidadeSala(salas[0], tipos.INIMIGO, subtipos.VAZIO);

		criaEntidadeSala(salas[0], tipos.INIMIGO, subtipos.VAZIO);

		criaEntidadeSala(salas[0], tipos.INIMIGO, subtipos.VAZIO);

		for (porta of salas[0].portas) {
			if (porta == lados.CIMA)
				criaEntidadeSala(criaSalaCima(salas[0]), tipos.INIMIGO, subtipos.VAZIO);

			if (porta == lados.BAIXO)
				criaEntidadeSala(
					criaSalaBaixo(salas[0]),
					tipos.INIMIGO,
					subtipos.VAZIO
				);

			if (porta == lados.ESQUERDA)
				criaEntidadeSala(
					criaSalaEsquerda(salas[0]),
					tipos.INIMIGO,
					subtipos.VAZIO
				);
			if (porta == lados.DIREITA)
				criaEntidadeSala(
					criaSalaDireita(salas[0]),
					tipos.INIMIGO,
					subtipos.VAZIO
				);
		}
		criaEntidadeSala(salas[0], tipos.TRAP, subtipos.SPIKESOFF);
		criaEntidadeSala(salas[0], tipos.TESOURO, subtipos.BAUOFF);

		iniUi();
		
	}
	allSprites.draw();

	for (xx = 0; xx < tamanhoTabuleiro; xx++) {
		for (chao of tabuleiro[xx]) {
			chao.draw();
		}
	}
	
	for (trap of traps) {
		trap.spr.draw();
	}
	push()
	tint (255,255,255,10)
	gSombras.draw()
	pop()

	push();
	tint(255, 255, 255, 225);
	gSangues.draw();

	pop();
	
	for (_tesouro of tesouros) {
		_tesouro.spr.draw();
	}
	if (Jogador.spr) {
		push();

		tint(0, 0, 0, 210);
		Jogador.sprSombra.img.scale.y = flutuacao + 0.05;
		Jogador.sprSombra.draw();

		pop();

		Jogador.spr.img.scale.y = flutuacao + 0.05;
		/**
		 * funciona assim, eu quero a variação de 0.1 no numero 1 o 2 é a velocidade
		 *
		 */
		Jogador.spr.draw();
	}
	if (!inicializa) {
		for (inimigo of inimigos) {
			if (
				(Jogador.spr.mirror.x == true && inimigo.xi >= Jogador.xi) ||
				(Jogador.spr.mirror.x == false && inimigo.xi <= Jogador.xi)
			) {
				push();
				tint(0, 0, 0, 210);
				inimigo.sprSombra.img.scale.y = flutuacao + 0.02;
				inimigo.sprSombra.draw();
				pop();

				inimigo.spr.img.scale.y = inimigo.variacao + flutuacao + 0.02;

				if (inimigo.engaged) {
					push();
					tint(255 - flutuacao, 100, 100, 252);
					inimigo.spr.draw();
					pop();
				} else {
					inimigo.spr.draw();
				}
			}
		}

		for (xx = 0; xx < tamanhoTabuleiro; xx++) {
			for (yy = 0; yy < tamanhoTabuleiro; yy++) {
				if (paredes[xx][yy].spr) {
					paredes[xx][yy].spr.draw();
				}
			}
		}
		for (decoracao of decoracaoCima) {
			decoracao.spr.draw();
		}
	}

	/**
	 * colocar essa parte de particula num drawParticulas
	 *
	 */
	for (part of gParticulas) {
		push();

		tint(255, 255, 255, 100 * part.life);

		if (part) part.draw();

		pop();
	}

	if (Jogador.spr.mirror.x == true) {
		camera.off();

		fill(0, 0, 0, 30);
		rect(0, 0, width / 2 - 64, height);
		noStroke();

		camera.on();
	} else {
		camera.off();

		fill(0, 0, 0, 30);
		rectMode(CORNER);
		rect(width / 2 + tamanhoCelula * 3, 0, width / 2, height);
		noStroke();

		camera.on();
	}
	doTextoFlutuante();
	doDialogo();
	drawSpotlight();
	drawVida();
	drawUI();
	morre();


	camera.off(); // desliga acamera para fazer a ui
	if (fade)
	{
		if (tmr > 10)
		{
			fade = false
			tmr = 0
		}
		
		fill(0)
		rect (0,0,width,height)
		tmr ++
	}
	if (blink)
	{
		if (tmr2 > 1) 
		{
			blink = false
			tmr3 = 0
		}
		fill(150,160)
		rect (0,0,width,height)
		tmr2 ++
	}
	push()
	camera.off()
	tint(222,222,255,35)
	blendMode(DODGE)
	//imgfog.resize(imgfog.width imgfog.height + flutuacao*100)
	//image(imgfog,0,0,width,height)

		sprFog.x += cos (frame)
		sprFog.img.scale -= cos (frame) /500
		sprFog.draw()
	camera.on()
	pop()

	if (mostraPaleta) {
		drawPaleta();
	}

	//fill(20, 22, 26);
}

function doBlink ()
{
	tmr2 = 0
	blink = true
}

function doFade ()
{
	tmr = 0
	fade = true
}

/**
 * SELECIONA O ITEM
 */
function selecionaItem(_entidade) {
	selecao.spr = _entidade.spr;
	selecao.ipaleta = _entidade.ipaleta;
	selecao.tipo = _entidade.tipo;
	selecao.entidade = _entidade;

	console.log("selecionado : " + _entidade.nome);
}

/***
 * DIZ O QUE TEM NUM TILE POR COORDENADA DE TELA OU DE XIYI
 *
 */
function getItemMapa(xx = -1, yy = -1, xi = -1, yi = -1) {
	if (xx === -1) {
		xx = xi * tamanhoCelula;
		yy = yi * tamanhoCelula;
		// console.log("entrou aqui")
	}
	if (xi === -1) {
		xi = floor(xx / tamanhoCelula); // indicex
		yi = floor(yy / tamanhoCelula); // indice y
	}

	xx = xi * tamanhoCelula;
	yy = yi * tamanhoCelula;

	//	console.log(xi + "x" + yi);
	//console.log("🚀 ~ file: testes.js:1020 ~ getItemMapa ~ traps", traps)
	for (_trap of traps) {
		if (_trap.xi == xi && _trap.yi == yi) {
			console.log("tem uma trap aqui");

			getItemTipo(tipos.TRAP, subtipos.SPIKESON);
			criaEntidade(_trap.spr.x, _trap.spr.y);
			removeEntidade(_trap);
			return selecao.entidade;
		}
	}
	if (paredes[xi][yi].tipo == tipos.PAREDE) {
		console.log("tem uma parede aqui");
		console.log(paredes[xi][yi].nome);
		return paredes[xi][yi];
	}

	if (Jogador.xi === xi && Jogador.yi === yi) {
		console.log("a menina gato ta qui");
		return Jogador;
	}
	if (tabuleiro[xi][yi].tipo == tipos.CHAO) {
		console.log("tem um chao aqui");

		return tabuleiro[xi][yi];
	}
	for (_inimigo of inimigos) {
		if (_inimigo.xi === xi && _inimigo.yi === yi) {
			console.log(
				"esse inimigo esta a distancia de " + distancia(_inimigo, Jogador)
			);
			andaDirecao(_inimigo, Jogador);

			//console.log("tem um inimigo aqui")
			console.log(_inimigo.nome);
			return _inimigo;
		}
	}

	for (_item of itensnomapa) {
		if (_item.xi === xi && _item.yi === yi) {
			console.log("tem um item aqui");
			console.log(_item.nome);
			return _item;
		}
	}

	return -1;
}

function doDialogo() {
	if (dialogOn) {
		camera.off();

		fill(0, 0, 0, 150);

		rect(width / 2, height / 2, 400, 200);
		rect(width / 2 - 10, height / 2 - 10, 400, 200);
		noStroke();
		//scale (-1)
		image(player, width / 2 + 230, 200 + 200, 200, 200); //aquis
		stroke(20);
		line(width / 2 - 390, height / 2, width / 2 + 390, height / 2);
		noStroke();
		image(goblin, width / 2 - 380, 200, 200, 200);
		textAlign(LEFT);
		textSize(20);
		fill(160);
		text(
			"Menina Gato, prepare-se para cuspir \nsua ultima bola de pêlos !",
			width / 2 - 150,
			300
		);
		text("Você ja esta morto, apenas não sabe! ", width / 2 - 200, 500);

		text("...", width / 2, 580);

		camera.on();
	}
}

/**
 * informa a direção que a entidade2 esta em relação a entidade 1
 * @param {*} entidade1
 * @param {*} entidade2
 * @returns lado
 */

function direcao(entidade1, entidade2) {
	if (entidade1.xi > entidade2.xi) return lados.ESQUERDA;
	if (entidade1.xi < entidade2.xi) return lados.DIREITA;
	if (entidade1.yi < entidade2.yi) return lados.BAIXO;
	if (entidade1.yi > entidade2.yi) return lados.CIMA;
}

function andaDirecao(entidade1, entidade2) {
	let ladornd = 0;
	let rnd = random(0, 2);
	if (rnd > 1) {
		ladornd = 1;
	}
	if (rnd < 1) {
		ladornd = -1;
	}

	if (distancia(entidade1, entidade2) > 1) {
		switch (direcao(entidade1, entidade2)) {
			case lados.CIMA:
				if (!moveEntidade(entidade1, 0, -1)) {
					if (entidade1.ladoanterior == horizontal) {
						entidade1.ladoanterior = vertical;
						//tenta o outro lado

						if (!moveEntidade(entidade1, ladornd, 0)) {
							return 0;
						}
					} else {
						entidade1.ladoanterior = horizontal;

						if (!moveEntidade(entidade1, 0, ladornd)) {
							return 0;
						}
					}
				}

				break;
			case lados.BAIXO:
				if (!moveEntidade(entidade1, 0, 1)) {
					if (entidade1.ladoanterior == horizontal) {
						entidade1.ladoanterior = vertical;
						if (!moveEntidade(entidade1, ladornd, 0)) {
							return 0;
						}
					} else {
						entidade1.ladoanterior = horizontal;

						if (!moveEntidade(entidade1, 0, ladornd)) {
							return 0;
						}
					}
				}

				break;
			case lados.ESQUERDA:
				if (!moveEntidade(entidade1, 1, 0)) {
					if (entidade1.ladoanterior == horizontal) {
						entidade1.ladoanterior = vertical;
						if (!moveEntidade(entidade1, 0, ladornd)) {
							return 0;
						}
					} else {
						entidade1.ladoanterior = horizontal;
						if (!moveEntidade(entidade1, ladornd, 0)) {
							return 0;
						}
					}
				}

				break;
			case lados.DIREITA:
				if (!moveEntidade(entidade1, -1, 0)) {
					if (entidade1.ladoanterior == horizontal) {
						entidade1.ladoanterior = vertical;
						if (!moveEntidade(entidade1, 0, ladornd)) {
							return 0;
						}
					} else {
						entidade1.ladoanterior = horizontal;
						if (!moveEntidade(entidade1, ladornd, 0)) {
							return 0;
						}
					}
				}

				break;
		}
	} else {
		p(entidade1.nome + " esta colado em " + entidade2.nome);
		sisParticulas(Jogador.x, Jogador.y);
		vidaoverlay.y += 10;
		if (vidaoverlay.y >= 710) morreu = true;
		criaTextoFlutuante("-20", Jogador.x, Jogador.y);

		doSangue(Jogador.x, Jogador.y);
		doBlink()
		return 0;
	}

	return 1;
}

function doMovimento(_entidade, xi, yi, _velocidade = 200) {
	if (xi) {
		p5.tween.manager
			.addTween(_entidade.spr, "movimento")
			.addMotion(
				"x",
				_entidade.spr.x + xi * tamanhoCelula,
				_velocidade,
				"easeInOutSin"
			)
			.startTween();
		p5.tween.manager
			.addTween(_entidade.sprSombra, "movimento")
			.addMotion(
				"x",
				_entidade.spr.x + xi * tamanhoCelula,
				_velocidade,
				"easeInOutSin"
			)
			.startTween();
		if (_entidade.tipo == tipos.PLAYER) {
			p5.tween.manager
				.addTween(camera, "movimento")
				.addMotion(
					"x",
					camera.x + xi * tamanhoCelula,
					_velocidade,
					"easeInOutSin"
				)
				.startTween();
		}
	}
	if (yi) {
		p5.tween.manager
			.addTween(_entidade.spr, "movimento")
			.addMotion(
				"y",
				_entidade.spr.y + yi * tamanhoCelula,
				_velocidade,
				"easeInOutSin"
			)
			.startTween();
		p5.tween.manager
			.addTween(_entidade.sprSombra, "movimento")
			.addMotion(
				"y",
				_entidade.sprSombra.y + yi * tamanhoCelula,
				_velocidade,
				"easeInOutSin"
			)
			.startTween();
		if (_entidade.tipo == tipos.PLAYER) {
			p5.tween.manager
				.addTween(camera, "movimento")
				.addMotion(
					"y",
					camera.y + yi * tamanhoCelula,
					_velocidade,
					"easeInOutSin"
				)
				.startTween();
		}
	}
}

function criaTextoFlutuante(texto, x, y) {
	var rndx = random(0, 20);
	var rndy = random(0, 20);

	textosFlutuantes.push({
		texto: texto,
		x: x - rndx,
		y: y - rndy,
		yInicial: y - rndy,
	});
}


const vertical = 0;
const horizontal = 1;
/**
 *
 * @param {*} _entidade
 * @param {*} _x quantidade de casas na horizontal
 * @param {*} _y quantidade de casas na vertical
 * @returns 1 se foi bem sucedido
 */
function moveEntidade(_entidade, _x = 0, _y = 0) {
	if (_y > 0) {
		for (inimigo of inimigos) {
			if (inimigo.xi == _entidade.xi && inimigo.yi == _entidade.yi + 1) {
				
				sisParticulas(inimigo.x, inimigo.y);
				criaTextoFlutuante("-10", inimigo.x, inimigo.y);
				inimigo.tipo = tipos.INIMIGO;
				doSangue(inimigo.x,inimigo.y)
				removeEntidade(inimigo);

				console.log("colidiu como um inimigo");
				return 0;
			}
		}

		for (_trap of traps) {
			if (_trap.xi == _entidade.xi && _trap.yi == _entidade.yi + 1) {
				if (_trap.subtipo != subtipos.SPIKESON) {
					getItemTipo(tipos.TRAP, subtipos.SPIKESON);
					criaEntidade(_trap.spr.x, _trap.spr.y);
					removeEntidade(_trap);
					console.log("colidiu com uma trap fechada");
					return 0;
				} else {
					sisParticulas(Jogador.x, Jogador.y + tamanhoCelula);
					doSangue(_trap.x,_trap.y)
					console.log("colidiu com uma trap aberta");
					//return 0
				}
			}
		}

		if (Jogador.xi == _entidade.xi && Jogador.yi == _entidade.yi + 1) {
			console.log("colidiu com o jogador");

			return 0;
		}
		if (paredes[_entidade.xi][_entidade.yi + 1].tipo == tipos.PAREDE) {
			console.log("colidiu com uma parede");
			return 0;
		}
		doMovimento(_entidade, 0, 1, 100);
		_entidade.y += tamanhoCelula;
		_entidade.yi += 1;
		_entidade.spr.y += tamanhoCelula;
		_entidade.sprSombra.y += tamanhoCelula;
		_entidade.ladoanterior = vertical;
		return 1;
	}
	if (_y < 0) {
		for (_trap of traps) {
			if (_trap.xi == _entidade.xi && _trap.yi == _entidade.yi - 1) {
				if (_trap.subtipo != subtipos.SPIKESON) {
					getItemTipo(tipos.TRAP, subtipos.SPIKESON);
					criaEntidade(_trap.spr.x, _trap.spr.y);
					removeEntidade(_trap);
					console.log("colidiu com uma trap fechada");
					return 0;
				} else {
					//	sisParticulas(Jogador.x, Jogador.y - tamanhoCelula);
					console.log("colidiu com uma trap aberta");
					doSangue(_trap.x,_trap.y)
					//return 0
				}
			}
		}

		for (inimigo of inimigos) {
			if (inimigo.xi == _entidade.xi && inimigo.yi == _entidade.yi - 1) {
				sisParticulas(inimigo.x, inimigo.y);
				criaTextoFlutuante("-10", inimigo.x, inimigo.y);
				doSangue(inimigo.x,inimigo.y)
				removeEntidade(inimigo);

				console.log("colidiu como um inimigo");
				return 0;
			}
		}
		if (Jogador.xi == _entidade.xi && Jogador.yi == _entidade.yi - 1) {
			console.log("colidiu com o jogador");
			return 0;
		}
		if (paredes[_entidade.xi][_entidade.yi - 1].tipo == tipos.PAREDE) {
			console.log("colidiu com uma parede");
			return 0;
		}
		doMovimento(_entidade, 0, -1, 100);
		_entidade.y -= tamanhoCelula;
		_entidade.yi -= 1;
		_entidade.spr.y -= tamanhoCelula;
		_entidade.sprSombra.y -= tamanhoCelula;
		_entidade.ladoanterior = vertical;
		return 1;
	}

	if (_x < 0) {
		for (_trap of traps) {
			if (_trap.xi == _entidade.xi + 1 && _trap.yi == _entidade.yi) {
				if (_trap.subtipo != subtipos.SPIKESON) {
					getItemTipo(tipos.TRAP, subtipos.SPIKESON);
					criaEntidade(_trap.spr.x, _trap.spr.y);
					removeEntidade(_trap);
					selecao.entidade.subtipo = subtipos.SPIKESON;
			
					return 0;
				} else {
					sisParticulas(Jogador.x + tamanhoCelula, Jogador.y);
					doSangue(_trap.x,_trap.y)
					console.log("colidiu com uma trap aberta");
					//return 0
				}
			}
		}
		for (inimigo of inimigos) {
			if (inimigo.xi == _entidade.xi + 1 && inimigo.yi == _entidade.yi) {
				sisParticulas(inimigo.x, inimigo.y);
				criaTextoFlutuante("-10", inimigo.x, inimigo.y);
				doSangue(inimigo.x,inimigo.y)
				removeEntidade(inimigo);
				console.log("colidiu como um inimigo");
				return 0;
			}
		}
		if (Jogador.xi == _entidade.xi + 1 && Jogador.yi == _entidade.yi) {
			console.log("colidiu com o jogador");
			return 0;
		}
		if (paredes[_entidade.xi + 1][_entidade.yi].tipo == tipos.PAREDE) {
			console.log("colidiu com uma parede");
			return 0;
		}
		doMovimento(_entidade, 1, 0, 100);
		_entidade.x += tamanhoCelula;
		_entidade.xi += 1;
		_entidade.spr.x += tamanhoCelula;
		_entidade.spr.mirror.x = false;
		_entidade.sprSombra.mirror.x = false;
		_entidade.sprSombra.x += tamanhoCelula;
		_entidade.ladoanterior = horizontal;
		return 1;
	}
	if (_x > 0) {
		for (_trap of traps) {
			if (_trap.xi == _entidade.xi - 1 && _trap.yi == _entidade.yi) {
				if (_trap.subtipo != subtipos.SPIKESON) {
					getItemTipo(tipos.TRAP, subtipos.SPIKESON);
					criaEntidade(_trap.spr.x, _trap.spr.y);
					doSangue(_trap.x,_trap.y)
					removeEntidade(_trap);
					console.log("colidiu com uma trap fechada");
					return 0;
				} else {
					sisParticulas(Jogador.x - tamanhoCelula, Jogador.y);

					console.log("colidiu com uma trap aberta");
					//return 0
				}
			}
		}

		for (inimigo of inimigos) {
			if (inimigo.xi == _entidade.xi - 1 && inimigo.yi == _entidade.yi) {
				sisParticulas(inimigo.x, inimigo.y);
				doSangue(inimigo.x,inimigo.y)
				criaTextoFlutuante("-10", inimigo.x, inimigo.y);
				removeEntidade(inimigo);
				
				console.log("colidiu como um inimigo");
				return 0;
			}
		}
		if (Jogador.xi == _entidade.xi - 1 && Jogador.yi == _entidade.yi) {
			console.log("colidiu com o jogador");
			return 0;
		}
		if (paredes[_entidade.xi - 1][_entidade.yi].tipo == tipos.PAREDE) {
			console.log("colidiu com uma parede");
			return 0;
		}
		doMovimento(_entidade, -1, 0, 100);
		_entidade.x -= tamanhoCelula;
		_entidade.xi -= 1;
		_entidade.spr.x -= tamanhoCelula;
		_entidade.spr.mirror.x = true;
		_entidade.sprSombra.mirror.x = true;

		_entidade.sprSombra.x -= tamanhoCelula;
		_entidade.ladoanterior = horizontal;
		return 1;
	}
}

/**
 * calcula a distancia entre duas entidades
 * @param {*} entidade1
 * @param {*} entidade2
 * @returns INT distancia entre as duas entidades
 */
function distancia(entidade1, entidade2) {
	let _distancia = 0;
	let dx = entidade1.xi - entidade2.xi;
	let dy = entidade1.yi - entidade2.yi;
	//console.log(dx + "x" + dy);
	_distancia = Math.abs(Math.abs(dx) + Math.abs(dy));
	return _distancia;
}

/**
 * CONVERTER ISSO PARA UMA FUNCAO QUE CRIA PAINEIS
 *
 */
function drawPaleta() {
	mapeiaMouse();

	push();
	noStroke();
	fill(0, 20);
	rect(bx + 9, by + 11 + 80, boxSize, boxSize + 180);
	pop();
	strokeCap(ROUND);
	rect(bx, by + 180, boxSize, boxSize + 180);

	/**
	 * MUDAR AQUI PARA APARECER COISAS DIFERENTES DEPENDENDO
	 * DO QUE ESTIVER SELECIONADO !!!!
	 *FOCO AQUI
	 *
	 */

	if (selecao.item) {
		text("nome:", bx - 90, by + 450 - 30);
		text(selecao.item.nome, bx, by + 450 - 30);
		text("", bx + 90, by + 250 - 30);
	} else {
		if (selecao.entidade) {
			text(selecao.entidade.nome, bx - 90, by + 550 - 30);
			text("", bx, by + 550 - 30);
			text("", bx + 90, by + 550 - 30);
		}
	}

	text("espelharh", bx - 90, by + 450);
	text("rodar", bx, by + 450);
	text("espelharv", bx + 90, by + 450);
	noStroke();
	fill(10);
	textSize(17);
	textAlign(CENTER);

	text("Paleta de Tiles", bx, by - 100);

	fill(255, 0, 0, 100);
	plotaPaleta();
}

function removeEntidade(_entidade) {
	//console.log(_entidade.tipo)
	//console.log(tipos.INIMIGO)

	if (_entidade.tipo === tipos.PAREDE) {
		_entidade.tipo = tipos.VAZIO;
		_entidade.spr.remove();
	}

	if (_entidade.tipo == tipos.INIMIGO) {
		console.log("deletou um inimigo");
		_entidade.tipo = tipos.VAZIO;
		_entidade.spr.remove();
		_entidade.sprSombra.remove();
		inimigos.splice(inimigos.indexOf(_entidade), 1);
	}
	if (_entidade.tipo === tipos.ITEM) {
		console.log("deletou um item");
		_entidade.tipo = tipos.VAZIO;
		_entidade.spr.remove();
		itensnomapa.splice(itensnomapa.indexOf(_entidade), 1);
	}

	if (_entidade.tipo === tipos.TRAP) {
		console.log("deletou um item");
		_entidade.tipo = tipos.VAZIO;
		_entidade.subtipo = subtipos.VAZIO;
		_entidade.spr.remove();
		traps.splice(traps.indexOf(_entidade), 1);
	}
}

function iniEntidade() {}

/**
 * cria celula
 * TODO.
 *
 */
function criaEntidade(
	xx,
	yy,
	escala = 1.25,
	xi = -1,
	yi = -1,
	mirrorx = false,
	mirrory = false,
	rotation = -1
) {
	if (xi === -1) {
		xi = floor(xx / tamanhoCelula); // indicex
		yi = floor(yy / tamanhoCelula); // indice y
	}
	if (xx === -1) {
		xx = xi * tamanhoCelula;
		yy = yi * tamanhoCelula;
		// console.log("entrou aqui")
	}
	xx = xi * tamanhoCelula;
	yy = yi * tamanhoCelula;

	// xx = floor(xx / tamanhoCelula)  // localização na tela
	// yy = floor(xx / tamanhoCelula)  // faz so um <<<<<<<<< sao iguais

	// tabuleiro[xi][yi].addImage(selecao.img)
	// console.log (xx+"x"+yy)
	/**
	 * se for do tipo item
	 */
	if (selecao.tipo == tipos.VAZIO) {
		return 0;
	}

	if (selecao.tipo == tipos.TESOURO) {
		if (selecao.subtipo == subtipos.BAUOFF) {
			var ini = tesouros.push(structuredClone(entidade));

			tesouros[ini - 1].x = xx;
			tesouros[ini - 1].y = yy;
			tesouros[ini - 1].xi = xi;
			tesouros[ini - 1].yi = yi;
			tesouros[ini - 1].tipo = selecao.tipo;

			tesouros[ini - 1].subtipo = selecao.subtipo;

			tesouros[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
			tesouros[ini - 1].spr.overlap(allSprites);
			tesouros[ini - 1].spr.addImage(bauoff);
			tesouros[ini - 1].spr.scale = 1.4;
			tesouros[ini - 1].spr.rotation = 90;

			tesouros.entidade = tesouros[ini - 1];
			return 1;
		}
	}

	if (selecao.tipo == tipos.TRAP) {
		if (selecao.subtipo == subtipos.SPIKESOFF) {
			var ini = traps.push(structuredClone(entidade));

			traps[ini - 1].x = xx;
			traps[ini - 1].y = yy;
			traps[ini - 1].xi = xi;
			traps[ini - 1].yi = yi;
			traps[ini - 1].tipo = selecao.tipo;

			traps[ini - 1].subtipo = selecao.subtipo;

			traps[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
			traps[ini - 1].spr.overlap(allSprites);
			traps[ini - 1].spr.addImage(spikesoff);
			selecao.entidade = traps[ini - 1];

			return 1;
		}
		if (selecao.subtipo == subtipos.SPIKESON) {
			var ini = traps.push(structuredClone(entidade));

			traps[ini - 1].x = xx;
			traps[ini - 1].y = yy;
			traps[ini - 1].xi = xi;
			traps[ini - 1].yi = yi;
			traps[ini - 1].tipo = selecao.tipo;
			traps[ini - 1].subtipo = selecao.subtipo;
			traps[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
			traps[ini - 1].spr.overlap(allSprites);
			traps[ini - 1].spr.addImage(spikeson);
			selecao.entidade = traps[ini - 1];

			return 1;
		}

		return 0;
	}
	if (selecao.tipo === tipos.DECORACAO) {
		var ini = decoracaoCima.push(structuredClone(entidade));
		decoracaoCima[ini - 1].x = xx;
		decoracaoCima[ini - 1].y = yy;
		decoracaoCima[ini - 1].xi = xi;
		decoracaoCima[ini - 1].yi = yi;
		decoracaoCima[ini - 1].tipo = tipos.ITEM;
		decoracaoCima[ini - 1].item = selecao.item;
		// esse nome tem q ter em algum lugar
		decoracaoCima[ini - 1].nome = "Decoracao " + ini - 1;

		selecao.entidade = decoracaoCima[ini - 1];

		decoracaoCima[ini - 1].index = ini - 1;

		decoracaoCima[ini - 1].spr = new Sprite(
			xx,
			yy,
			tamanhoCelula,
			tamanhoCelula
		);
		decoracaoCima[ini - 1].spr.scale = 1.5;
		if (mirrorx) {
			decoracaoCima[ini - 1].spr.mirror.x = true;
		}
		if (mirrory) {
			decoracaoCima[ini - 1].spr.mirror.y = true;
			decoracaoCima[ini - 1].spr.y += 55;
		} else {
			decoracaoCima[ini - 1].spr.y -= 55;
		}

		decoracaoCima[ini - 1].spr.addImage(selecao.img);
		decoracaoCima[ini - 1].spr.overlap(allSprites);
		selecao.entidade = decoracaoCima[ini - 1];
		selecao.spr = decoracaoCima[ini - 1].spr;

		return;
	}
	// console.log (selecao.tipo)
	if (selecao.tipo === tipos.ITEM) {
		/**
		 * precisa fazer
		 */
		var ini = itensnomapa.push(structuredClone(entidade));

		itensnomapa[ini - 1].x = xx;
		itensnomapa[ini - 1].y = yy;
		itensnomapa[ini - 1].xi = xi;
		itensnomapa[ini - 1].yi = yi;
		itensnomapa[ini - 1].tipo = tipos.ITEM;
		itensnomapa[ini - 1].item = selecao.item;
		// esse nome tem q ter em algum lugar
		itensnomapa[ini - 1].nome = selecao.item.nome;
		selecao.entidade = itensnomapa[ini - 1];
		itensnomapa[ini - 1].index = ini - 1;
		itensnomapa[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
		itensnomapa[ini - 1].spr.addImage(selecao.img);
		itensnomapa[ini - 1].spr.overlap(allSprites);
		selecao.entidade = itensnomapa[ini - 1];
		selecao.spr = itensnomapa[ini - 1].spr;
		return;
	}

	/**
	 * se for do tipo CHAO
	 */

	if (selecao.tipo == tipos.CHAO) {
		if (paredes[xi][yi].tipo == tipos.PAREDE) {
			paredes[xi][yi].spr.remove();
			paredes[xi][yi].tipo = tipos.VAZIO;
		}
	}

	/**
	 * Se for do tipo INIMIGO
	 */
	if (selecao.tipo === tipos.INIMIGO) {
		yy -= 35
		
		for (inimigo of inimigos) {
			if (inimigo.xi == xi && inimigo.yi == yi) {
				console.log("ja tem outro inimigo");
				// tabuleiro[xi][yi].remove()
				return;
			}
		}
		if (Jogador.xi == xi && Jogador.yi == yi) {
			// tabuleiro[xi][yi].remove()
			// console.log("o jogador esta ai")
			return;
		}
		var ini = inimigos.push(structuredClone(entidade));

		inimigos[ini - 1].x = xx;
		inimigos[ini - 1].y = yy;
		inimigos[ini - 1].xi = xi;
		inimigos[ini - 1].yi = yi;
		// esse nome tem q ter em algum lugar
		inimigos[ini - 1].nome = "Goblinzitus:" + xi + "x" + yi;
		inimigos[ini - 1].tipo = tipos.INIMIGO;
		inimigos[ini - 1].engaged = false;
		inimigos[ini - 1].index = ini - 1;

		inimigos[ini - 1].sprSombra = new Sprite(
			xx - 2,
			yy + 36,
			tamanhoCelula,
			tamanhoCelula
		);
		inimigos[ini - 1].sprSombra.overlap(allSprites);
		inimigos[ini - 1].sprSombra.addImage(selecao.img);
		inimigos[ini - 1].sprSombra.mirror.y = true;
		inimigos[ini - 1].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
		inimigos[ini - 1].spr.addImage(selecao.img);
		inimigos[ini - 1].spr.entidade = inimigos[ini - 1];
		inimigos[ini - 1].spr.overlap(allSprites);
			gSombras.push(inimigos[ini - 1].sprSombra)
		selecao.entidade = inimigos[ini - 1];
		selecao.spr = inimigos[ini - 1].spr;
		return inimigos[ini - 1];
	}
	/**
	 * se for do tipo PLAYER
	 */
	if (selecao.tipo === tipos.PLAYER) {
		xx += 3
		yy -= 15
		if (Jogador.spr != 0) {
			Jogador.spr.remove();
			Jogador.sprSombra.remove();
		}
		Jogador.x = xx;
		Jogador.y = yy;
		Jogador.xi = xi;
		Jogador.yi = yi;
		Jogador.ipaleta = selecao.ipaleta;
		Jogador.tipo = tipos.PLAYER;
		Jogador.subtipo = subtipos.VAZIO;

		Jogador.sprSombra = new Sprite(
			xx - 2,
			yy + 26,
			tamanhoCelula,
			tamanhoCelula
		);
		Jogador.sprSombra.overlap(allSprites);
			gSombras.push(Jogador.sprSombra)
		Jogador.sprSombra.mirror.y = true;

		Jogador.spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
		Jogador.spr.addImage(selecao.img);
		Jogador.spr.overlap(allSprites);

		mirrorx = true;

		selecao.entidade = Jogador;
		selecao.spr = Jogador.spr;
		if (mirrorx) {
			Jogador.spr.mirror.x = true;
			Jogador.sprSombra.mirror.x = true;
			Jogador.mirrorx = true;
		}
		if (mirrory) {
			Jogador.spr.mirror.y = true;
			Jogador.sprSombra.mirror.y = true;
			Jogador.mirrory = true;
		}

		Jogador.sprSombra.addImage(selecao.img);

		Jogador.nome = "Menina Gato";
		return;
	}
	/**
	 * se for do tipo PAREDE
	 */

	if (selecao.tipo == tipos.PAREDE) {
		if (paredes[xi][yi].tipo == tipos.PAREDE) {
			// tabuleiro[xi][yi].remove()
			paredes[xi][yi].spr.remove();
			paredes[xi][yi].tipo = tipos.VAZIO;
			console.log("ja tinha uma parede ai");
			return;
		}
		// console.log (xx+" "+yy)

		/**
		 *
		 * criar o sprite direto na entidade como é feito aqui
		 * apagar esse tabuleiro nada a ver e usar direto
		 */

		paredes[xi][yi].ipaleta = selecao.ipaleta;
		paredes[xi][yi].x = xx;
		paredes[xi][yi].y = yy;
		paredes[xi][yi].xi = xi;
		paredes[xi][yi].yi = yi;
		paredes[xi][yi].tipo = tipos.PAREDE;
		// paredes[xi][yi].scale = 1
		paredes[xi][yi].rotation = 0;

		paredes[xi][yi].nome = "Parede:" + xi + "x" + yi;
		paredes[xi][yi].spr = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);

		if (mirrorx) {
			paredes[xi][yi].spr.mirror.x = true;
			paredes[xi][yi].mirrorx = true;
		}
		if (mirrory) {
			paredes[xi][yi].spr.mirror.y = true;
			paredes[xi][yi].mirrory = true;
		}
		paredes[xi][yi].spr.overlap(allSprites);

		paredes[xi][yi].spr.addImage(selecao.img);
		// paredes[xi][yi].spr.scale = escala
		selecao.entidade = paredes[xi][yi];
		selecao.spr = paredes[xi][yi].spr;
		return;
		// console.log ("criou uma parede")
		// console.table (paredes[xi][yi])
	}
	tabuleiro[xi][yi] = new Sprite(xx, yy, tamanhoCelula, tamanhoCelula);
	// tabuleiro[xi][yi].scale = escala

	if (mirrorx) {
		tabuleiro[xi][yi].mirror.x = true;
	}
	if (mirrory) {
		tabuleiro[xi][yi].mirror.y = true;
	}
	tabuleiro[xi][yi].overlap(allSprites);
	// tabuleiro[xi][yi].tileSize = tamanhoCelula
	// tabuleiro[xi][yi].scale = escala
	if (!inicializa) {
		if (tabuleiro[xi][yi].tipo == selecao.tipo) {
			tabuleiro[xi][yi].remove();
		}
	}

	if (inicializa) {
		rnum = 90 * floor(random(4));
		ri = floor(random(2, 4));
		getItemTipo(tipos.CHAO, subtipos.VAZIO);
		tabuleiro[xi][yi].addImage(selecao.img);
		tabuleiro[xi][yi].rotation = rnum;
		// tabuleirox[xi][yi].ipaleta = ri
		// tabuleirox[xi][yi].rotation = rnum
	} else {
		// arrumar ISSO TA ESCULHAMBADO
		if (selecao.tipo != tipos.parede) {
			tabuleiro[xi][yi].addImage(selecao.img);
		}
		// tabuleiro[xi][yi].debug = true
	}
	// arrumar ESTA ESCULHAMBADO
	if (selecao.tipo != tipos.CHAO) {
		selecao.spr = tabuleiro[xi][yi];
	} else {
		tabuleiro[xi][yi].remove();
	}
}
