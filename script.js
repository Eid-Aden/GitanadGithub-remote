let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rows = 50;
let cols = 20;
let snake = [
  {
    x: 19,
    y: 3,
  },
];

let food;

let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let foodCollected = false;

placeFood();

setInterval(gameLoop, 200);
document.addEventListener('keydown', keyDown);

draw();

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  snake.forEach((part) => add(part.x, part.y));

  ctx.fillStyle = 'yellow';
  add(food.x, food.y); // Food

  requestAnimationFrame(draw);
}

function testGameOver() {
  let firstPart = snake[0];
  let otherParts = snake.slice(1);
  let duplicatePart = otherParts.find((part) => part.x == firstPart.x && part.y == firstPart.y);

  // 1. Schlange läuft gegen die Wand
  if (snake[0].x < 0 || snake[0].x > cols - 1 || snake[0].y < 0 || snake[0].y > rows - 1 || duplicatePart) {
    placeFood();
    snake = [
      {
        x: 19,
        y: 3,
      },
    ];
    direction = 'LEFT';
  }
}

function placeFood() {
  let randomX = Math.floor(Math.random() * cols);
  let randomY = Math.floor(Math.random() * rows);

  food = {
    x: randomX,
    y: randomY,
  };
}

function add(x, y) {
  ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

function shiftSnake() {
  for (let i = snake.length - 1; i > 0; i--) {
    const part = snake[i];
    const lastPart = snake[i - 1];
    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}

function gameLoop() {
  testGameOver();
  if (foodCollected) {
    snake = [
      {
        x: snake[0].x,
        y: snake[0].y,
      },
      ...snake,
    ];

    foodCollected = false;
  }

  shiftSnake();

  if (direction == 'LEFT') {
    snake[0].x--;
  }

  if (direction == 'RIGHT') {
    snake[0].x++;
  }

  if (direction == 'UP') {
    snake[0].y--;
  }

  if (direction == 'DOWN') {
    snake[0].y++;
  }

  if (snake[0].x == food.x && snake[0].y == food.y) {
    foodCollected = true;

    placeFood();
  }
}

function keyDown(e) {
  if (e.keyCode == 37) {
    direction = 'LEFT';
  }
  if (e.keyCode == 38) {
    direction = 'UP';
  }
  if (e.keyCode == 39) {
    direction = 'RIGHT';
  }
  if (e.keyCode == 40) {
    direction = 'DOWN';
  }
}
let numberCounter = 50;

for (let i = 0; i < numberCounter; i++) {
  console.log(i);
}
