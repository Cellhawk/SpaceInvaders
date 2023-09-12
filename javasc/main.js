var canvas;
var ctx;
var time;
var projectile;
var highscore = 0;
var images = [];
var level=1;
var score = 0;
var startmenu = 1;
var scene = [];

function initialize(){
	tick = 0;
	isend = 0
	scene = [];
	explosions = [];
	const ship = new Ship();
    scene.push(ship);
	for(var l=0; l<3; l++){
   		for(var k=0; k<16; k++){
   			scene.push(new Invader(k,l))
    	}
    }
}

function draw(dt) {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.font="10px Impact";
	ctx.fillStyle = "green";
	ctx.fillText("SCORE:"+score,30,499);
	ctx.fillText("HIGHSCORE:"+highscore,700,499);
	ctx.textAlign="center";
	ctx.fillText("LEVEL:"+level,canvas.width/2,499);


	for (i in scene) {
		scene[i].draw()
	}
	if(projectile!=null){
		projectile.draw();
	}
	for (i in explosions) {
		explosions[i].draw(dt)
	}
}

function move() {
	for (var i in scene) {
		scene[i].move()
	}
	if(projectile!=null){
		projectile.move();
	}
}

// function step() {
function step(timestamp) {
	time = timestamp;
	menuStart();
	var now = Date.now()
	var dt = (now - time) / 100
	time = now
	if (score>highscore) {
		highscore=score;
	}
	if(behave.isDown(behave.CHEAT)){
		cheatkillall();
	}
	move()
	draw(dt)
	isgameover()
	requestAnimationFrame(step)
}

// Inicializacia
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d")
    initialize();
    for(var i=0; i<10; i++){
		images[i] = new Image();
		images[i].src = `img/explosion/exp${i+1}.png`;
	}
    time = Date.now()
    requestAnimationFrame(step)
}

//ovladanie
var behave = {
	down: {},

	LEFT: 65,
	LEFTARROW: 37,
	RIGHT: 68,
	RIGHTARROW: 39,
	SHOOT: 32,
	ESCAPE: 27,
	ENTER: 13,
	CHEAT: 75, //K
  
	isDown: function(keyCode) {
    return this.down[keyCode];
	},
  
	onKeydown: function(event) {
    this.down[event.keyCode] = true;
	},
  
	onKeyup: function(event) {
    delete this.down[event.keyCode];
	}
};

window.addEventListener('keyup', function(event) { behave.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { behave.onKeydown(event); }, false);

function menuStart(){
	if(startmenu == 1){
		console.log("Test");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "red";
		ctx.font="30px Impact";
		ctx.textAlign="center";
		ctx.fillText("Welcome to Invaders Must Die!",canvas.width/2,canvas.height/2-40);
		ctx.textAlign="center";
		ctx.fillText("Press Enter to continue",canvas.width/2,canvas.height/2);
		ctx.textAlign="center";
		if(behave.isDown(behave.ENTER)){
			console.log("Enter");
			startmenu = 0;
		}
	}
}

function isgameover(){
	if(scene.length == 1){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "green";
		ctx.font="30px Impact";
		if(isend==1){
			ctx.textAlign="center";
			ctx.fillText("You have failed to stop the invasion!",canvas.width/2,canvas.height/2-40);
			ctx.textAlign="center";
			ctx.fillText("Your score: "+score,canvas.width/2,canvas.height/2);
			ctx.textAlign="center";
			ctx.fillText("Highscore: "+highscore,canvas.width/2,canvas.height/2+40);
			ctx.textAlign="center";
			ctx.fillText("Level reached: "+level,canvas.width/2,canvas.height/2+80);
			ctx.textAlign="center";
			ctx.fillText("Press Enter to restart",canvas.width/2,canvas.height/2+120);
			if(behave.isDown(behave.ENTER)){
				score=0;
				level=1;
				initialize();
			}
		} else {
			ctx.textAlign="center";
			ctx.fillText("Wave cleared!",canvas.width/2,canvas.height/2);
			ctx.textAlign="center";
			ctx.fillText("Press Enter to continue",canvas.width/2,canvas.height/2+40);
			ctx.font="10px Impact";
			ctx.fillText("SCORE:"+score,30,499);
			ctx.fillText("HIGHSCORE:"+highscore,700,499);
			ctx.textAlign="center";
			ctx.fillText("LEVEL:"+level,canvas.width/2,499);
			if(behave.isDown(behave.ENTER)){
				initialize();
				level++;
			}
		}
	}
}

/*function menu(a){
	switch(a) {
    case 0: //newgame
        scene.push(new Button(0,0))
		scene.push(new Button(0,1))
        break;
    case 1: //pause
        scene.push(new Button(1,0))
		scene.push(new Button(1,1))
        break;
    case 2: //endgame
		scene.push(new Button(2,0))
		scene.push(new Button(2,1))
    	break;   
	}
}*/

function cheatkillall(){
	var x = scene.length;
	for(var m=1; m<x; m++){
   		scene.splice(1,1);
    }
    projectile=null;
}

setTimeout(function() {
	var music = new Audio();
	music.src="sound/music.mp3";
	music.loop = true;
	music.play();
	music.volume = 0.7;
}, 1000);