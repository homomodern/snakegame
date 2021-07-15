'use strict'

const boardBorder = 'black'
const boardBackground = 'lightgrey'
const snakeColor = 'lightgreen'
const snakeBorder = 'darkblue'

// const newSnake = {
//   body: [
//     { x: 200, y: 200 },
//     { x: 190, y: 200 },
//     { x: 180, y: 200 },
//     { x: 170, y: 200 },
//     { x: 160, y: 200 }
//   ],
//   get head () { return this.body[0] },
//   get tail () { return this.body[this.body.length - 1]}
// }

let snake = []

let score = 0
// True if changing direction
// let changing_direction = false;
// Horizontal velocity
let foodX
let foodY

// Horizontal velocity
let dx
// Vertical velocity
let dy

// Get the canvas element
const snakeBoard = document.querySelector('#snakeboard')
// Return a two dimensional drawing context
const snakeBoardCtx = snakeBoard.getContext('2d')

document.addEventListener('keydown', changeDirection)

const startButton = document.querySelector('.start')

startButton.addEventListener('click', startGame)

clearCanvas()

function main () {
  if (hasGameEnded()) {
    gameOver()
    return
  }

  setTimeout(function onTick () {
    clearCanvas()
    drawFood()
    moveSnake()
    drawSnake()
    tryToGrow()
    //console.log(snake.length)
    main()
  }, 100)
}

function startGame () {
  const snakeDefault = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
  ]
  snake = [...snakeDefault]
  dx = 10
  dy = 0
  score = 0
  document.querySelector('#score').innerHTML = score
  const menu = document.querySelector('.menu')
  menu.classList.toggle('offscreen')

  genFood()
  main()
}

function hasGameEnded () {
  const head = snake[0]
  const hitItself = (part, index) => {
    if (index === 0) return false // Ignore head
    return part.x === head.x && part.y === head.y
  }
  if ( snake.some(hitItself) ) return true

  const hitLeftWall = snake[0].x < 0
  const hitRightWall = snake[0].x > snakeBoard.width - 10
  const hitToptWall = snake[0].y < 0
  const hitBottomWall = snake[0].y > snakeBoard.height - 10
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function gameOver() {
  const menu = document.querySelector('.menu')
  menu.classList.toggle('offscreen')
}

// draw a border around the canvas
function clearCanvas () {
  //  Select the colour to fill the drawing
  snakeBoardCtx.fillStyle = boardBackground
  //  Select the colour for the border of the canvas
  snakeBoardCtx.strokestyle = boardBorder
  // Draw a "filled" rectangle to cover the entire canvas
  snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height)
  // Draw a "border" around the entire canvas
  snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height)
}

function drawFood () {
  snakeBoardCtx.fillStyle = 'lightgreen'
  snakeBoardCtx.strokestyle = 'darkgreen'
  snakeBoardCtx.fillRect(foodX, foodY, 10, 10)
  snakeBoardCtx.strokeRect(foodX, foodY, 10, 10)
}

function randomFood (min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10
}

function genFood () {
  // Generate a random number the food x-coordinate
  foodX = randomFood(0, snakeBoard.width - 10)
  // Generate a random number for the food y-coordinate
  foodY = randomFood(0, snakeBoard.height - 10)
  // if the new food location is where the snake currently is, generate a new food location
  const hasOverlappedFood = (part) => part.x === foodX && part.y === foodY
  if (snake.some(hasOverlappedFood)) genFood()
}

function moveSnake () {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  // Add the new head to the beginning of snake body
  snake.unshift(head)
  snake.pop()
}

// Draw the snake on the canvas
function drawSnake () {
  // Draw each part
  snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart (snakePart) {
  // Set the colour of the snake part
  snakeBoardCtx.fillStyle = snakeColor
  // Set the border colour of the snake part
  snakeBoardCtx.strokestyle = snakeBorder
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
  // Draw a border around the snake part
  snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
}

function hasEatenFood () {
  return snake[0].x === foodX && snake[0].y === foodY
}

function tryToGrow () {
  const tail = {
    x: snake[snake.length -1].x + dx,
    y: snake[snake.length -1].y + dy
  }

  if (hasEatenFood()) {
    snake.push(tail)
    // Increase score
    score += 10
    // Display score on screen
    document.getElementById('score').innerHTML = score
    // Generate new food location
    genFood()
  }
}

function changeDirection (event) {
  // Prevent the snake from reversing

  // if (changing_direction) return
  //  changing_direction = true
  const keydown = event.code
  const goingUp = dy === -10
  const goingDown = dy === 10
  const goingRight = dx === 10
  const goingLeft = dx === -10
  if (keydown === 'ArrowLeft' && !goingRight) {
    dx = -10
    dy = 0
  }
  if (keydown === 'ArrowUp' && !goingDown) {
    dx = 0
    dy = -10
  }
  if (keydown === 'ArrowRight' && !goingLeft) {
    dx = 10
    dy = 0
  }
  if (keydown === 'ArrowDown' && !goingUp) {
    dx = 0
    dy = 10
  }
}
