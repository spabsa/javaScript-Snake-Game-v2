//grab the canvas/set its context/create the snake and its size
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
let score = 0;
let moveLocked = false; // lock the direction of the snake until it has moved one unit
const unit = 16; 
let food = {x: 0, y: 0}
const snake = [
    {
    //set the snakes starting position in the middle of the canvas
    x: cvs.width/2 - 8,
    y: cvs.height/2 - 8
    }
];
drawSnake("limegreen"); 

let startGame = setInterval(runGame, 70);
getFood();

let direction;
function runGame() {
    //grab user input
    document.addEventListener('keydown', (event) => {
        if(event.keyCode == 37 && moveLocked == false && direction != 'right') direction = "left";
        else if(event.keyCode == 38 &&  moveLocked == false && direction != 'down') direction = "up";
        else if(event.keyCode == 39 && moveLocked == false && direction != 'left') direction = "right";
        else if(event.keyCode == 40 && moveLocked == false && direction != 'up') direction = "down";
        moveLocked = true; // lock the direction of the snake
    });

    //grab the the next snake head position
    let newHeadX = snake[0].x;
    let newHeadY = snake[0].y;

    //move the snake
    switch(direction) {
        case "left":
            newHeadX -= unit; // Grab the next possible position
            if(checkForCollision(newHeadX, newHeadY)) { // check to see if the new head will collide
                endGame();
                break; 
            }    
            drawSnake('#858585'); //undraw the snake
            snake.unshift({x: newHeadX, y: newHeadY}); // add the new head
            snake.pop(); // remove the tail
            drawSnake('limegreen'); //draw the snake
            moveLocked = false; // unlock direction
            break;
        case "right":
            newHeadX += unit;
            if(checkForCollision(newHeadX, newHeadY)) {
                endGame();
                break;
            }     
            drawSnake('#858585');
            snake.unshift({x: newHeadX, y: newHeadY});
            snake.pop();
            drawSnake('limegreen');
            moveLocked = false;
            break;
        case "up":
            newHeadY -= unit;
            if(checkForCollision(newHeadX, newHeadY)) {
                endGame();
                break; 
            }    
            drawSnake('#858585');
            snake.unshift({x: newHeadX, y: newHeadY});
            snake.pop();
            drawSnake('limegreen');
            moveLocked = false;
            break;
        case "down":
            newHeadY += unit;
            if(checkForCollision(newHeadX, newHeadY)) {
                endGame();
                break; 
            }    
            drawSnake('#858585');
            snake.unshift({x: newHeadX, y: newHeadY});
            snake.pop();
            drawSnake('limegreen');
            moveLocked = false;
            break;         
    }

    //check to see if snake has eaten 
    if(food.x == snake[0].x && food.y == snake[0].y) {
        for(let i = 0; i < 3; i++) {
            snake.unshift({x: newHeadX, y: newHeadY});// add 3 new heads
        }
        score++;//increase the score
        document.querySelector('.score').innerHTML = score;
        getFood();// generate new food
    }
}

//--------------------HELPER FUNCTIONS----------------------//


function drawSnake(color) {
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = color;
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit, color);
    }
}

function getFood() {
    food.x = Math.floor(Math.random() * cvs.width/unit) * unit;
    food.y = Math.floor(Math.random() * cvs.height/unit) * unit;
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, unit, unit);
    //make sure food doesn't spawn inside of the snake
    for(let i = 0; i < snake.length; i++) {
        if(food.x == snake[i].x && food.y == snake[i].y) getFood();
    }
    
}

function checkForCollision(newHeadX, newHeadY) {
    //check the new head position to see if its collided
    if(newHeadX < 0 || newHeadX >= cvs.width ||
       newHeadY < 0 || newHeadY >= cvs.height) {
           return true;
    }    
    //check to see if the snake has collided with itself
    for(let i = 0; i < snake.length; i++) {
        if(newHeadX == snake[i].x && newHeadY == snake[i].y) return true
    }
    return false
}















































































































