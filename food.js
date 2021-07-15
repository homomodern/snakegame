//import {snake} from './master.js'

let foodX
let foodY

export function hasEatenFood (snake) {
  return snake[0].x === foodX && snake[0].y === foodY
}

export function drawFood (boardCtx) {
  boardCtx.fillStyle = 'lightgreen'
  boardCtx.strokestyle = 'darkgreen'
  boardCtx.fillRect(foodX, foodY, 10, 10)
  boardCtx.strokeRect(foodX, foodY, 10, 10)
}

export function genFood (board, snake) {
  // Generate a random number the food x-coordinate
  foodX = randomFood(0, board.width - 10)
  // Generate a random number for the food y-coordinate
  foodY = randomFood(0, board.height - 10)
  // if the new food location is where the snake currently is, generate a new food location
  const hasOverlappedFood = (part) => part.x === foodX && part.y === foodY
  if (snake.some(hasOverlappedFood)) genFood()
}

export function randomFood (min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10
}
