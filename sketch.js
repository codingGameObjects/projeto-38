var caminho,imgCaminho;
var jogador1,jogador2,jogador3;
var imgCaminho,img1CiclistaPrincipal,img2CiclistaPrincipal;

var opRosaimg1,opRosaimg2;
var opAmareloimg1,opAmareloimg2;
var opVermelhoimg1,opVermelhoimg2;
var imgFimJogo,sinoBicicleta;

var CGRosa, CGAmarelo,CGVermelho; 

var ENCERRAMENTO =0;
var JOGAR =1;
var estadoJogo = JOGAR;

var distancia=0;
var fimdeJogo, recomecar;

var canvas

var top, bottom;
function preload(){
  imgCaminho = loadImage("images/Road.png");
  img1CiclistaPrincipal = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  img2CiclistaPrincipal= loadAnimation("images/mainPlayer3.png");
  
  opRosaimg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  opRosaimg2 = loadAnimation("images/opponent3.png");
  
  opAmareloimg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  opAmareloimg2 = loadAnimation("images/opponent6.png");
  
  opVermelhoimg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  opVermelhoimg2 = loadAnimation("images/opponent9.png");
  
  sinoBicicleta = loadSound("sound/bell.mp3");
  imgFimJogo = loadImage("images/gameOver.png");
}

function setup(){
  
  canvas = createCanvas(displayWidth, 300);
  // movendo o plano de fundo
  caminho=createSprite(2500,150);
  caminho.addImage(imgCaminho);
  //criando o ciclista correndo de bicicleta
  ciclistaPrincipal  = createSprite(70,150);
  ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
  ciclistaPrincipal.scale=0.07;

  //definir collider para o ciclista
  ciclistaPrincipal.setCollider("rectangle", 0, 0, 1000, 1300);

  //parede
  paredeTeto = createSprite(camera.x + displayWidth/2, -1, displayWidth, 1);
  paredeChão = createSprite(camera.x + displayWidth/2, 301, displayWidth, 1);


  //sprites fim de jogo
  fimdeJogo = createSprite(displayWidth/2, 150);
  fimdeJogo.addImage(imgFimJogo);
  fimdeJogo.scale = 0.8;

  //grupos
  CGRosa = new Group();
  CGAmarelo = new Group();
  CGVermelho = new Group();

}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ Math.round(distancia), camera.x-250 + 150,30);
  ciclistaPrincipal.debug = true;

  //posisionamento de objetos
  fimdeJogo.x = camera.x;
  ciclistaPrincipal.x = camera.x-700;
  paredeChão.x = camera.x;
  paredeTeto.x = camera.x;

  if(estadoJogo===JOGAR){
    
    fimdeJogo.visible = false;
    

    
    distancia = distancia + 0.3;
    if(distancia >= 0 && distancia < 100){
      camera.x += 5;
    } else if(distancia > 100 && distancia < 250){
      camera.x += 8;
    } else if(distancia > 250 && distancia < 600){
      camera.x += 10
    } else if (distancia > 600){
      camera.x += 15;
    }
    
  
    ciclistaPrincipal.y = World.mouseY;
  
    ciclistaPrincipal.collide(paredeChão);
    ciclistaPrincipal.collide(paredeTeto);

    //código para resetar o plano de fundo
    if (camera.x > caminho.x){
      caminho.x = camera.x + 450;
    }
    //código para tocar o som do sino da bicicleta
    if(keyWentDown("space")) {
      sinoBicicleta.play();
    }
  
    //criando oponentes continuos
    var selecionar_jogadorOP = Math.round(random(1,3));
  
    if (World.frameCount % 100 == 0) {
      if (selecionar_jogadorOP == 1) {
        ciclistaRosa();
      } else if (selecionar_jogadorOP == 2) {
        ciclistaAmarelo();
      } else {
        ciclistaVermelho();
      }
    }
  
    if(CGRosa.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador1.addAnimation("opponentPlayer1",opRosaimg2);
    }
    
    if(CGAmarelo.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador2.addAnimation("opponentPlayer2",opAmareloimg2);
    }
    
    if(CGVermelho.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador3.velocityY = 0;
      jogador3.addAnimation("opponentPlayer3",opVermelhoimg2);
    }
    

  }else if (estadoJogo === ENCERRAMENTO) {
    fimdeJogo.visible = true;
    //Adicione o código para mostrar instruções de reinicialização do jogo em texto aqui
    text("aperte a seta direcional para cima (UP) para reiniciar o jogo", camera.x - 260,  200);
  

    ciclistaPrincipal.addAnimation("SahilRunning",img2CiclistaPrincipal);
  
    CGRosa.setLifetimeEach(-1);
  
    CGAmarelo.setLifetimeEach(-1);
  
    CGVermelho.setLifetimeEach(-1);

    //condição de gravação para chamada de reset()
    if (keyWentDown(UP_ARROW)){
      reset();
    }
  }
}

function ciclistaRosa(){
        jogador1 =createSprite(camera.x + displayWidth/2,Math.round(random(50, 250)));
        jogador1.scale =0.06;
        jogador1.addAnimation("opponentPlayer1",opRosaimg1);
        jogador1.setLifetime=170;
        CGRosa.add(jogador1);
}

function ciclistaAmarelo(){
        jogador2 =createSprite(camera.x+displayWidth/2,Math.round(random(50, 250)));
        jogador2.scale =0.06;
        jogador2.addAnimation("opponentPlayer2",opAmareloimg1);
        jogador2.setLifetime=170;
        CGAmarelo.add(jogador2);
}

function ciclistaVermelho(){
        jogador3 =createSprite(camera.x +displayWidth/2,Math.round(random(50, 250)));
        jogador3.scale =0.06;
        jogador3.addAnimation("opponentPlayer3",opVermelhoimg1);
        jogador3.setLifetime=170;
        CGVermelho.add(jogador3);
}

// criar função de redefinição aqui
function reset(){
        estadoJogo = JOGAR
        CGVermelho.destroyEach();
        CGAmarelo.destroyEach();
        CGRosa.destroyEach();
        distancia = 0;
        ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);

}


