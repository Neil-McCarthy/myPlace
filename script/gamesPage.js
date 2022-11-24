//GENERAL>>>
let canvas,width,height,context,draw,mouseX,mouseY,main;
let body = document.querySelector("body");
main = document.querySelector("main");
let mainSections = main.getElementsByTagName("section");
let playImage = main.getElementsByTagName("img")[0];
//<<GENERAL


// NAV SET LOCAL STORAGE>>>
let navOptionsList = document.querySelector("nav").getElementsByTagName("ul")[0];
for (let navListSpecific = 0;navListSpecific < navOptionsList.children.length;navListSpecific++){
    for (let navSubListSpecific = 0;navSubListSpecific < navOptionsList.children[navListSpecific].getElementsByTagName("li").length;navSubListSpecific++) {
        navOptionsList.children[navListSpecific].getElementsByTagName("li")[navSubListSpecific].onclick = () => {
            localStorage.setItem(navOptionsList.children[navListSpecific].getElementsByTagName("a")[0].innerHTML,navSubListSpecific);
        }
    }
}
// <<<NAV SET LOCAL STORAGE



//GAME SELECTOR NAV>>>
let mainGmaesList = main.getElementsByTagName('ul')[0].getElementsByTagName('button');
for (let clickedGame = 0;clickedGame < mainGmaesList.length;clickedGame++){
    mainGmaesList[clickedGame].onclick = () => {
        gameChanger(clickedGame);
    };
}
let navGamesList = body.getElementsByTagName('nav')[0].getElementsByTagName('li')[11].getElementsByTagName('ul')[0].getElementsByTagName('a');
for (let clickedGame = 0;clickedGame < navGamesList.length;clickedGame++){
    navGamesList[clickedGame].onclick = () => {
        gameChanger(clickedGame);
    };
}
function gameChanger(game) {
    gameRestart(game);
    localStorage.setItem('game',game);
}
//<<<GAME SELECTOR NAV


//ALL GAME GENERAL>>>
let gamePlayer,controller,alienRowCalculator,scoreTable,tableRow,tableHeader,tableHeaderValue,tableValue,tableValueValue,historyParagraph,keyBindingParagraph,historyContent,keyBindingContent;
let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');
let gameWidth = gameCanvas.width;
let gameHeight = gameCanvas.height;
//<<<ALL GAME GENERAL


//EXTRA GAME WINDOWS>>>
let scoreboard = document.getElementById("scoreboard");
let controls = document.getElementById("controls");
let screenLock = document.getElementById("screenLock");
let playerChanger = document.getElementById("playerChanger");
let screenLocked = false;
let pause = document.getElementById("pause");
let paused = false;
let pauseDisplay = false;
let gameHistory = document.getElementById("gameHistory");
let keyBindings = document.getElementById("keyBindings");

//SCREEN LOCK INSTRUCTION>>>
screenLock.onclick = function screenLocker(){
    if (screenLocked === false){
        // body.style.height = '100vh';
        body.style.overflow = 'hidden';
        console.log(window.offsetTop);
        screenLocked = true;
    } else if (screenLocked === true){
        // body.style.height = '';
        body.style.overflow = '';
        screenLocked = false;
    }
}
pause.onclick = function gamePauser(){
    if (paused == false){
        paused = true;
        playImage.style.zIndex = 0;
    } else{
        paused = false;
        playImage.style.zIndex = -1;
    }
    window.requestAnimationFrame(gamePlayer);
}
//<<<SCREEN LOCK INSTRUCTION

//PLAY IMAGE>>>
playImage.onclick = () => {
    paused = false;
    playImage.style.zIndex = -1;
    window.requestAnimationFrame(gamePlayer);
}
//<<<PLAY IMAGE
//<<<EXTRA GAME WINDOWS


//RESTART GAMES>>>
function gameRestart(gameSelected){
    if (gameOver === true){
        gameOver = false;
        window.requestAnimationFrame(gamePlayer);
    }
    while (scoreboard.childNodes.length > 2){
        scoreboard.removeChild(scoreboard.lastChild);
    }
    while (gameHistory.childNodes.length > 2){
        gameHistory.removeChild(gameHistory.lastChild);
    }
    while (keyBindings.childNodes.length > 2){
        keyBindings.removeChild(keyBindings.lastChild);
    }
    gameWindowUpdator(gameSelected);
    if (gameSelected == 0){
        aliensValuesGiven = false;
        alienXPos = 150;
        alienYPos = 100;
        alienSpeed = .35;
        player.x = gameWidth/2 - 5;
        player.y = gameHeight - 100;
        player.dx = 0;
        player.alive = true;
        aliens = [];
        alienShots = [];
        deadAliens = [];
        playerScore = document.getElementById('score');
        kills = 0;
        playerScore.appendChild(document.createTextNode(kills));
    }
}
//<<<RESTART GAMES



//SCOREBOARD CREATOR>>>
function gameWindowUpdator(GameTable){
    if (GameTable == 0){
        tableHeaderValue = 'Aliens murdered:';
        historyContent = 'History of maliens';
        keyBindingContent = 'Press this button';
    }
    if (GameTable == 1){
        tableHeaderValue = 'BleepBloop';
        historyContent = 'Blistory of baliens';
        keyBindingContent = 'No that button';
    }
    if (GameTable == 2){
        tableHeaderValue = 'Skippy';
        historyContent = 'Skippies magic castle';
        keyBindingContent = 'Skipper!!!';
    }
    scoreTable = document.createElement('table');
    tableRow = document.createElement('tr');
    tableHeader = document.createElement('th');
    tableHeader.appendChild(document.createTextNode(tableHeaderValue));
    tableValue = document.createElement('td');
    tableValue.setAttribute('id','score');
    tableRow.appendChild(tableHeader);
    tableRow.appendChild(tableValue);
    scoreTable.appendChild(tableRow);
    scoreboard.appendChild(scoreTable);
    historyParagraph = document.createElement('p');
    historyParagraph.appendChild(document.createTextNode(historyContent));
    gameHistory.appendChild(historyParagraph);
    keyBindingParagraph = document.createElement('p');
    keyBindingParagraph.appendChild(document.createTextNode(keyBindingContent));
    keyBindings.appendChild(keyBindingParagraph);

}
//<<<SCOREBOARD CREATOR


//SCOREBOARD UPDATER>>>
function scoreTracker(){
    playerScore.removeChild(playerScore.firstChild);
    playerScore.appendChild(document.createTextNode(kills));
}
//<<<SCOREBOARD UPDATER


///
/////SPACE INVADERS>>> /////
///

//SPACE INVADERS GENERAL>>>
let playerLastX,playerLastY;
let shooting = false;
let fired = false;
let aliens = [];
let deadAliens = [];
let alienXPos = 150;
let alienYPos = 100;
let alienSpeed = .5;
let alienShots = [];
let shotNumber = 0;
let blockades = [];
let blockadeBlock = 0
let blockadeCount = 0;
let blockStartPoint;
let blockadesCreated = false;
let kills = 0;
let flames = [];
let shotsFired = [];
let reloadCounter = 0;
let explosionSound = new Audio('../audio/Explosion11.m4a');
explosionSound.volume = .5;
let alienExplosion = new Audio('../audio/alienExplosion.wav');
alienExplosion.volume = .25;
let playerScore = document.getElementById('score');
let keyCodes;
let gameOver = false;
let alienShotDecider;
let player = {
    x:gameWidth/2 - 5,
    y:gameHeight - 100,
    dx:0,
    size:10,
    alive:true
}
let shooter = {
    x:player.x + player.size*1.5 - 2.5,
    y:player.y - player.size,
    size:5,
}
let shot = {
    x:shooter.x + shooter.size/2 - 1.75,
    y:shooter.y,
    size:2.5,
    dy:-3
}
//<<<SPACE INVADERS GENERAL

