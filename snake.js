const snakeColor = 'lightgreen'
const snakeBorder = 'darkblue'

export const createSnake = () => [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

export function move (snake, dx, dy) {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  // Add the new head to the beginning of snake body
  snake.unshift(head)
  snake.pop()
  console.log(snake)
  return snake
}
export function drawSnakePart (snakePart, snakeBoardCtx) {
  // Set the colour of the snake part
  snakeBoardCtx.fillStyle = snakeColor
  // Set the border colour of the snake part
  snakeBoardCtx.strokestyle = snakeBorder
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
  // Draw a border around the snake part
  snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
  return snakePart
}

export function hasEatenFood (snake,foodX, foodY) {
  return snake[0].x === foodX && snake[0].y === foodY
}