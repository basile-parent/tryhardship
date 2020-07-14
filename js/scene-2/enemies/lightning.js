class LightningManager {
  boltConfigs = {
    "small" : {
      scale: 0.5
    },
    "medium" : {
      scale: 0.75
    },
    "big" : {
      scale: 1
    }
  }

  constructor(game, config) {
    this.game = game;
    this.config = config;
    this.game.anims.create({
      key: 'lightning_anim',
      frames: this.game.anims.generateFrameNumbers('lightning'),
      frameRate: 20,
      repeat: -1
    });
  }

  fire = ({ x, y, speed, lifespan }, configName) => {
    const { scale } = this.boltConfigs[configName];

    const defaultX = x || config.width;

    const bolt = this.game.physics.add.sprite(defaultX, y, 'lightning');
    bolt.scale = scale;
    bolt.anims.load('lightning_anim');
    bolt.setSize(65, 600, true);
    bolt.visible = true;
    bolt.body.velocity.x = speed ? speed * - 1 : -400;
    bolt.anims.load('lightning_anim');
    bolt.anims.play('lightning_anim', 0);
    this.game.physics.add.overlap(this.game.player.sprite, bolt, this.game.hitting(this.config.damages.lighting));

    setTimeout(() => bolt.destroy(), lifespan || 3400);
  }

}