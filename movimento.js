function mouseClicked() {

}
function moveDireita(qtd) {
    personagem.x += qtd

    personagem.corpo.cabeca.x += qtd;
    personagem.corpo.tronco.x += qtd;
    personagem.corpo.bracodireito.x += qtd;
    personagem.corpo.bracoesquerdo.x += qtd;

    personagem.corpo.pernas.x += qtd;
    if (personagem.corpo.rabo.mirror.x) {

        personagem.corpo.katana.x += qtd;
        personagem.corpo.rabo.x += qtd;
    } else {
        personagem.corpo.katana.x += qtd - 22;
        personagem.corpo.rabo.mirror.x = true;
        personagem.corpo.katana.mirror.x = true;
        personagem.corpo.rabo.x += qtd - 28;
    }
    personagem.corpo.sombra.x += qtd;
    personagem.corpo.cabeca.mirror.x = true;


}
function moveEsquerda(qtd) {
    personagem.x -= qtd
    personagem.corpo.cabeca.x -= qtd;
    personagem.corpo.tronco.x -= qtd;
    personagem.corpo.bracodireito.x -= qtd;
    personagem.corpo.bracoesquerdo.x -= qtd;

    personagem.corpo.pernas.x -= qtd;
    if (personagem.corpo.rabo.mirror.x) {
        personagem.corpo.katana.x -= qtd - 22;
        personagem.corpo.rabo.mirror.x = false;
        personagem.corpo.katana.mirror.x = false;
        personagem.corpo.rabo.x -= (qtd - 28);
    } else {
        personagem.corpo.rabo.x -= qtd;
        personagem.corpo.katana.x -= qtd;
    }

    personagem.corpo.sombra.x -= qtd;
    personagem.corpo.cabeca.mirror.x = false;

}
function moveCima(qtd) {
    personagem.y -= qtd
    personagem.corpo.cabeca.y -= qtd;
    personagem.corpo.tronco.y -= qtd;
    personagem.corpo.bracodireito.y -= qtd;
    personagem.corpo.bracoesquerdo.y -= qtd;
    personagem.corpo.katana.y -= qtd;
    personagem.corpo.pernas.y -= qtd;
    personagem.corpo.rabo.y -= qtd;
    personagem.corpo.sombra.y -= qtd;
}
function moveBaixo(qtd) {
    personagem.y += qtd
    personagem.corpo.cabeca.y += qtd;
    personagem.corpo.tronco.y += qtd;
    personagem.corpo.bracodireito.y += qtd;
    personagem.corpo.bracoesquerdo.y += qtd;
    personagem.corpo.katana.y += qtd;
    personagem.corpo.pernas.y += qtd;
    personagem.corpo.rabo.y += qtd;
    personagem.corpo.sombra.y += qtd;
}
function keyReleased() {
    switch (keyCode) {
        case RIGHT_ARROW:
            moveDireita(personagem.velocidade);
            break;
        case LEFT_ARROW:
            moveEsquerda(personagem.velocidade);
            break;
        case UP_ARROW:
            moveCima(personagem.velocidade);
            break;
        case DOWN_ARROW:
            moveBaixo(personagem.velocidade);
            break;
    }


}
