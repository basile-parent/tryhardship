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

  constructor(game, { x, y }) {
    this.game = game;
    this.initSprite({ x: x + 100, y });

    const particles = this.game.add.particles('spark');
    this.sparkles = particles.createEmitter({
      x: x - 52,
      y: y + 4,
      angle: { min: 110, max: 230 },
      speed: this.sparklesConfig.slow.speed,
      gravityY: 0,
      lifespan: this.sparklesConfig.slow.lifespan,
      blendMode: 'SCREEN'
    }).stop();

    this.laser = particles.createEmitter({
      x: x - 52,
      y: y + 4,
      angle: { min: 179.9, max: 180.1 },
      scale: { start: 1, end: 1 },
      speed: 1200,
      gravityY: 0,
      lifespan: { min: 10000, max: 20000 },
      blendMode: 'ADD',
      maxParticles: -1,
      quantity: 1,
      collideLeft: true,
      deathZone: { type: 'onEnter', source: this.collision() }
    }).stop();
  }

  moveTo(y, duration = 3500) {
    this.game.tweens.add({
      targets: [this.sprite],
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
      y,
      duration,
    });
    const laser = this.laser;
    this.game.tweens.addCounter({
      from: this.laser.y.propertyValue,
      to: y,
      onUpdate: function (tween) {
        console.log(tween.getValue()),
        laser.setPosition(laser.x.propertyValue, tween.getValue());
      },
      duration
    });
    this.laser.y.propertyValue = y;
    // this.game.tweens.add({
    //   targets: [this.laser],
    //   ease: 'Linear',
    //   yoyo: false,
    //   repeat: 0,
    //   y: {
    //     propertyValue: y
    //   },
    //   duration,
    // });
  }

  collision = () => ({
      contains : (x, y) => {
        if (this.game.player?.sprite.body?.hitTest(x, y)) {
          this.game.hitting(50)(this.game.player, "Laser particle");
          this.stop();
        }

        return false;
      }
    }
  );

  initSprite = ({ x, y }) => {
    const conf = {
      key: 'laser_warming',
      frames: this.game.anims.generateFrameNumbers('laser_anim'),
      frameRate: 5
    };
    this.game.anims.create(conf);
    this.sprite = this.game.physics.add.sprite(x, y, 'laser_anim');
    this.sprite.scale = .7;
    this.sprite.anims.load('laser_warming');
    this.sprite.visible = true;

    this.game.physics.add.overlap(this.game.player.sprite, this.sprite, this.game.hitting(50));
  }

  show = async () => {
    this.sprite.body.velocity.x = -50;
    await wait(2000);
    this.sprite.body.velocity.x = 0;
  };

  fire = () => {
    this.setSparkleConfig("slow");
    this.sparkles.start();
    this.sprite.anims.play('laser_warming');
    setTimeout(() => this.setSparkleConfig("medium"), 500);
    setTimeout(() => this.setSparkleConfig("fast"), 1000);
    setTimeout(() => this.laser.start(), 1500);
  };
  stop = () => {
    this.setSparkleConfig("medium");
    this.sprite.anims.playReverse('laser_warming');
    setTimeout(() => this.laser.stop(), 300);
    setTimeout(() => this.setSparkleConfig("slow"), 600);
    setTimeout(() => this.sparkles.stop(), 1000);
  };

  setSparkleConfig = (configName) => {
    this.sparkles.setSpeed(this.sparklesConfig[configName].speed);
    this.sparkles.setLifespan(this.sparklesConfig[configName].lifespan);
  };

}