//>>>SPACE INVADERS - REVIVE
function playerRevive() {
    player.alive = true;
    flames.length = 0;
 }
 //<<<SPACE INVADERS - REVIVE
 
 
 //CREATE ALIENS>>>
 let aliensValuesGiven = false;
 function alienValuesAsign(rowsOfAliens){
     alienRowCalculator = rowsOfAliens*10
     for(let alien = 0;alien < alienRowCalculator;alien++){
         aliens.push({
            id:alien,
            x:alienXPos,
            y:alienYPos,
            size:20,
            dx:alienSpeed,
            alive:true
         });
         alienShots.push({
            x:alienXPos + alien.size/2 - 2.5,
            y:alienYPos - 50,
            size:5,
            fired:0,
            sent:0
        });
         if (aliens.length % 10) {
             alienXPos += 50;
         } else {
             alienXPos = 150;
             alienYPos += 25;
         }
     }
 }

 function createAliens(alien){
    alien.x += alien.dx;
    if (alien.x > gameWidth - 100 || alien.x < 100){
        alien.y += 25;
        alien.dx *= 1.15;
        alien.dx *= -1;
    }
    if (alien.x > player.x - 100 && alien.x < player.x + 100){
        alienShotDecider = Math.floor((Math.random() * 1000));
        if (alienShotDecider < 20 && alien.alive === true){
            alienShots[alien.id].fired = 1;
        }
    }
    gameContext.fillStyle ='yellow';
    if (alienShots[alien.id].fired == 1 && alienShots[alien.id].sent == 0 && alien.alive === true){
        alienShots[alien.id].x = alien.x + alien.size/2 - 2.5;
        alienShots[alien.id].y = alien.y + 10;
        gameContext.fillRect(alienShots[alien.id].x,alienShots[alien.id].y,alienShots[alien.id].size,alienShots[alien.id].size*2);
        alienShots[alien.id].sent = 1;
    }
    if (alienShots[alien.id].fired == 1 && alienShots[alien.id].sent == 1 && alien.alive === true){
        alienShots[alien.id].y += 4;
        gameContext.fillRect(alienShots[alien.id].x,alienShots[alien.id].y,alienShots[alien.id].size,alienShots[alien.id].size*2);
    }
    if (collision(alienShots[alien.id],player,2)){
    }   else{
        localStorage.setItem('lastScore',kills);
        player.alive = false;
        player.x = gameWidth/2 - 5;
        explosionSound.play();
        setTimeout(playerRevive, 3000);
    }
    if (alienShots[alien.id].y > gameHeight - 100 && aliens[alien.id].alive){
        reload('alien',alien.id);
    }
    gameContext.fillStyle ='lime';
    if (alien.alive == true){
        gameContext.fillRect(alien.x,alien.y,alien.size,alien.size);
    }
    for (let selectedShot = 0;selectedShot < shotsFired.length; selectedShot++) {
        if (collision(shotsFired[selectedShot],alien,3)){
        } else {
            shotsFired.splice(selectedShot, 1);
            alien.alive = false;
            kills += 1;
            scoreTracker();
            alienExplosion.play();
        }
    }
}
 //<<<CREATE ALIENS
 
 function reload(type,alienNumber){
        alienShots[alienNumber].x = aliens[alienNumber].x + aliens[alienNumber].size/2 - 2.5;
        alienShots[alienNumber].y = alienYPos + 10;
        alienShots[alienNumber].fired = 0;
        alienShots[alienNumber].sent = 0;
}

//SPACE INVEDERS - CREATE BLOCKADE>>>
function createBlockade(blockadeXPosition){
    blockadeCount +=1;
    blockStartPoint = blockadeXPosition;
    for (;blockadeBlock < blockadeCount*10;blockadeBlock++){
        blockades.push({
            x:blockadeXPosition,
            y:650,
            size:10,
            damaged:false
        })
        blockadeXPosition += 10
    }
}

function playerShoot() {
    shotsFired.push({
        x:player.x + player.size*1.5 - 1.75,
        y:player.y - player.size,
        size:2.5,
        dy:-5
    })
}
//<<<SPACE INVEDERS - CREATE BLOCKADE

///
/////<<<SPACE INVADERS/////
///


///
/////SQUARES GAME>>>/////
///

//SQUAREGAME GENERAL>>>
let scrollPosition = 0;
let scrolling = false;
let xPosition = 0;
let yPosition = 0;
let platform = [];
let platformNumber = 0;
let platformID;
let enemy = [];
let enemyNumber = 0;
let enemiesCreated = false;
let enemyID;
let lastX = 1500*3/4;
let playing = true;
let playerPosition = 0;
let squaresPlayer = {
    x:730,
    y:600,
    dx:0,
    dy:0,
    size:20,
    jumping:false
}
let finish = {
    x:800,
    y:360,
    size:40
}
//<<<SQUAREGAME GENERAL


//SQUAREGAME - PLATFORMS>>>
function platforms(xPosition,yPosition,wide,tall){
    platform.push(
        {
        x:xPosition,
        y:yPosition,
        dx:0,
        dy:0,
        width:wide,
        height:tall
        }
    );
    gameContext.fillRect(platform[platformNumber].x,platform[platformNumber].y,platform[platformNumber].width,platform[platformNumber].height);
    platformNumber += 1;
}
//<<<SQUAREGAME - PLATFORMS


//SQUAREGAME - ENEMIES>>>
function enemyCreator(xPosition,yPosition,size){
    enemy.push(
        {
        x:xPosition,
        y:yPosition,
        dx:0,
        dy:0,
        size:size
        }
    );
}

function enemyDraw(enemyNumber){
    gameContext.fillRect(enemy[enemyNumber].x,enemy[enemyNumber].y,enemy[enemyNumber].size,enemy[enemyNumber].size);

}
//<<<SQUAREGAME - ENEMIES

let jumpActive = false;
//SQUAREGAME - ENEMY JUMP>>>
function enemyJump(n){
    setTimeout(function(){
        enemy[n].dy -= 25;
        jumpActive = false;
    }, 1000);
}
//<<<SQUAREGAME - ENEMY JUMP


//>>>SQUAREGAME - JUMP DELAY
function jumpDelay(delayTime){
    let delayCounter = 0;
    if (delayCounter < delayTime) {
        delayCounter++;
    } else {
        squaresPlayer.jumping = false;
    }
}
//<<<SQUAREGAME - JUMP DELAY

///
/////<<<SQUARES GAME/////
///


///
/////PONG>>> /////
///

//PONG GENERAL>>>
let pongRacketSound = new Audio('../audio/tennis2-SF.mp3');
let pongAI = false;
let pongAIDestination;
let pongAIDirection;
let pongAICounter = 0;
let pongLeftPlayer = {
    x:gameWidth/6 - 5,
    y:gameHeight/2 - 50,
    dy:0,
    size:10,
}
let pongRightPlayer = {
    x:gameWidth*5/6 - 5,
    y:gameHeight/2 - 50,
    dy:0,
    size:10,
}
let pongBall = {
    x:gameWidth/2 - 5,
    y:gameHeight/2 - 5,
    dy:Math.random() * (3 - 2) + 2,
    dx:1 * (Math.round(Math.random()) ? 1 : -1),
    size:10,
}
//<<<PONG GENERAL


//PONG - AI>>>
playerChanger.onclick = function playerChange(){
    if (pongAI === true){
        pongAI = false;
    } else{
        pongAI = true;
    }
}
//<<<PONG - AI

