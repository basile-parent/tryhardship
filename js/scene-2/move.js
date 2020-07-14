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

  // const boost = game.cursors.shift.isDown ? BOOST_COEFF : 1;

  // && this.input.keyboard.checkDown(game.cursors.left, CHECK_SPEED)) {
  if (horizontalDirection.length && horizontalDirection[horizontalDirection.length - 1] === LEFT) {
    game.player.moveLeft(game.cursors.shift.isDown);
    // game.player.x = Math.max(20, game.player.x - (DISTANCE * boost));
  } else if (horizontalDirection.length && horizontalDirection[horizontalDirection.length - 1] === RIGHT) {
    game.player.moveRight(game.cursors.shift.isDown);
    // game.player.x = Math.min(config.width - 20, game.player.x + (DISTANCE * boost));
  }
  if (game.input.keyboard.checkDown(game.cursors.up, CHECK_SPEED)) {
    game.player.moveUp(game.cursors.shift.isDown);
    // game.player.y = Math.max(10, game.player.y - (DISTANCE * boost));
  } else if (game.input.keyboard.checkDown(game.cursors.down, CHECK_SPEED)) {
    game.player.moveDown(game.cursors.shift.isDown);
    // game.player.y = Math.min(config.height - 10, game.player.y + (DISTANCE * boost));
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

    // if (game.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
    //   game.player.moveLeft(game.cursors.shift.isDown);
    // } else if (game.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
    //   game.player.moveLeft(game.cursors.shift.isDown);
    // }
    //
    // if (game.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
    //   game.player.moveUp(game.cursors.shift.isDown);
    // } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
    //   game.player.moveDown(game.cursors.shift.isDown);
    // }
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