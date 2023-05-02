import {drawFood, genFood, foodX, foodY} from './food.js'
import {move as moveSnake, drawSnakePart, hasEatenFood, createSnake} from './snake.js'
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

function main (snake) {
  if (hasGameEnded(snake, snakeBoard)) {
    endGame()
    return
  }

  setTimeout(function onTick () {
    clearCanvas()
    drawFood(snakeBoardCtx)

    if (hasEatenFood(snake, foodX, foodY)) {
      console.log('Eaten')
      const tail = {
        x: snake[snake.length -1].x + dx,
        y: snake[snake.length -1].y + dy
      }
      snake.push(tail)
      score += 10
      document.getElementById('score').innerHTML = score
      genFood(snake, snakeBoard)
    }
    
    main(
      moveSnake(snake, dx, dy)
      .map(part => drawSnakePart(part, snakeBoardCtx))
    )
  }, 100)
}

function startGame () {
  score = 0
  document.querySelector('#score').innerHTML = score
  const menu = document.querySelector('.menu')
  menu.classList.toggle('offscreen')

  //createSnake()
  initSpeed()
  //enFood(snake)
  main(genFood(createSnake(), snakeBoard))
}

function hasGameEnded (snake, field) {
  const head = snake[0]
  // logic AND for 0 index to ignore head
  const hitItself = (part, index) => index && part.x === head.x && part.y === head.y
  const hitTheWall = head.x < 0 || head.x > field.width - 10 || head.y < 0 || head.y > field.height - 10
  return snake.some(hitItself) || hitTheWall
}

function endGame() {
  document.querySelector('.menu').classList.toggle('offscreen')
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