//PONG - AI PLAYER>>>
function AIPlayer(ballLocation){
    pongAICounter += 1;
    if (pongAICounter == 15){
        if (pongRightPlayer.y + 30 > pongBall.y){
            pongAIDestination = Math.random() * (pongRightPlayer.y - (pongBall.y - 25)) + pongBall.y - 25;
            pongAIDirection = 'up'
        }
        if (pongRightPlayer.y + 60 < pongBall.y + 10){
            pongAIDestination = Math.random() * (pongBall.y - (pongRightPlayer.y + 25)) + pongRightPlayer.y + 25;
            pongAIDirection = 'down'
        }
        pongAICounter = 0;
    }
    if (pongRightPlayer.y > pongAIDestination && pongAIDirection === 'up'){
        pongRightPlayer.dy -= 2.3;
    } else if (pongRightPlayer.y < pongAIDestination && pongAIDirection === 'down'){
        pongRightPlayer.dy += 2.3;
    }
}
//<<<PONG - AI PLAYER

///
/////PONG>>> /////
///


///
/////PACMAN>>> /////
///

//PACMAN GENERAL>>>
let score = 0;
let ghostNewDirection,ghostNextDirection;
let mouthMover = 50;
let boundaryTracker = [];
let pacFoodTracker = [];
let pacFoodX = 232.5;
let pacFoodY = 72.5;
let rowTracker = 0;
let columnTracker = 0;
let pacmanWakaWaka = new Audio('../audio/pacmanWakaWaka.mp3');
pacmanWakaWaka.playbackRate = 1.3;
let wakaLoop = 0;
//<<<PACMAN GENERAL

//CREATE PACMAN>>>
let pacman = {
    x:500,
    y:372.5,
    dx:0,
    dy:0,
    size:15,
    direction:'none',
    nextDirection:'none',
    lastDirection:'left',
    buffer:25,
    collideTopCheck:0,
    collideRightCheck:0,
    collideDownCheck:0,
    collideLeftCheck:0,
    collideTop:false,
    collideRight:false,
    collideDown:false,
    collideLeft:false,
}
//<<<CREATE PACMAN

//CREATE GHOSTS>>>
let ghostsCreated = false;
let ghostColour,ghostPositionX,ghostPositionY,ghostDirection,ghostNextirection;
let ghostTracker = [];
let ghostDirections = ['up','right','down','left'];
function ghostMaker(){
    for(let ghostNumber = 0;ghostNumber < 4;ghostNumber++){
        if(ghostNumber == 0){
            ghostColour = 'red';
            ghostPositionX = 500;
            ghostPositionY = 252.5;
            ghostDirection = 'right';
            ghostNextirection = 'none';
        } else if(ghostNumber == 1){
            ghostColour = 'pink';
            ghostPositionX = 465;
            ghostPositionY = 312.5;
            ghostDirection = 'right';
            ghostNextirection = 'up';
        } else if(ghostNumber == 2){
            ghostColour = 'orange';
            ghostPositionX = 500;
            ghostPositionY = 312.5;
            ghostDirection = 'up';
            ghostNextirection = 'none';
        } else if(ghostNumber == 3){
            ghostColour = 'aqua';
            ghostPositionX = 535;
            ghostPositionY = 312.5;
            ghostDirection = 'left';
            ghostNextirection = 'up';
        }
        ghostTracker.push(
            {
                colour:ghostColour,
                x:ghostPositionX,
                y:ghostPositionY,
                dx:0,
                dy:0,
                size:15,
                direction:ghostDirection,
                nextDirection:ghostNextirection,
                lastDirection:'none',
                buffer:25,
                collideTopCheck:0,
                collideRightCheck:0,
                collideDownCheck:0,
                collideLeftCheck:0,
                collideTop:false,
                collideRight:false,
                collideDown:false,
                collideLeft:false,
                midSection:15,
                leftEyeX:5,
                leftEyeY:2.5,
                rightEyeX:5,
                rightEyeY:2.5,
                directionChangeGrace:0
            }
        )
    }
}

