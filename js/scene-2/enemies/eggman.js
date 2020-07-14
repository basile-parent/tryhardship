const EggmanAnimations = scene => ([
  {
    key: 'eggman_run_left',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [0, 1, 2, 3]}),
    frameRate: 10,
    repeat: -1
  }, {
    key: 'eggman_run_left_warning',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [4, 5, 6, 7]}),
    frameRate: 10,
    repeat: -1
  }, {
    key: 'eggman_jump_left',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [8]}),
    frameRate: 10,
    repeat: 0
  }, {
    key: 'eggman_jump_left_warning',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [8, 9]}),
    frameRate: 10,
    repeat: -1
  }, {
    key: 'eggman_run_right',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [12, 13, 14, 15]}),
    frameRate: 10,
    repeat: -1
  }, {
    key: 'eggman_run_right_warning',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [16, 17, 18, 19]}),
    frameRate: 10,
    repeat: -1
  },
  {
    key: 'eggman_jump_right',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [20]}),
    frameRate: 10,
    repeat: 0
  },
  {
    key: 'eggman_jump_right_warning',
    frames: scene.anims.generateFrameNumbers('eggman', {frames: [20, 21]}),
    frameRate: 10,
    repeat: -1
  },
  {
    key: 'kaboom_2',
    frames: scene.anims.generateFrameNames('explosion_2'),
    frameRate: 20,
  }
]);

class Eggman extends Phaser.Physics.Arcade.Sprite {
  animationRun = 'eggman_run';
  animationJump = 'eggman_jump';
  animationExplode = 'kaboom_2';

  constructor(scene, config, {
    x, y,
    velocity = -250,
    explodeTimeout = 5000
  }) {
    super(scene, x, y, 'eggman');
    this.config = config;
    this.orientation = "left";
    this.warningAnimation = "";
    this._setAnimation(this.animationJump);
    this.state = "jumping";
    this.onFloor = false;
    this.id = Math.round(Math.random() * 100000000);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setSize(45, 55);

    this.timer = 0;
    this.delayedTimer = 0;

    this.setCollideWorldBounds(true);
    scene.physics.world.on('worldbounds', this._bounceOnBounds.bind(this), this);
    this.body.onWorldBounds = true;

    this.setVelocity(velocity, 0);
    this.body.gravity.y = 1000;
    this.body.setBounce(1, 0);

    scene.physics.add.overlap(scene.player.sprite, this,
      scene.hitting(this.state === "exploding" ? this.config.damages.eggmanExplode : this.config.damages.eggmanJump));

    this.on(Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE + this.animationExplode, this.destroyAfterExplode);

    setTimeout(() => {
      this.warningAnimation = "_warning";
      this._playAnimation();
    }, explodeTimeout - 2000);
    setTimeout(() => { this.explode() }, explodeTimeout);
  }

  jump() {
    if (!this._touchingFloor() || this.state !== "running") {
      return;
    }
    this.body.velocity.y = -1180;
    this.state = "jumping";
    this._setAnimation(this.animationJump);
    this.onFloor = false;

    this.delayedTimer = this.timer + 100;
  }

  run() {
    this.onFloor = true;
    this.state = "running";
    this._setAnimation(this.animationRun);
  }

  destroyAfterExplode = (animation, frame, gameObject) => {
    // TODO Bug bizarre avec l'animation qui se répète plusieurs fois
    if (frame.index === 8) {
      // Ugly fix for the destroying object
      setTimeout(() => {
        this.destroy();
        this._onDestroy();
      }, 0);
    }
  }

  _onDestroy() {
    // To override
  }

  explode() {
    this.state = "exploding";
    this.setVelocity(0, 0);
    this.body.gravity.y = 0;
    // this.body.offset.x = -3;
    // this.body.offset.y = 2;
    // this.setOrigin(0.5, 0.5);
    this._setAnimation(this.animationExplode);
    this._onExplode();
  }

  _onExplode() {
    // To override
  }

