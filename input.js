export let dx // Horizontal velocity
export let dy // Vertical velocity

export function initSpeed() {
  dx = 10
  dy = 0
}

export function changeDirection (event) {
  const keydown = event.code
  // Prevent the snake from reversing
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
