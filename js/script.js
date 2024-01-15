//1 - Define HTML elements
const board = document.querySelector(".game-board");
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

//3 - Define game variables
let gridSize = 20;
let snake = [{x: 10, y: 10}];
let foodPosition = generateFoodPosition();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


//2 - Draw game map, snake, food
function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// * - Draw snake
function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });                                                                                                                                                             
}
// * - Draw food
function drawFood(){
    if(gameStarted){
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, foodPosition);
        board.appendChild(foodElement);
    }else{
        
    }
    
}
// * - Generate food position
function generateFoodPosition(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x: x, y: y};
}

// * - Create element (snake, food, cube/div)
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// * - Set the position of the snake or food
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//4 - Generate snake movement
function move(){
    const head = {...snake[0]};
    switch (direction) {
        case 'up':
            head.y --;
            break;

        case 'down':
            head.y ++;
            break;

        case 'left':
            head.x --;
            break;

        case 'right':
            head.x ++;
            break;
    }
    
    snake.unshift(head);
    //snake.pop();

    if(head.x === foodPosition.x && head.y === foodPosition.y){
        foodPosition = generateFoodPosition();
        clearInterval(gameInterval); //Clear past interval
        gameInterval = setInterval(()=>{
            move();
            checkColision();
            draw();
        }, gameSpeedDelay);
        increaseSpeed();
    }else{
        snake.pop();
    }
}

//5 - Start the game 
function startGame(){
    
    gameStarted = true;
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(()=>{
        move();
        checkColision();
        draw();
    }, gameSpeedDelay);
}

//6 - Keypress listener
function handleKeyPress(event){
    
   
    
        if((!gameStarted && event.code === 'Space') || 
        (!gameStarted && event.key === ' ')){
            
            startGame();
            
        }
        else{
            switch (event.key) {
                case 'ArrowUp':
                    direction = 'up';
                    break;
                case 'ArrowDown':
                    direction = 'down';
                    break;
                case 'ArrowLeft':
                    direction = 'left';
                    break;
                case 'ArrowRight':
                    direction = 'right';
                    break;
            }
        }
    
   
}

//7 - Increase speed if eat food
function increaseSpeed(){
    console.log(gameSpeedDelay);
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5;
    }else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    }
    else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 3;
    }
    else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 3;
    }
}

//8 - Implement colision
function checkColision(){
    const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

//9 - Reset game function
function resetGame(){
    
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    foodPosition = generateFoodPosition();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

//10 - Update score
function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

//11 - Stop Game
function stopGame(){
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';

}

//12 - Update High Score
function updateHighScore(){
    const currentScore = snake.length - 1;
    if(currentScore > highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0')
    }
    highScoreText.style.display = 'block';
}

document.addEventListener('keydown', handleKeyPress);
