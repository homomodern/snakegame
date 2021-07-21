import {snakeBoardCtx} from './master.js'
import {foodX, foodY} from './food.js'
import {dx, dy} from './input.js'

export let snake
const snakeColor = 'lightgreen'
const snakeBorder = 'darkblue'

export function createSnake() {
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
  ]
}

export function move () {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  // Add the new head to the beginning of snake body
  snake.unshift(head)
  snake.pop()
}

export function drawSnake () {
  snake.forEach(drawSnakePart)
}

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

export function hasEatenFood () {
  return snake[0].x === foodX && snake[0].y === foodY
}

// export function tryToGrow () {
//   const tail = {
//     x: snake[snake.length -1].x + dx,
//     y: snake[snake.length -1].y + dy
//   }
//
//   if (hasEatenFood()) {
//     snake.push(tail)
//     // Increase score
//     score += 10
//     // Display score on screen
//     document.getElementById('score').innerHTML = score
//     // Generate new food location
//     genFood()
//   }
// }
