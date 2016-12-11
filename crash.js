var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 1408;
canvas.height = 810; //FIND BACKGROUND PICTURE

document.body.appendChild(canvas);

var backgroundImage = new Image();
backgroundImage.src = "zamn-level1.gif"; //FIND BACKGROUND PICTURE

var speedMod = .5;
var gameOn = false;

var hero = new Image();
hero.src = "crash-running.png"; //FIND HERO PICTURE
var heroLoc = {
	x: 100,
	y: 100
};

var monster = new Image(); //actually a fruit right now
monster.src = "boo.png"; //FIND MONSTER PICTURE
var monsterLoc = {
	x: 1200,
	y: 500,
	monsterLocNewX: 1200,
	monsterLocNewY: 500
};

var tree = new Image();
tree.src = "wall.png";
var treeLoc = {
	x: 15,
	y: 500
};

var tree2 = new Image();
tree2.src = "wall.png";
var tree2Loc = {
	x: 80,
	y: 500
};
var tree3 = new Image();
tree3.src = "wall.png";
var tree3Loc = {
	x: 145,
	y: 500
};
var tree4 = new Image();
tree4.src = "wall.png";
var tree4Loc = {
	x: 210,
	y: 500
};


var monsterDestX = Math.floor(Math.random() * 880);
var monsterDestY = Math.floor(Math.random() * 880);
var treeDestX = 275
var treeDestY = 0

var currentPlayerScore = 0;
var highScore = 0;
var gameStart = 0;
var gameEnd = 0;
var timerInterval;
var playerArray = [];

var counterInterval;

var keysPressed = []
addEventListener("keydown", function(event){
	keysPressed[event.keyCode] = true;
});
addEventListener("keyup", function(event){
	delete keysPressed[event.keyCode];
});

function player(name){
	this.name = name;
	this.highScore = 0;
}

function newPlayer(){
	var playerNameDiv = document.getElementById("player-name");
	var playerName = playerNameDiv.value;
	playerArray.push(new player(playerName));
}

function startGame(){
	gameOn = true;
	gameStart = Date.now();
	gameEnd = Date.now() + 100000; //change this to change the timer
	timerInterval = setInterval(updateTimer, 500);
	currentPlayerScore = 0;
	document.getElementById("score-value").innerHTML = 0;
}

function pause(){
	clearInterval(counterInterval);
	gameOn = false;
}

function updateTimer(){
	var newNow = Date.now();
	var timeDifference = Math.floor((gameEnd - newNow) / 1000);
	if(timeDifference <= 0){
		gameOn = false;
		timeDifference = 0;
		document.getElementById("timer").innerHTML = "Game Over!!!";
	}else{
		document.getElementById("timer").innerHTML = timeDifference + " seconds";
	}
}

function update(){
	if(37 in keysPressed){
		if(heroLoc.x > 20){ //change this 30 to the width of the left barrier
			heroLoc.x -= (10 * speedMod);
		}
	}
	if(38 in keysPressed){
		if(heroLoc.y > 20){ //change this 30 to the height of the top barrier
			heroLoc.y -= (10 * speedMod);
		}
	}
	if(39 in keysPressed){
		if(heroLoc.x < 1300){ //change this 450 to the width of the right barrier
			heroLoc.x += (10 * speedMod);
		}
	}
	if(40 in keysPressed){
		if(heroLoc.y < 700){ //change this 412 to the height of the bottom barrier
			heroLoc.y += (10 * speedMod);
		}
	}
	//change the 32s if want to change the hero/monster size
	//THIS MAKES IT SO YOU CANT PASS THROUGH
	if((heroLoc.x <= treeLoc.x + 48) &&
		(heroLoc.y <= treeLoc.y + 48) &&
		(treeLoc.x <= heroLoc.x + 48) &&
		(treeLoc.y <= heroLoc.y + 48) &&
		keysPressed){
		heroLoc.x = heroLoc.x - 10;
		heroLoc.y = heroLoc.y - 10;
	}
	if((heroLoc.x <= monsterLoc.x + 48) &&
		(heroLoc.y <= monsterLoc.y + 48) &&
		(monsterLoc.x <= heroLoc.x + 48) &&
		(monsterLoc.y <= heroLoc.y + 48)){
			console.log("HERO CAUGHT A MONSTER");

			currentPlayerScore++
			document.getElementById("score-value").innerHTML = currentPlayerScore;
			if(currentPlayerScore > highScore){
				highScore = currentPlayerScore;
				document.getElementById("high-score-value").innerHTML = highScore;
			}
			var currentPlayerIndex = playerArray.length - 1;
			if(currentPlayerScore > playerArray [currentPlayerIndex]){
				playerArray[currentPlayerIndex].highScore = currentPlayerScore;
			}

			//change the 400 if you want monster to spawn closer/farther
			var monsterLocNewX = Math.random() * 1000;
			var monsterLocNewY = Math.random() * 800;
			monsterLoc.x = monsterLocNewX;
			monsterLoc.y = monsterLocNewY;
		}
}


//1. change 32x32 if you change the size of the monster
//2. change the 440 if you want the monster destination to change closer/farther
//3. change the 3 if you want speed mod to change faster or slower
	//for each direction
function monsterMove (){
	if((Math.abs(monsterDestX - monsterLoc.x)) < 48 &&
		(Math.abs(monsterDestY - monsterLoc.y)) < 48){
		monsterDestX = Math.floor(Math.random() * 440);
		monsterDestY = Math.floor(Math.random() * 440);
	}else{
		if(monsterDestX > monsterLoc.x){
			monsterLoc.x += Math.ceil(Math.random() * 5);
		}
		if(monsterDestX < monsterLoc.x){
			monsterLoc.x -= Math.ceil(Math.random() * 5);
		}
		if(monsterDestY > monsterLoc.y){
			monsterLoc.y += Math.ceil(Math.random() * 5);
		}
		if(monsterDestY < monsterLoc.y){
			monsterLoc.y -= Math.ceil(Math.random() * 5);
		}
	}
	//UNCOMMENT IF YOU WANT THE TREE TO MOVE
	if((Math.abs(treeDestX - treeLoc.x)) < 48){
		treeDestX = Math.floor(Math.random() * 250);
	}else{
		if (treeDestX > treeLoc.x){
			treeLoc.x += Math.ceil(Math.random() * 3);
		}
		if (treeDestX < treeLoc.x){
			treeLoc.x -= Math.ceil(Math.random() * 3);
		}
	}
}

function draw(){
	if(gameOn){
		update();
		monsterMove();
	}
	context.drawImage(backgroundImage, 0,0);
	context.drawImage(hero, heroLoc.x, heroLoc.y);
	context.drawImage(monster, monsterLoc.x, monsterLoc.y);
	context.drawImage(tree, treeLoc.x, treeLoc.y)
	context.drawImage(tree2, tree2Loc.x, tree2Loc.y)
	context.drawImage(tree3, tree3Loc.x, tree3Loc.y)
	context.drawImage(tree4, tree4Loc.x, tree4Loc.y)

	requestAnimationFrame(draw);
}

draw();




