function ghostCreator(ghost){
    gameContext.fillStyle = ghost.colour;
    gameContext.strokeStyle = ghost.colour;
    gameContext.beginPath();
    gameContext.arc(ghost.x, ghost.y, ghost.size, 3, 2.1 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.fillRect(ghost.x - ghost.size - .5,ghost.y,31,ghost.midSection);
    gameContext.fillStyle = 'white';
    gameContext.beginPath();
    gameContext.arc(ghost.x - 5, ghost.y - 2.5, 5, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.beginPath();
    gameContext.arc(ghost.x + 5, ghost.y - 2.5, 5, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.strokeStyle = 'blue';
    gameContext.fillStyle = 'blue';
    gameContext.beginPath();
    gameContext.arc(ghost.x - ghost.leftEyeX, ghost.y - ghost.leftEyeY, 1, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.beginPath();
    gameContext.arc(ghost.x + ghost.rightEyeX, ghost.y - ghost.rightEyeY, 1, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
}
//<<<CREATE GHOSTS

//GHOSTS DIRECTSIONS>>>
function ghostDirectionChanger(ghost){
    ghostNewDirection = Math.floor(Math.random() * ghostDirections.length);
    if (ghostDirections[ghostNewDirection] == ghost.lastDirection){
        ghostDirectionChanger(ghost);
    } else{
        ghost.direction = ghostDirections[ghostNewDirection];
    }
}
function ghostNextDirectionMaker(ghost){
    ghostNextDirection = Math.floor(Math.random() * ghostDirections.length);
    if (ghostDirections[ghostNextDirection] == 'up' && ghost.direction != 'down' && ghost.direction != 'up'){
        ghost.nextDirection = 'up';
    } else if (ghostDirections[ghostNextDirection] == 'right' && ghost.direction != 'left' && ghost.direction != 'right'){
        ghost.nextDirection = 'right';
    } else if (ghostDirections[ghostNextDirection] == 'down' && ghost.direction != 'up' && ghost.direction != 'down'){
        ghost.nextDirection = 'down';
    } else if (ghostDirections[ghostNextDirection] == 'left' && ghost.direction != 'right' && ghost.direction != 'left'){
        ghost.nextDirection = 'left';
    } else {
        ghostNextDirectionMaker(ghost)
    }
    ghost.directionChangeGrace = 0;
}
//<<<GHOSTS DIRECTIONS

//CREATE BOUNDARIES>>>
let boundariesValuesGiven = false;
function boundariesAssignValues(xPosition,yPosition,length,direction){
    boundaryTracker.push(
        {
        x:xPosition,
        y:yPosition,
        length:length,
        direction:direction
    })
}
function boundariesCreate(boundary){
    gameContext.beginPath();
    gameContext.moveTo(boundary.x,boundary.y);
    if (boundary.direction == 'horizontal'){
        gameContext.lineTo(boundary.x + boundary.length,boundary.y);
        gameContext.lineTo(boundary.x + boundary.length,boundary.y + 10);
        gameContext.lineTo(boundary.x,boundary.y + 10);
    } else if (boundary.direction == 'vertical'){
        gameContext.lineTo(boundary.x,boundary.y + boundary.length);
        gameContext.lineTo(boundary.x + 10,boundary.y + boundary.length);
        gameContext.lineTo(boundary.x + 10,boundary.y);
    }
    gameContext.lineTo(boundary.x,boundary.y);
    gameContext.strokeStyle = 'blue';
    gameContext.stroke();
}
//<<<CREATE BOUNDARIES

//CREATE FOOD>>>
const row0Block = [9];
const row1Block = [1,2,3,5,6,7,9,11,12,13,15,16,17];
const row2Block = [0,18];
const row3Block = [1,2,3,5,7,8,9,10,11,13,15,16,17];
const row4Block = [5,9,13];
const row5Block = [0,1,2,3,5,6,7,9,11,12,13,15,16,17,18];
const row6Block = [0,1,2,3,5,13,15,16,17,18];
const row7Block = [0,1,2,3,5,7,8,9,10,11,13,15,16,17,18];
const row8Block = [0,1,2,3,7,8,9,10,11,15,16,17,18];
const row9Block = [0,1,2,3,5,7,8,9,10,11,13,15,16,17,18];
const row10Block = [0,1,2,3,5,9,13,15,16,17,18];
const row11Block = [0,1,2,3,5,7,8,9,10,11,13,15,16,17,18];
const row12Block = [9];
const row13Block = [1,2,3,5,6,7,9,11,12,13,15,16,17];
const row14Block = [3,15];
const row15Block = [0,1,3,5,7,8,9,10,11,13,15,17,18];
const row16Block = [0,5,9,13,18];
const row17Block = [1,2,3,4,5,6,7,9,11,12,13,14,15,16,17];
const row18Block = [];

let pacFoodRealCount = 361;
function pacFoodcreator(){
    if (pacFoodTracker.length < 1){
        for(let specificPacFood = 0; specificPacFood < 361; specificPacFood++){
            if (pacFoodSpotBlocker(rowTracker,columnTracker)){
                pacFoodTracker.push({
                    alive:true,
                    x:pacFoodX,
                    y:pacFoodY,
                    size:5
                })
            } else{
                pacFoodRealCount--;
            }
            if (pacFoodX == 772.5){
                pacFoodY += 30;
                pacFoodX = 232.5;
                rowTracker++;
                columnTracker = 0;
            } else{
                columnTracker ++;
                pacFoodX += 30;
            }
        }
    }
    for(let specificPacFood = 0; specificPacFood < pacFoodRealCount; specificPacFood++){
        if (pacFoodTracker[specificPacFood].alive == true){
            gameContext.fillRect(pacFoodTracker[specificPacFood].x - 5,pacFoodTracker[specificPacFood].y - 2.5, pacFoodTracker[specificPacFood].size, pacFoodTracker[specificPacFood].size);
        }
    }
}

function pacFoodSpotBlocker(pacFoodHorizontal,pacFoodVertical){
        if (eval('row'+pacFoodHorizontal+'Block').includes(pacFoodVertical)){
            return false;
        } else{
            return true;
        }
}
//<<<CREATE FOOD

//MANAGE COLLISIONS>>>
function boundaryCollision(mover){
    for (let specificBoundary = 0;specificBoundary < boundaryTracker.length;specificBoundary++){
        if (boundaryTracker[specificBoundary].direction == 'horizontal'){
                if (mover.x + mover.buffer > boundaryTracker[specificBoundary].x && mover.x - mover.buffer < boundaryTracker[specificBoundary].x + boundaryTracker[specificBoundary].length){
                    if (mover.y - mover.buffer > boundaryTracker[specificBoundary].y && mover.y - mover.buffer <= boundaryTracker[specificBoundary].y + 10){
                        if (mover.direction == 'up'){
                            mover.dy = 0;
                            mover.y = boundaryTracker[specificBoundary].y + 10 + mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    } else if (mover.y + mover.buffer < boundaryTracker[specificBoundary].y + 10 && mover.y + mover.buffer >= boundaryTracker[specificBoundary].y){
                        if (mover.direction == 'down'){
                            mover.dy = 0;
                            mover.y = boundaryTracker[specificBoundary].y - mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    }
                    if (mover.y - mover.buffer == boundaryTracker[specificBoundary].y + 10){
                        mover.collideTop = true;
                        mover.collideTopCheck++;
                    }
                    if (mover.y + mover.buffer == boundaryTracker[specificBoundary].y){
                        mover.collideDown = true;
                        mover.collideDownCheck++;
                    }
                }
        } else if (boundaryTracker[specificBoundary].direction == 'vertical'){
                if (mover.y + mover.buffer > boundaryTracker[specificBoundary].y && mover.y - mover.buffer < boundaryTracker[specificBoundary].y + boundaryTracker[specificBoundary].length){
                    if (mover.x - mover.buffer > boundaryTracker[specificBoundary].x && mover.x - mover.buffer <= boundaryTracker[specificBoundary].x + 10){
                        if (mover.direction == 'left'){
                            mover.dx = 0;
                            mover.x = boundaryTracker[specificBoundary].x + 10 + mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    } else if (mover.x + mover.buffer < boundaryTracker[specificBoundary].x + 10 && mover.x + mover.buffer >= boundaryTracker[specificBoundary].x){
                        if (mover.direction == 'right'){
                            mover.dx = 0;
                            mover.x = boundaryTracker[specificBoundary].x - mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    }
                    if (mover.x - mover.buffer == boundaryTracker[specificBoundary].x + 10){
                        mover.collideLeft = true;
                        mover.collideLeftCheck++;
                    }
                    if (mover.x + mover.buffer == boundaryTracker[specificBoundary].x){
                        mover.collideRight = true;
                        mover.collideRightCheck++;
                    }
                }
        }
    }
    if (mover.collideTopCheck == 0){
        mover.collideTop = false;
    }
    if (mover.collideDownCheck == 0){
        mover.collideDown = false;
    }
    if (mover.collideLeftCheck == 0){
        mover.collideLeft = false;
    }
    if (mover.collideRightCheck == 0){
        mover.collideRight = false;
    }
    mover.collideTopCheck = 0;
    mover.collideDownCheck = 0;
    mover.collideLeftCheck = 0;
    mover.collideRightCheck = 0;
}
//<<<MANAGE COLLISIONS

//PACMAN COLLIONS>>>
function pacmanCollision(projectile,object){
    if (projectile.x + projectile.size - 5 < object.x - object.size + 5 ||
            object.x + object.size - 5 < projectile.x - projectile.size + 5 ||
            projectile.y - projectile.size + 5 > object.y + object.size - 5 ||
            object.y - object.size + 5 > projectile.y + projectile.size - 5){
        return true;
            } else{
                return false;
            }
}
//<<<PACMAN COLLISIONS

//WAKA WAKA>>>
function soundPlayer(){
    while(wakaLoop > 0){
        pacmanWakaWaka.play();
        wakaLoop--;
    }
}
//<<<WAKA WAKA
///
/////<<<PACMAN /////
///




function collision(projectile,object,projectileSizeMultiplier){
    if (projectile.x + projectile.size < object.x ||
        object.x + object.size < projectile.x ||
        projectile.y > object.y + object.size ||
        object.y > projectile.y + projectile.size*projectileSizeMultiplier){
        return true;
    } else{
        return false;
    }
}
/*
function explosion(explosionX,explosionY){
    flames = Math.floor(Math.random() * 6) + 3;
    gameContext.fillStyle ='orange';
    for(let flame = 0;flame < flames;flame++){
        gameContext.fillRect(explosionX,explosionY,2.5,2.5);
    }
}*/





//ACTIVATE KEYS>>>
controller = {
    left:false,
    right:false,
    keyListener:function(event){
        let key_state = (event.type == 'keydown')?true:false;

        switch(event.keyCode){
            case 37:
                controller.left = key_state;
            break;
            case 38:
                controller.up = key_state;
                squaresPlayer.jumping = true;
            break;
            case 39:
                controller.right = key_state;
            break;
            case 40:
                controller.down = key_state;
            break
            case 32:
                controller.shoot = key_state;
            break;
            case 87:
                controller.secondaryUp = key_state;
            break;
            case 83:
                controller.secondaryDown = key_state;
            break;
        }
    }
}
//<<<ACTIVATE KEYS




// Math.random();


function platformCollision(){
    for (let specificPlatform = 0;specificPlatform < platform.length; specificPlatform++){
        if (squaresPlayer.x + squaresPlayer.size < platform[specificPlatform].x ||
            platform[specificPlatform].x + platform[specificPlatform].width < squaresPlayer.x ||
            squaresPlayer.y > platform[specificPlatform].y + platform[specificPlatform].height ||
            platform[specificPlatform].y > squaresPlayer.y + squaresPlayer.size){
        } else {
            platformID = specificPlatform;
            return [true, platformID];
        }
    }

}


//USE LOCAL STORAGE>>>
gameChanger(localStorage.getItem("Games"));
// <<<USELOCAL STORAGE


gamePlayer = function(){
    if (paused == false){
        if (pauseDisplay == false){
            paused = true;
            pauseDisplay = true;
        }
        if (localStorage.getItem('game') == 0){
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
            if (player.alive){
                if (controller.left){
                    player.dx -= 1.2;
                }
                if (controller.right){
                    player.dx += 1.2;
                }
                if (controller.up && fired == false){
                    fired = true;
                    console.log('that');
                    playerShoot();
                }
                if (player.x < 0){
                    player.x = 0;
                }
                if (player.x + player.size*3 >= gameWidth){
                    player.x = gameWidth-player.size*3;
                }
                player.x += player.dx;
                player.dx *= .8;
            }
            if (player.alive === false){
                gameContext.fillStyle ='orange';
                for(let flame = 0;flame < 4;flame++){
                    flames.push({
                        x:playerLastX,
                        y:playerLastY,
                        size:5,
                        dx:Math.floor((Math.random() * 8) + 1) * (Math.round(Math.random()) ? 1 : -1),
                        dy:-15
                    })
                gameContext.fillRect(flames[flame].x,flames[flame].y,flames[flame].size,flames[flame].size);
                flames[flame].x += flames[flame].dx;
                flames[flame].dx *= .8;
                flames[flame].y += flames[flame].dy;
                flames[flame].dy *= .8;
                flames[flame].dy += 1.25;
                if (flames[flame].y + flames[flame].size > player.y + player.size){
                    flames[flame].y = player.y + player.size - flames[flame].size;
                }
                }
            }
            gameContext.fillStyle ='yellow';
            if (fired == true) {
                reloadCounter++
                if (reloadCounter == 100) {
                    fired = false;
                    reloadCounter = 0;
                }
            }
            for (let shotIndex = 0;shotIndex < shotsFired.length;shotIndex++) {
                gameContext.fillRect(shotsFired[shotIndex].x,shotsFired[shotIndex].y,shotsFired[shotIndex].size,shotsFired[shotIndex].size*3);
                shotsFired[shotIndex].y += shotsFired[shotIndex].dy;
                if (shotsFired[shotIndex].y < 0) {
                    shotsFired.splice(shotIndex, 1);
                }
            }
            if (player.alive){
                gameContext.fillStyle ='red';
                gameContext.fillRect(player.x, player.y, player.size*3, player.size);
                gameContext.fillRect(player.x + player.size*1.5 - 2.5,player.y - player.size, shooter.size, shooter.size*3);
            }
            gameContext.fillStyle = 'red';
            if (!blockadesCreated){
                createBlockade(150);
                createBlockade(350);
                createBlockade(550);
                createBlockade(750);
                blockadesCreated = true;
            }
            for (let blockadeBlock = 0;blockadeBlock < blockades.length;blockadeBlock++) {
                if (!blockades[blockadeBlock].damaged) {
                    gameContext.fillRect(blockades[blockadeBlock].x,blockades[blockadeBlock].y,blockades[blockadeBlock].size,blockades[blockadeBlock].size);
                }
                // for (let selectedShot = 0;selectedShot < shotsFired.length;selectedShot++) {
                //     if (!collision(shotsFired[selectedShot],blockades[blockadeBlock],3)) {
                //         blockades[blockadeBlock].damaged = true;
                //     }
                // }
            }
            gameContext.fillStyle = 'lime';
            if (aliensValuesGiven == false){
                alienValuesAsign(4);
                aliensValuesGiven = true;
            }
            for (let alien = 0;alien < aliens.length;alien++){
                if (aliens[alien].alive){
                    createAliens(aliens[alien]);
                }
            }
            gameContext.beginPath();
            gameContext.moveTo(0, player.y + player.size);
            gameContext.lineTo(gameWidth, player.y + player.size);
            gameContext.strokeStyle = 'yellow';
            gameContext.stroke();
        } else if (localStorage.getItem('game') == 1){
            if (controller.up && squaresPlayer.jumping == false){
                squaresPlayer.dy -= 20;
                squaresPlayer.jumping = true;
            }
            if (controller.left){
                squaresPlayer.dx -= 2;
            }
            if (controller.right){
                squaresPlayer.dx += 2;
            }
            squaresPlayer.dy += 2;
            squaresPlayer.x += squaresPlayer.dx;
            squaresPlayer.y += squaresPlayer.dy;
            squaresPlayer.dx *= .7;
            squaresPlayer.dy *= .9;
            scrollPosition *= .7;
            if (squaresPlayer.y > gameHeight - 200 - squaresPlayer.size){
                squaresPlayer.y = gameHeight - 200 - squaresPlayer.size;
                squaresPlayer.dy = 0;
                if (squaresPlayer.jumping){
                    jumpDelay(10000);
                }
            }
            if (squaresPlayer.x < 0){
                squaresPlayer.dx *= -.8;
                squaresPlayer.x = 0;
            }
            if (squaresPlayer.x + squaresPlayer.size >= gameWidth){
                squaresPlayer.dx *= -.8;
                squaresPlayer.x = gameWidth-squaresPlayer.size;
            }

            gameCanvas = document.getElementById('gameCanvas');
            gameContext = gameCanvas.getContext('2d');
            gameWidth = gameCanvas.width;
            gameHeight = gameCanvas.height;
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
            gameContext.fillStyle ='yellow';
            platforms(200,550,60,5);
            platforms(280,500,60,5);
            platforms(360,450,60,5);
            platforms(440,400,400,5);
            platforms(100,500,60,100);
            gameContext.fillStyle='cyan';
            if (enemiesCreated == false){
                enemyCreator(280,580,20);
                enemyCreator(400,500,20);
                enemiesCreated = true;
            }
            enemyDraw(0);
            enemyDraw(1);
            gameContext.fillStyle ='lime';
            gameContext.fillRect(finish.x, finish.y, finish.size, finish.size);
            gameContext.fillStyle ='red';
            gameContext.fillRect(squaresPlayer.x, squaresPlayer.y, squaresPlayer.size, squaresPlayer.size);
            gameContext.beginPath();
            gameContext.moveTo(0, 601);
            gameContext.lineTo(gameWidth, 601);
            gameContext.strokeStyle = 'yellow';
            gameContext.stroke();
            enemy[0].dy += .5;
            enemy[0].dy *= .9;
            enemy[0].y += enemy[0].dy;
            if (enemy[0].y > gameHeight - 200 - enemy[0].size){
                enemy[0].y = gameHeight - 200 - enemy[0].size;
                if (jumpActive == false){
                    enemyJump(0);
                    jumpActive = true;
                }
            }
            if (platformCollision()){
                if (squaresPlayer.y < platform[platformID].y && squaresPlayer.x + squaresPlayer.size > platform[platformID].x && squaresPlayer.x < platform[platformID].x + platform[platformID].width){
                    squaresPlayer.dy = 0;
                    squaresPlayer.y = platform[platformID].y - squaresPlayer.size;
                    squaresPlayer.jumping = false;
                }  else if (squaresPlayer.x < platform[platformID].x && squaresPlayer.y + squaresPlayer.size > platform[platformID].y && squaresPlayer.y < platform[platformID].y + platform[platformID].height){
                    squaresPlayer.dx *= -.8;
                    squaresPlayer.x = platform[platformID].x - squaresPlayer.size;
                    squaresPlayer.jumping = true;
                } else if (squaresPlayer.x + squaresPlayer.size > platform[platformID].x + platform[platformID].width &&  squaresPlayer.y + squaresPlayer.size > platform[platformID].y && squaresPlayer.y < platform[platformID].y + platform[platformID].height){
                    squaresPlayer.dx *= -.8;
                    squaresPlayer.x = platform[platformID].x + platform[platformID].width;
                    squaresPlayer.jumping = true;
                } else if (squaresPlayer.y > platform[platformID].y && squaresPlayer.x + squaresPlayer.size > platform[platformID].x && squaresPlayer.x < platform[platformID].x + platform[platformID].width){
                    squaresPlayer.dy *= -.2;
                    squaresPlayer.y = platform[platformID].y + platform[platformID].height;
                    squaresPlayer.jumping = true;
                }
            }
            for (let specificEnemy = 0;specificEnemy < enemy.length; specificEnemy++){
                if (collision(squaresPlayer,enemy[specificEnemy],1) && playing){
                } else {
                    squaresPlayer = {
                        x:730,
                        y:600,
                        dx:0,
                        dy:0,
                        size:20,
                        jumping:false
                    }
                }
            }
//             if (squaresPlayer.x > finish.x && squaresPlayer.x + squaresPlayer.size < finish.x + finish.size && squaresPlayer.y > finish.y && squaresPlayer.y + squaresPlayer.size < finish.y + finish.size + 1 && playing){
//                 playing = false;
//             }
        } else if (localStorage.getItem('game') == 2){
            if (controller.secondaryUp){
                pongLeftPlayer.dy -= 2.3;
            }
            if (controller.secondaryDown){
                pongLeftPlayer.dy += 2.3;
            }
            if (pongAI === false){
                if (controller.up){
                    pongRightPlayer.dy -= 2.3;
                }
                if (controller.down){
                    pongRightPlayer.dy += 2.3;
                }
            } else{
                AIPlayer();
            }
            pongLeftPlayer.y += pongLeftPlayer.dy;
            pongLeftPlayer.dy *= .8;
            pongRightPlayer.y += pongRightPlayer.dy;
            pongRightPlayer.dy *= .8;
            pongBall.y += pongBall.dy;
            pongBall.x += pongBall.dx;
            if (pongLeftPlayer.y + pongLeftPlayer.size*10 > gameHeight){
                pongLeftPlayer.y = gameHeight - pongLeftPlayer.size*10;
                pongLeftPlayer.dy *= -.2;
            }
            if (pongLeftPlayer.y < 0){
                pongLeftPlayer.y = 0;
                pongLeftPlayer.dy *= -.2;
            }
            if (pongRightPlayer.y + pongRightPlayer.size*10 > gameHeight){
                pongRightPlayer.y = gameHeight - pongRightPlayer.size*10;
                pongRightPlayer.dy *= -.2;
            }
            if (pongRightPlayer.y < 0){
                pongRightPlayer.y = 0;
                pongRightPlayer.dy *= -1;
            }
            if (pongBall.y + pongBall.size > gameHeight){
                pongBall.y = pongBall.y - pongBall.size;
                pongBall.dy *= -1;
            }
            if (pongBall.y < 0){
                pongBall.y = 0;
                pongBall.dy *= -1;
            }
            if (pongBall.x < 50){
                pongBall.x = gameWidth/2 - 5;
                pongBall.y = gameHeight/2 - 5;
                pongBall.dy = Math.random() * (3 - 2) + 2;
                pongBall.dx = 1;
            }
            if (pongBall.x > gameWidth - 50){
                pongBall.x = gameWidth/2 - 5;
                pongBall.y = gameHeight/2 - 5;
                pongBall.dy = Math.random() * (3 - 2) + 2;
                pongBall.dx = -1;
            }
            if (collision(pongLeftPlayer,pongBall,10)){
            } else{
                pongBall.x = pongLeftPlayer.x + pongLeftPlayer.size + 1;
                pongBall.dx *= -1.1;
                pongRacketSound.play();
            }
            if (collision(pongRightPlayer,pongBall,10)){
            } else{
                pongBall.x = pongRightPlayer.x - pongBall.size - 1;
                pongBall.dx *= -1.1;
                pongRacketSound.play();
            }
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
            gameContext.fillStyle ='yellow';
            gameContext.fillRect(pongLeftPlayer.x, pongLeftPlayer.y, pongLeftPlayer.size, pongLeftPlayer.size*10);
            gameContext.fillRect(pongRightPlayer.x, pongRightPlayer.y, pongRightPlayer.size, pongRightPlayer.size*10);
            gameContext.fillRect(pongBall.x, pongBall.y, pongBall.size, pongBall.size);
        } else if (localStorage.getItem('game') == 3) {
            if (pacman.x == 500 && pacman.y == 252.5){
                pacman.collideDown = true;
            }
            if (controller.up && pacman.direction != 'up' || pacman.nextDirection == 'up'){
                if (pacman.collideTop == false){
                    pacman.dx = 0;
                    pacman.dy = 0;
                    pacman.dy -= 2;
                    pacman.direction = 'up';
                    pacman.nextDirection = 'none';
                    pacman.lastDirection = 'none';
                } else if (pacman.collideTop){
                    pacman.nextDirection = 'up';
                }
            }
            if (controller.down && pacman.direction != 'down' || pacman.nextDirection == 'down'){
                if (pacman.collideDown == false){
                    pacman.dx = 0;
                    pacman.dy = 0;
                    pacman.dy += 2;
                    pacman.direction = 'down';
                    pacman.nextDirection = 'none';
                    pacman.lastDirection = 'none';
                } else if (pacman.collideDown){
                    pacman.nextDirection = 'down';
                }
            }
            if (controller.left && pacman.direction != 'left' || pacman.nextDirection == 'left'){
                if (pacman.collideLeft == false){
                    pacman.dx = 0;
                    pacman.dy = 0;
                    pacman.dx -= 2;
                    pacman.direction = 'left';
                    pacman.nextDirection = 'none';
                    pacman.lastDirection = 'none';
                } else if (pacman.collideLeft){
                    pacman.nextDirection = 'left';
                }
            }
            if (controller.right && pacman.direction != 'right' || pacman.nextDirection == 'right'){
                if (pacman.collideRight == false){
                    pacman.dx = 0;
                    pacman.dy = 0;
                    pacman.dx += 2;
                    pacman.direction = 'right';
                    pacman.nextDirection = 'none';
                    pacman.lastDirection = 'none';
                } else if (pacman.collideRight){
                    pacman.nextDirection = 'right';
                }
            }
            if (pacman.x < 220 && pacman.y == 312.5){
                pacman.x = 769;
            }
            if (pacman.x > 770 && pacman.y == 312.5){
                pacman.x = 221;
            }
            pacman.x += pacman.dx;
            pacman.y += pacman.dy;
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
        
            if (boundariesValuesGiven == false){
                //OUTER WALLS
        
                //ceiling
                boundariesAssignValues(195,37.5,610,'horizontal');
                //floor
                boundariesAssignValues(195,637.5,610,'horizontal');
                //upper right
                boundariesAssignValues(795,37.5,190,'vertical');
                //upper left
                boundariesAssignValues(195,37.5,190,'vertical');
                //lower right
                boundariesAssignValues(795,397.5,250,'vertical');
                //lower left
                boundariesAssignValues(195,397.5,250,'vertical');
        
                //UPPER BOUNDARIES
        
                //outer upper right
                boundariesAssignValues(675,97.5,70,'horizontal');
                boundariesAssignValues(675,97.5,10,'vertical');
                boundariesAssignValues(735,97.5,10,'vertical');
                //outer upper left
                boundariesAssignValues(255,97.5,70,'horizontal');
                boundariesAssignValues(255,97.5,10,'vertical');
                boundariesAssignValues(315,97.5,10,'vertical');
                //middle upper right
                boundariesAssignValues(555,97.5,70,'horizontal');
                boundariesAssignValues(555,97.5,10,'vertical');
                boundariesAssignValues(615,97.5,10,'vertical');
                //middle upper left
                boundariesAssignValues(375,97.5,70,'horizontal');
                boundariesAssignValues(375,97.5,10,'vertical');
                boundariesAssignValues(435,97.5,10,'vertical');
                //center upper nubbin
                boundariesAssignValues(495,47.5,60,'vertical');
                boundariesAssignValues(495,97.5,10,'horizontal');
                //center lower
                boundariesAssignValues(555,157.5,10,'vertical');
                boundariesAssignValues(435,157.5,130,'horizontal');
                boundariesAssignValues(435,157.5,10,'vertical');
                boundariesAssignValues(495,168.5,58.5,'vertical');
                boundariesAssignValues(495,217.5,10,'horizontal');
                //outer lower right
                boundariesAssignValues(675,157.5,70,'horizontal');
                boundariesAssignValues(675,157.5,10,'vertical');
                boundariesAssignValues(735,157.5,10,'vertical');
                //outer lower left
                boundariesAssignValues(255,157.5,70,'horizontal');
                boundariesAssignValues(255,157.5,10,'vertical');
                boundariesAssignValues(315,157.5,10,'vertical');
        
                //MIDDLE BOUNDARIES
        
                //upper tunnel right
                boundariesAssignValues(675,217.5,130,'horizontal');
                boundariesAssignValues(675,217.5,70,'vertical');
                boundariesAssignValues(675,277.5,130,'horizontal');
                //upper tunnel left
                boundariesAssignValues(195,217.5,130,'horizontal');
                boundariesAssignValues(315,217.5,70,'vertical');
                boundariesAssignValues(195,277.5,130,'horizontal');
                //lower tunnel right
                boundariesAssignValues(675,397.5,130,'horizontal');
                boundariesAssignValues(675,337.5,70,'vertical');
                boundariesAssignValues(675,337.5,130,'horizontal');
                //lower tunnel left
                boundariesAssignValues(195,397.5,130,'horizontal');
                boundariesAssignValues(315,337.5,70,'vertical');
                boundariesAssignValues(195,337.5,130,'horizontal');
                //middle upper right
                boundariesAssignValues(615,157.5,130,'vertical');
                boundariesAssignValues(615,157.5,10,'horizontal');
                boundariesAssignValues(615,277.5,10,'horizontal');
                boundariesAssignValues(555,217.5,70,'horizontal');
                boundariesAssignValues(555,217.5,10,'vertical');
                //middle upper left
                boundariesAssignValues(375,157.5,130,'vertical');
                boundariesAssignValues(375,157.5,10,'horizontal');
                boundariesAssignValues(375,277.5,10,'horizontal');
                boundariesAssignValues(375,217.5,70,'horizontal');
                boundariesAssignValues(435,217.5,10,'vertical');
                //middle lower right
                boundariesAssignValues(615,337.5,70,'vertical');
                boundariesAssignValues(615,337.5,10,'horizontal');
                boundariesAssignValues(615,397.5,10,'horizontal');
                //middle lower left
                boundariesAssignValues(375,337.5,70,'vertical');
                boundariesAssignValues(375,337.5,10,'horizontal');
                boundariesAssignValues(375,397.5,10,'horizontal');
                //ghost house
                boundariesAssignValues(435,277.5,40,'horizontal');
                boundariesAssignValues(465,277.5,10,'vertical');
                boundariesAssignValues(525,277.5,10,'vertical');
                boundariesAssignValues(525,277.5,40,'horizontal');
                boundariesAssignValues(555,277.5,70,'vertical');
                boundariesAssignValues(435,337.5,130,'horizontal');
                boundariesAssignValues(435,277.5,70,'vertical');
        
                //LOWER BOUNDARIES
        
                //center upper
                boundariesAssignValues(555,397.5,10,'vertical');
                boundariesAssignValues(435,397.5,130,'horizontal');
                boundariesAssignValues(435,397.5,10,'vertical');
                boundariesAssignValues(495,408.5,58.5,'vertical');
                boundariesAssignValues(495,457.5,10,'horizontal');
                //center lower
                boundariesAssignValues(555,517.5,10,'vertical');
                boundariesAssignValues(435,517.5,130,'horizontal');
                boundariesAssignValues(435,517.5,10,'vertical');
                boundariesAssignValues(495,528.5,58.5,'vertical');
                boundariesAssignValues(495,577.5,10,'horizontal');
                //middle upper right
                boundariesAssignValues(555,457.5,70,'horizontal');
                boundariesAssignValues(615,457.5,10,'vertical');
                boundariesAssignValues(555,457.5,10,'vertical');
                //middle upper left
                boundariesAssignValues(375,457.5,70,'horizontal');
                boundariesAssignValues(435,457.5,10,'vertical');
                boundariesAssignValues(375,457.5,10,'vertical');
                //outer upper right
                boundariesAssignValues(675,457.5,70,'horizontal');
                boundariesAssignValues(735,457.5,10,'vertical');
                boundariesAssignValues(675,457.5,70,'vertical');
                boundariesAssignValues(675,517.5,10,'horizontal');
                //outer upper left
                boundariesAssignValues(255,457.5,70,'horizontal');
                boundariesAssignValues(255,457.5,10,'vertical');
                boundariesAssignValues(315,457.5,70,'vertical');
                boundariesAssignValues(315,517.5,10,'horizontal');
                //outer nubbin right
                boundariesAssignValues(735,517.5,60,'horizontal');
                boundariesAssignValues(735,517.5,10,'vertical');
                //outer nubbin left
                boundariesAssignValues(205,517.5,60,'horizontal');
                boundariesAssignValues(255,517.5,10,'vertical');
                //outer lower right
                boundariesAssignValues(555,577.5,10,'vertical');
                boundariesAssignValues(555,577.5,190,'horizontal');
                boundariesAssignValues(735,577.5,10,'vertical');
                boundariesAssignValues(615,517.5,60,'vertical');
                boundariesAssignValues(615,517.5,10,'horizontal');
                //outer lower left
                boundariesAssignValues(255,577.5,10,'vertical');
                boundariesAssignValues(255,577.5,190,'horizontal');
                boundariesAssignValues(435,577.5,10,'vertical');
                boundariesAssignValues(375,517.5,60,'vertical');
                boundariesAssignValues(375,517.5,10,'horizontal');
                boundariesValuesGiven = true;
            }
            for (let boundary = 0;boundary < boundaryTracker.length;boundary++) {
                boundariesCreate(boundaryTracker[boundary]);
            }
            gameContext.fillStyle = 'white';
            pacFoodcreator();
            for(let pacFoodCollision = 0;pacFoodCollision < pacFoodTracker.length;pacFoodCollision++){
                if(!(collision(pacman,pacFoodTracker[pacFoodCollision],1))){
        //             if (pacFoodTracker[pacFoodCollision].alive == true){
        //                 wakaLoop++;
        //                 pacFoodTracker[pacFoodCollision].alive = false;
        //
        //             }
                    wakaLoop++;
                    pacFoodTracker.splice(pacFoodCollision,1);
                    score ++;
                    if (pacFoodRealCount != 1){
                        pacFoodRealCount--;
                    } else if (pacFoodRealCount == 0) {
                        gameOver = true;
                    }
                }
            }
            soundPlayer();
            gameContext.strokeStyle = 'yellow';
            gameContext.beginPath();
            if (mouthMover <= 10){
                if (pacman.direction == 'up' || pacman.lastDirection == 'up'){
                    gameContext.arc(pacman.x, pacman.y, pacman.size, -1, 1.3 * Math.PI);
                    gameContext.lineTo(pacman.x, pacman.y);
                } else if (pacman.direction == 'right' || pacman.lastDirection == 'right'){
                    gameContext.arc(pacman.x, pacman.y, pacman.size, .7, 1.85 * Math.PI);
                    gameContext.lineTo(pacman.x, pacman.y);
                } else if (pacman.direction == 'down' || pacman.lastDirection == 'down'){
                    gameContext.arc(pacman.x, pacman.y, pacman.size, -4.1, -1.7 * Math.PI);
                    gameContext.lineTo(pacman.x, pacman.y);
                } else if (pacman.direction == 'left' || pacman.lastDirection == 'left'){
                    gameContext.arc(pacman.x, pacman.y, pacman.size, -2.7, .8 * Math.PI);
                    gameContext.lineTo(pacman.x, pacman.y);
                }
            } else if (mouthMover > 5){
                gameContext.arc(pacman.x, pacman.y, pacman.size, 0, 2 * Math.PI);
            }
            mouthMover += 1;
            if (mouthMover > 20){
                mouthMover = 0;
            }
        
            gameContext.fillStyle = 'yellow';
            gameContext.fill();
            gameContext.stroke();
            if (ghostsCreated == false) {
                ghostMaker();
                ghostsCreated = true;
            }for (let ghost = 0;ghost < ghostTracker.length;ghost++) {
                ghostCreator(ghostTracker[ghost]);
            }
            boundaryCollision(pacman);
            for(let ghostCount = 0;ghostCount<4;ghostCount++){
                boundaryCollision(ghostTracker[ghostCount]);
                if (ghostTracker[ghostCount].x == 500 && ghostTracker[ghostCount].y == 252.5){
                    ghostTracker[ghostCount].collideDown = true;
                }
                if (ghostTracker[ghostCount].x == 500 && ghostTracker[ghostCount].y == 312.5){
                    ghostTracker[ghostCount].direction = 'up';
                }
                if (ghostTracker[ghostCount].collideTop == false && (ghostTracker[ghostCount].direction == 'up' || ghostTracker[ghostCount].nextDirection == 'up')){
                    ghostTracker[ghostCount].dx = 0;
                    ghostTracker[ghostCount].dy = 0;
                    ghostTracker[ghostCount].dy -= 2.5;
                    ghostTracker[ghostCount].leftEyeX = 5;
                    ghostTracker[ghostCount].leftEyeY = 5;
                    ghostTracker[ghostCount].rightEyeX = 5;
                    ghostTracker[ghostCount].rightEyeY = 5;
                    if (ghostTracker[ghostCount].nextDirection == 'down') {
                        ghostTracker[ghostCount].nextDirection = 'none';
                    }
                    ghostTracker[ghostCount].directionChangeGrace = 0;
                } else if (ghostTracker[ghostCount].collideRight == false && (ghostTracker[ghostCount].direction == 'right' || ghostTracker[ghostCount].nextDirection == 'right')){
                    ghostTracker[ghostCount].dx = 0;
                    ghostTracker[ghostCount].dy = 0;
                    ghostTracker[ghostCount].dx += 2.5;
                    ghostTracker[ghostCount].leftEyeX = 2;
                    ghostTracker[ghostCount].leftEyeY = 2.5;
                    ghostTracker[ghostCount].rightEyeX = 8;
                    ghostTracker[ghostCount].rightEyeY = 2.5;
                    if (ghostTracker[ghostCount].nextDirection == 'left') {
                        ghostTracker[ghostCount].nextDirection = 'none';
                    }
                    ghostTracker[ghostCount].directionChangeGrace = 0;
                } else if (ghostTracker[ghostCount].collideDown == false && (ghostTracker[ghostCount].direction == 'down' || ghostTracker[ghostCount].nextDirection == 'down')){
                    ghostTracker[ghostCount].dx = 0;
                    ghostTracker[ghostCount].dy = 0;
                    ghostTracker[ghostCount].dy += 2.5;
                    ghostTracker[ghostCount].leftEyeX = 5;
                    ghostTracker[ghostCount].leftEyeY = 0;
                    ghostTracker[ghostCount].rightEyeX = 5;
                    ghostTracker[ghostCount].rightEyeY = 0;
                    if (ghostTracker[ghostCount].nextDirection == 'up') {
                        ghostTracker[ghostCount].nextDirection = 'none';
                    }
                    ghostTracker[ghostCount].directionChangeGrace = 0;
                } else if (ghostTracker[ghostCount].collideLeft == false && (ghostTracker[ghostCount].direction == 'left' || ghostTracker[ghostCount].nextDirection == 'left')){
                    ghostTracker[ghostCount].dx = 0;
                    ghostTracker[ghostCount].dy = 0;
                    ghostTracker[ghostCount].dx -= 2.5;
                    ghostTracker[ghostCount].leftEyeX = 8;
                    ghostTracker[ghostCount].leftEyeY = 2.5;
                    ghostTracker[ghostCount].rightEyeX = 2;
                    ghostTracker[ghostCount].rightEyeY = 2.5;
                    if (ghostTracker[ghostCount].nextDirection == 'right') {
                        ghostTracker[ghostCount].nextDirection = 'none';
                    }
                    ghostTracker[ghostCount].directionChangeGrace = 0;
                }
                // if (ghostTracker[ghostCount].directionChangeGrace < 20){
                //     ghostTracker[ghostCount].directionChangeGrace++;
                // }
                if (ghostTracker[ghostCount].direction == 'none'){
                    ghostDirectionChanger(ghostTracker[ghostCount]);
                    ghostNextDirectionMaker(ghostTracker[ghostCount]);
                }
                ghostTracker[ghostCount].x += ghostTracker[ghostCount].dx;
                ghostTracker[ghostCount].y += ghostTracker[ghostCount].dy;
                if (ghostTracker[ghostCount].x < 220 && ghostTracker[ghostCount].y == 312.5){
                ghostTracker[ghostCount].x = 769;
                }
                if (ghostTracker[ghostCount].x > 770 && ghostTracker[ghostCount].y == 312.5){
                    ghostTracker[ghostCount].x = 221;
                }
                if (pacmanCollision(pacman,ghostTracker[ghostCount])){
                } else{
                    gameOver = true;
                }
            }
            gameContext.fillStyle ='black';
            gameContext.fillRect(195,288.5,50,48);
            gameContext.fillRect(745,288.5,50,48);
        }
        if (gameOver === false){
                window.requestAnimationFrame(gamePlayer);
        }
    }
}
window.requestAnimationFrame(gamePlayer);
window.addEventListener('keydown',controller.keyListener);
window.addEventListener('keyup',controller.keyListener);