  _setAnimation(animation) {
    if (this.animation === animation) {
      return;
    }

    this.animation = animation;
    this._playAnimation();
  }

  _playAnimation() {
    let newAnimation = this.animation;
    if (this.state !== "exploding") {
      newAnimation = this.animation + "_" + this.orientation + this.warningAnimation;
    }
    this.anims.load(newAnimation);
    this.anims.play(newAnimation, true);
  }

  _touchingFloor() {
    // return Math.abs(this.body.deltaY()) < 0.15;
    return this.body.y >= 672.5;
  }

  _bounceOnBounds = (body, up, down, left, right) => {
    if (!this.active || up || down) {
      return;
    }
    this.orientation = this.orientation === "left" ? "right" : "left";
    this._playAnimation();
  }

  preUpdate(time, delta) {
    if (!this.active) {
      return;
    }
    super.preUpdate(time, delta);

    if (this.active && this.state === "exploding") {
      this.body.setCircle(this.frame.width / 2);
      return;
    }

    this.timer = time;

    if (this.active && !this.onFloor && this.timer > this.delayedTimer && this._touchingFloor()) {
      this.run();
    }
  }

}


class EggmanInterval extends Eggman {
  constructor(scene, config, {x, y, velocity, explodeTimeout = 5000, intervalJumpTime = 2500}) {
    super(scene, config, {x, y, velocity, explodeTimeout});
    // this.interval = setInterval(() => this.jump(), intervalTime);

    this.loop = scene.time.addEvent({delay: intervalJumpTime, callback: this.jump, callbackScope: this, loop: true});
  }

  _onExplode() {
    // clearInterval(this.interval);
    this.loop.remove(false);
  }
}

class EggmanHoming extends Eggman {
  JUMP_DISTANCE = 500;

  // JUMP_X_DISTANCE = 100;

  constructor(scene, config, {x, y, velocity, explodeTimeout}) {
    super(scene, config, {x, y, velocity, explodeTimeout});
    this.scene = scene;
  }

  _couldJumpOnPlayer() {
    let distance = this.x - this.scene.player.sprite.x;
    if (distance <= 0 && this.orientation === "left") {
      return false;
    }
    if (distance >= 0 && this.orientation === "right") {
      return false;
    }
    // distance = Math.abs(distance);
    // return distance < this.JUMP_X_DISTANCE && distance > (this.JUMP_X_DISTANCE / 2);

    // Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.sprite.x, this.scene.player.sprite.y))
    distance = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.sprite.x, this.scene.player.sprite.y);
    return distance < (this.JUMP_DISTANCE * 1.5) && distance > (this.JUMP_DISTANCE / 1.5);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.state === "running" && this._couldJumpOnPlayer()) {
      this.jump();
    }
  }
}


class SonicPlatform {
  constructor(scene, config) {
    // super(scene, config.width / 2, config.height - 35, 'sonic_land');
    this.scene = scene;
    this.config = config;
    this.floor = scene.add.tileSprite(config.width / 2, config.height + 35, config.width, 65, 'sonic_land');
    scene.physics.add.existing(this.floor);
    this.floor.body.immovable = true;

    // this.scene.physics.add.collider(this.scene.player.sprite, this.floor, () => this.scene.player.preventDirection("down"));
  }

  show() {
    this.tween = this.scene.tweens.add({
      targets: [this.floor],
      y: this.config.height - 32,
      ease: 'Linear',
      duration: 1500,
      yoyo: false,
      repeat: 0,
    });
    this.scene.player.setMargin("down", 72);
  }

  hide() {
    this.tween = this.scene.tweens.add({
      targets: [this.floor],
      y: this.config.height + 35,
      ease: 'Linear',
      duration: 1000,
      yoyo: false,
      repeat: 0,
    });
    this.scene.player.reinitMargins("down");
  }

  handleEggmanCollide(eggman) {
    this.scene.physics.add.collider(eggman, this.floor);
  }

}
