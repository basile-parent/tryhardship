const BulleAnimations = scene => ([
  {
    key: 'bulle_coming',
    frames: scene.anims.generateFrameNames('bulle', { prefix: 'bulle_', frames:[2, 1], zeroPad: 3 }),
    frameRate: 1,
    repeat: 0
  },
  {
    key: 'bulle_wait',
    frames: scene.anims.generateFrameNames('bulle', { prefix: 'bulle_', start: 3, end: 3, zeroPad: 3 }),
    repeat: 0
  },
  {
    key: 'bulle_ki',
    frames: scene.anims.generateFrameNames('bulle', { prefix: 'bulle_', start: 6, end: 9, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  },
  {
    key: 'bulle_flying',
    frames: scene.anims.generateFrameNames('bulle', { prefix: 'bulle_', start: 10, end: 12, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  }
]);

class Bulle extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, config, { y }) {
    super(scene, config.width + 30, y, 'bulle');
    // super(scene, config.width + 25, y, 'eggman');
    this.initialY = y;
    this.config = config;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    scene.physics.add.overlap(scene.player.sprite, this, scene.hitting(this.config.damages.bulle));
  }

  arriving() {
    this.anims.play('bulle_coming');
    this.scene.tweens.add({
      targets: [this],
      ease: 'Circ.easeIn',
      yoyo: false,
      repeat: 0,
      x: this.config.width - 100,
      duration : 800,
    });
    setTimeout(() => {
      this.anims.play('bulle_wait');

      setTimeout(() => this._focusing(), 1200);
      setTimeout(() => this.launching(this.initialY), 3300);

      this.scene.tweens.add({
        targets: [this],
        ease: 'Linear',
        yoyo: true,
        repeat: 0,
        y: this.y + 10,
        duration : 500,
      });
    }, 800);
  }

  _focusing() {
    this.anims.play('bulle_ki');
    this.body.offset.x = 28;
    this.body.offset.y = 58;
    this.y = 279;
    this.scene.tweens.add({
      targets: [this],
      ease: 'Linear',
      yoyo: true,
      repeat: 1,
      y: this.y + 10,
      duration : 500,
    });
  }

  launching() {
    this.anims.play('bulle_flying');
    this.y = this.initialY;
    this.x = this.config.width - 45;
    this.body.setSize(70, 50);
    this.body.offset.x = 10;
    this.body.offset.y = 7;

    this.scene.tweens.add({
      targets: [this],
      ease: 'Circ.easeIn',
      yoyo: false,
      repeat: 0,
      x: -95,
      duration : 1500,
    });

    setTimeout(() => this.destroy(), 1800);
  }

}