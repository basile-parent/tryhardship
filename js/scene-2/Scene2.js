const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const CHECK_SPEED = 10;

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");

    this.cursors = [];
    this.player = null;
    this.explosion = null;
    this.dafts = [];
    this.punks = [];

    this.lifePointsDiv = document.getElementById("life_value");
    this.lifeGaugeDiv = document.getElementById("life_gauge");

    this.timer = new Timer();
    this.timer.addMessageHandler("stopTimer", e => this.sequenceStopped(e));
    this.sequence = new Sequence(this, config, { onStart: this._onStart, onStop: () => this.timer.stop(), onWin : this.onWin });
    this.oneMoreTime = null;
    this.successScreen = null;
    this.endScreen = null;
    this.win = false;
  }

  preload() {
    this.load.script('WeaponPlugin', 'js/phaser-3/WeaponPlugin.js', 'weaponPlugin', 'weapons');

    this.load.image('shmup-ship2', 'assets/shmup-ship2.png');
    this.load.image('slime', 'assets/slime.png');
    this.load.image('yellow_ball', 'assets/yellow_ball.png');
    this.load.image('daft', 'assets/daft.png');
    this.load.image('punk', 'assets/punk.png');
    this.load.image('background', 'assets/stars.png');
    this.load.image('backgroundFront', 'assets/stars_front.png');
    this.load.image('spark', 'assets/orange.png');
    this.load.image('sonic_land', 'assets/sonic_land.png');
    this.load.image('restart_button', 'assets/restart_button.png');
    this.load.image('home_button', 'assets/home_button.png');

    this.load.atlas('explosion_2', 'assets/explosion_2.png', 'assets/explosion_2.json');
    this.load.atlas('bulle', 'assets/bulle.png', 'assets/bulle_atlas.json');
    // this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');

    this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64 });
    // this.load.spritesheet('laser_anim', 'assets/laser_anim.png', { frameWidth: 150, frameHeight: 90 });
    this.load.spritesheet('lightning', 'assets/lightning.png', { frameWidth: 128, frameHeight: 600 });
    this.load.spritesheet('eggman', 'assets/eggman.png', { frameWidth: 63, frameHeight: 60 });
    this.load.spritesheet('spaceship', 'assets/spaceship.png', { frameWidth: 41, frameHeight: 19 });
    this.load.spritesheet('laser', 'assets/laser.png', { frameWidth: 37, frameHeight: 28 });
    this.load.spritesheet('laser_beam', 'assets/laser_beam.png', { frameWidth: 1200, frameHeight: 234 });
  }

  create() {
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin.WeaponPlugin,
      'weapons',
      this
    );

    this.win = false;

    this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.backgroundFront = this.add.tileSprite(0,0, config.width, config.height, "backgroundFront");
    this.backgroundFront.setOrigin(0, 0);
    this.backgroundFront.setAlpha(0, 1, 1, 1);

    this.cursors = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
      x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    };

    this.player = new Player(this, config, { x: 500, y: 300});

    this.pad = null;

    EggmanAnimations(this).forEach(a => this.anims.create(a));
    BulleAnimations(this).forEach(a => this.anims.create(a));

    this.audio = new AudioManager(this, {
      harder: { id : "harder", volume: 0.75, seek: 0, loop: false },
      hit: { id: "hit", volume: 1, seek: 0, loop: false },
      explosion: { id : "explosion", volume: 1, seek: 0, loop: false },
      oneMoreTime: { id : "one-more-time", volume: 1, seek: 0, loop: true },
      aroundTheWorld: { id : "around-the-world", volume: 1, seek: 0, loop: true }
    });

    this.enemies = new EnemiesManager(this, config);

    this.lifePointsDiv.innerHTML = 100;
    this.lifeGaugeDiv.style.width = "100%";

    if (this.textScreenTimeout) {
      clearTimeout(this.textScreenTimeout);
      this.textScreenTimeout = null;
    }
    this.sequence.start();
    this.oneMoreTime = new OneMoreTime(this);
    this.successScreen = new SuccessScreen(this);
  }

  update() {
    this.background.tilePositionX += 0.4;
    this.backgroundFront.tilePositionX += 1.4;

    if (this.input.gamepad.total) {
      this.pad = this.input.gamepad.getPad(0);
    }

    if ((Phaser.Input.Keyboard.JustDown(this.cursors.x) || this.pad?.A) && (!this.sequence.active || this.win)) {
      this.endScreen.restart();
    }
    if ((Phaser.Input.Keyboard.JustDown(this.cursors.esc) || this.pad?.B) && (!this.sequence.active || this.win)) {
      this.endScreen.home();
    }

    movePlayer(this);
  }

  _onStart = (timer) => {
    this.timer.setTime(timer);
    this.timer.start();
  }

  hitting = damage => (player, enemy) => {
    const hasTakenDamage = this.player.takeDamage(damage || 0);
    this.lifePointsDiv.innerHTML = this.player.lifePoints;
    this.lifeGaugeDiv.style.width = this.player.lifePoints + "%";
    // enemy && enemy.destroy();
    if (this.player.lifePoints === 0) {
      this.sequence.stop();
      this.player.destroy();
      this.endScreen = this.oneMoreTime;

      this.textScreenTimeout = setTimeout(() => this.endScreen.show(), 1500);
    } else if (hasTakenDamage) {
      this.audio.hit.play();
    }
  }

  sequenceStopped = timer => {
    if (SCORES[config.mode.key] < timer) {
      this.endScreen.newHighScore(timer);
      setScore(config.mode, timer);
    }
  }

  onWin = timer => {
    this.endScreen = this.successScreen;
    this.win = true;
    this.timer.stop(false);
    this.timer.setTime(timer * 1000);
    this.sequenceStopped(timer * 1000);

    this.textScreenTimeout = setTimeout(() => this.successScreen.show(), 1500);
  }

}