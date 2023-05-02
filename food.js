export let foodX
export let foodY

export function drawFood (snakeBoardCtx) {
  snakeBoardCtx.fillStyle = 'lightgreen'
  snakeBoardCtx.strokestyle = 'darkgreen'
  snakeBoardCtx.fillRect(foodX, foodY, 10, 10)
  snakeBoardCtx.strokeRect(foodX, foodY, 10, 10)
}

// Generate new food location
export function genFood (snake, snakeBoard) {
  // Generate a random number the food x-coordinate
  foodX = randomFood(0, snakeBoard.width - 10)
  // Generate a random number for the food y-coordinate
  foodY = randomFood(0, snakeBoard.height - 10)
  // if the new food location is where the snake currently is, generate a new food location
  const hasOverlappedFood = (part) => part.x === foodX && part.y === foodY
  if (snake.some(hasOverlappedFood)) genFood(snake)
  return snake
}

export function randomFood (min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10
}
