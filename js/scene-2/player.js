class Player {

  constructor(scene, config, {x = 500, y = 300, speed = 8, boostCoeff = 2}) {
    this.scene = scene;
    this.config = config;
    this.lifePoints = 100;
    this.isInvincible = false;

    this.initialMargins = {up: 10, down: 10, left: 20, right: 20};
    this.margins = {...this.initialMargins};

    this.speed = speed;
    this.boostCoeff = boostCoeff;
    this.initSprite({x, y});
  }

  initSprite = ({x, y}) => {
    this.scene.anims.create({
      key: 'spaceship_anim',
      frames: this.scene.anims.generateFrameNumbers('spaceship', {start: 0, end: 3}),
      frameRate: 15,
      repeat: -1,
      yoyo: true
    });
    this.scene.anims.create({
      key: 'spaceship_invincibility_anim',
      frames: this.scene.anims.generateFrameNumbers('spaceship', {start: 4, end: 7}),
      frameRate: 13,
      repeat: -1,
      yoyo: true
    });

    this.sprite = this.scene.physics.add.sprite(x, y, 'spaceship');
    this.sprite.anims.load('spaceship_anim');
    this.sprite.anims.play('spaceship_anim');
    this.sprite.visible = true;
    this.sprite.setSize(40, 15, true);

    this.anim = this.scene.anims.create({
      key: 'kaboom',
      frames: this.scene.anims.generateFrameNumbers('explosion'),
      frameRate: 30
    });
    this.explosion = this.scene.add.sprite(40, 100, 'explosion').setScale(2);
    this.explosion.anims.load('kaboom');
    this.explosion.visible = false;

    // this.game.physics.add.overlap(this.game.player.sprite, this.sprite, this.game.hitting);
  }

  moveLeft(isBoosted) {
    this.sprite.x = Math.max(this.margins.left, this.sprite.x - (this.speed * (isBoosted ? this.boostCoeff : 1)));
  }

  moveRight(isBoosted) {
    this.sprite.x = Math.min(this.config.width - this.margins.right, this.sprite.x + (this.speed * (isBoosted ? this.boostCoeff : 1)));
  }

  moveUp(isBoosted) {
    this.sprite.y = Math.max(this.margins.up, this.sprite.y - (this.speed * (isBoosted ? this.boostCoeff : 1)));
  }

  moveDown(isBoosted) {
    this.sprite.y = Math.min(this.config.height - this.margins.down, this.sprite.y + (this.speed * (isBoosted ? this.boostCoeff : 1)));
  }

  moveX(gamepadX, isBoosted) {
    this.sprite.x =
      Math.min(this.config.width - this.margins.right,
        Math.max(this.margins.left,
          this.sprite.x - (this.speed * (-gamepadX * 1.3) * (isBoosted ? this.boostCoeff : 1))));
  }

  moveY(gamepadY, isBoosted) {
    this.sprite.y =
      Math.min(this.config.height - this.margins.down,
        Math.max(this.margins.up,
          this.sprite.y - (this.speed * (-gamepadY * 1.3) * (isBoosted ? this.boostCoeff : 1))));
  }

  setMargin(direction, margin) {
    this.margins[direction] = margin;
  }

  reinitMargins(direction) {
    if (!direction) {
      this.margins = {...this.initialMargins};
    } else {
      this.margins[direction] = this.initialMargins[direction];
    }
  }

  destroy() {
    this.explosion.x = this.sprite.x;
    this.explosion.y = this.sprite.y;
    this.sprite.destroy();
    this.explosion.visible = true;
    this.explosion.anims.play('kaboom');
  }

  takeDamage(damage) {
    if (this.isInvincible) {
      return false;
    }

    this.isInvincible = true;
    this.sprite.anims.play('spaceship_invincibility_anim');
    setTimeout(() => this.loseInvicility(), 2000);

    this.lifePoints = Math.max(0, this.lifePoints - damage);
    return true;
  }

  loseInvicility() {
    this.isInvincible = false;
    this.sprite?.anims?.play('spaceship_anim');
  }

}