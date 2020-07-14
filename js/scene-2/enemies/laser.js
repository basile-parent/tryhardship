class Laser {
  sparklesConfig = {
    slow : {
      speed: 300,
      lifespan : { min: 50, max: 100 }
    },
    medium : {
      speed: 400,
      lifespan : { min: 80, max: 120 }
    },
    fast : {
      speed: 500,
      lifespan : { min: 100, max: 200 }
    }
  };

  constructor(game, config, { x, y }) {
    this.game = game;
    this.config = config;
    this.active = false;
    this.initSprite({ x: x + 100, y });

    const particles = this.game.add.particles('spark');
    this.sparkles = particles.createEmitter({
      x: x - 5,
      y: y,
      angle: { min: 110, max: 230 },
      speed: this.sparklesConfig.slow.speed,
      gravityY: 0,
      lifespan: this.sparklesConfig.slow.lifespan,
      blendMode: 'SCREEN'
    }).stop();

  }

  moveTo(y, duration = 3500) {
  }

  initSprite = ({ x, y }) => {
    this.game.anims.create({
      key: 'laser_warming_anim',
      frames: this.game.anims.generateFrameNumbers('laser'),
      frameRate: 4
    });
    this.game.anims.create({
      key: 'laser_beam_start_anim',
      frames: this.game.anims.generateFrameNumbers('laser_beam', {frames: [0, 1, 2, 3]}),
      frameRate: 13
    });
    this.game.anims.create({
      key: 'laser_beam_loop_anim',
      frames: this.game.anims.generateFrameNumbers('laser_beam', {frames: [4, 5, 6, 7, 8]}),
      frameRate: 13,
      repeat: -1,
      yoyo: true
    });
    this.game.anims.create({
      key: 'laser_beam_end_anim',
      frames: this.game.anims.generateFrameNumbers('laser_beam', {frames: [9, 10, 11]}),
      frameRate: 13
    });


    this.beamSprite = this.game.physics.add.sprite(this.config.width / 2 - 10, y, 'laser_beam');
    this.beamSprite.scale = 1;

    this.beamSprite.visible = false;
    this.beamSprite.setSize(1200, 45);


    this.sprite = this.game.physics.add.sprite(x, y, 'laser');
    this.sprite.scale = 2;
    this.sprite.visible = true;

    this.game.physics.add.collider(this.game.player.sprite, this.beamSprite,
      () => this.active && this.game.hitting(this.config.damages.laser)(this.game.player, "Laser"));

    this.game.physics.add.overlap(this.game.player.sprite, this.sprite, this.game.hitting(this.config.damages.laser));
    // this.game.physics.add.overlap(this.game.player.sprite, this.beamSprite, this.game.hitting);
  }

  show = async () => {
    this.game.tweens.add({
      targets: [this.sprite],
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
      x: this.config.width,
      duration: 1200,
    });
  };

  fire = () => {
    this.setSparkleConfig("slow");
    this.sparkles.start();
    setTimeout(() => this.setSparkleConfig("medium"), 500);
    setTimeout(() => this.setSparkleConfig("fast"), 1000);

    this.sprite.anims.play("laser_warming_anim");
    setTimeout(() => {
      this.active = true;
      this.beamSprite.visible = true;

      if (this.beamSprite.anims.isPlaying) {
        this.beamSprite.anims.restart('laser_beam_start_anim').on('animationcomplete',
          () => {
            this.beamSprite.anims.restart("laser_beam_loop_anim");
          });
      } else {
        this.beamSprite.anims.play('laser_beam_start_anim').on('animationcomplete',
          () => {
            this.beamSprite.anims.play("laser_beam_loop_anim");
          });
      }

      setTimeout(() => this.sparkles.stop(), 1000);


    }, 1500);
  };
  stop = () => {
    // this.setSparkleConfig("medium");
    // setTimeout(() => this.setSparkleConfig("slow"), 600);
    // setTimeout(() => this.sparkles.stop(), 1000);

    this.active = false;
    this.sprite.anims.playReverse("laser_warming_anim");
    this.beamSprite.anims.play('laser_beam_end_anim').on('animationcomplete',
      () => {
        this.beamSprite.visible = false;
        // this.beamSprite.anims.pause();
      }
    );
  };

  setSparkleConfig = (configName) => {
    this.sparkles.setSpeed(this.sparklesConfig[configName].speed);
    this.sparkles.setLifespan(this.sparklesConfig[configName].lifespan);
  };


  moveTo(y, duration = 3500) {
    this.sparkles.stop()
    this.game.tweens.add({
      targets: [this.sprite, this.beamSprite],
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
      y,
      duration,
    });
  }

  fadeOut = () => {
    this.game.tweens.add({
      targets: [this.sprite, this.beamSprite],
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
      alpha: 0,
      duration: 3000,
    });
  };

}
