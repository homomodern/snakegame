import {drawFood, genFood} from './food.js'
import {move as moveSnake, drawSnake, hasEatenFood, snake, createSnake} from './snake.js'
import {changeDirection, dx, dy, initSpeed} from './input.js'

const boardBorder = 'black'
const boardBackground = 'lightgrey'
let score = 0

export const snakeBoard = document.querySelector('#snakeboard')
export const snakeBoardCtx = snakeBoard.getContext('2d')

const startButton = document.querySelector('.start')
startButton.addEventListener('click', startGame)

document.addEventListener('keydown', changeDirection)

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
  score = 0
  document.querySelector('#score').innerHTML = score
  const menu = document.querySelector('.menu')
  menu.classList.toggle('offscreen')

  createSnake()
  initSpeed()
  genFood()
  main()
}

function hasGameEnded () {
  const head = snake[0]
  const hitItself = (part, index) => {
    if (index === 0) return false // Ignore head
    return part.x === head.x && part.y === head.y
  }
  const hitLeftWall = snake[0].x < 0
  const hitRightWall = snake[0].x > snakeBoard.width - 10
  const hitTopWall = snake[0].y < 0
  const hitBottomWall = snake[0].y > snakeBoard.height - 10
  return snake.some(hitItself) || hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function gameOver() {
  const menu = document.querySelector('.menu')
  menu.classList.toggle('offscreen')
}

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

function tryToGrow () {
  const tail = {
    x: snake[snake.length -1].x + dx,
    y: snake[snake.length -1].y + dy
  }
  
  if (hasEatenFood()) {
    snake.push(tail)
    score += 10
    document.getElementById('score').innerHTML = score
    genFood(snakeBoard, snake)
  }
}
