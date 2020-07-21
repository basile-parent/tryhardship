let horizontalDirection = [];
let verticalDirection = [];

function movePlayer(game) {
  horizontalDirection = addDirection(horizontalDirection, game.cursors.left, LEFT);
  horizontalDirection = addDirection(horizontalDirection, game.cursors.right, RIGHT);
  verticalDirection = addDirection(verticalDirection, game.cursors.up, UP);
  verticalDirection = addDirection(verticalDirection, game.cursors.down, DOWN);
  horizontalDirection = removeDirection(horizontalDirection, game.cursors.left, LEFT);
  horizontalDirection = removeDirection(horizontalDirection, game.cursors.right, RIGHT);
  verticalDirection = removeDirection(verticalDirection, game.cursors.up, UP);
  verticalDirection = removeDirection(verticalDirection, game.cursors.down, DOWN);

  if (horizontalDirection.length && horizontalDirection[horizontalDirection.length - 1] === LEFT) {
    game.player.moveLeft(game.cursors.shift.isDown);
  } else if (horizontalDirection.length && horizontalDirection[horizontalDirection.length - 1] === RIGHT) {
    game.player.moveRight(game.cursors.shift.isDown);
  }
  if (game.input.keyboard.checkDown(game.cursors.up, CHECK_SPEED)) {
    game.player.moveUp(game.cursors.shift.isDown);
  } else if (game.input.keyboard.checkDown(game.cursors.down, CHECK_SPEED)) {
    game.player.moveDown(game.cursors.shift.isDown);
  }

  // Gamepad
  if (game.pad) {
    const {x, y} = game.pad.leftStick;
    const {L2, R2} = game.pad;
    if (Math.abs(x) > 0.15) { // Error margin
      game.player.moveX(x, L2 || R2);
    }
    if (Math.abs(y) > 0.15) { // Error margin
      game.player.moveY(y, L2 || R2);
    }
  }
}

function addDirection(direction, key, directionValue) {
  if (Phaser.Input.Keyboard.JustDown(key)) {
    direction.push(directionValue);
  }
  return direction;
}

function removeDirection(direction, key, directionValue) {
  if (Phaser.Input.Keyboard.JustUp(key)) {
    return direction.filter(d => d !== directionValue);
  }
  return direction;
}