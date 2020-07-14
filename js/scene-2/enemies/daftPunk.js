class DaftPunk {
  constructor(game, config, { x, y, sprite }, { bulletSprite, bulletSpeed, damage }) {
    this.game = game;
    this.config = config;

    this.sprite = this.game.physics.add.sprite(x + 200, y, sprite);
    this.sprite.body.setCircle(70);
    this.sprite.body.offset.x = 15;
    this.sprite.body.offset.y = 15;
    this.sprite.setScale(0.8);
    this.weapon = this.createWeapon(bulletSprite, bulletSpeed);

    this.game.physics.add.overlap(this.game.player.sprite, this.sprite, this.game.hitting(damage));
    this.game.physics.add.overlap(this.game.player.sprite, this.weapon.bullets, this.game.hitting(damage));
  }

  createWeapon = (bulletSprite, bulletSpeed) => {
    let weapon = this.game.add.weapon(-1, bulletSprite);
    weapon.debugPhysics = true;
    weapon.bulletKillType = WeaponPlugin.consts.KillType.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = bulletSpeed;
    weapon.trackSprite(this.sprite, -20, 0, true);
    return weapon;
  }

  show = () => {
    this.game.tweens.add({
      targets: [this.sprite],
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
      x: this.config.width,
      duration: 850,
    });
  };

  fire = ({ scale }) => {
    // To override
    // this.weapon.fire();
  }

  fireMultiple = (options = { times: 1, timeout: 200, scale: 1 }) => {
    this.fire({ scale: options.scale });

    if (options.times > 1) {
      this.game.time.addEvent({ delay: options.timeout, callback: () => this.fire({ scale: options.scale }),
        callbackScope: this, repeat: options.times - 2 })
    }
  }

  fadeOut = () => {
    this.game.tweens.add({
      targets: [this.sprite],
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
      alpha: 0,
      duration: 3000,
    });
  };

}