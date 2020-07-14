class Scene1 extends Phaser.Scene {
  constructor() {
    super("home");
  }
  preload() {
    this.load.image('zqsd', 'assets/zqsd.png');
    this.load.image('gamepad', 'assets/gamepad.png');
    this.load.image('start_button', 'assets/start_button.png');
    this.load.image('background', 'assets/stars.png');
    this.load.image('backgroundFront', 'assets/stars_front.png');
  }
  create() {
    // Bug avec le support manette : lorsqu'on revient sur l'écran d'accueil, ça appuie sur A automatiquement
    this.locked = true;
    setTimeout(() => this.locked = false, 100);

    this.audio = new AudioManager(this, {
      getLucky: { id: "get-lucky", volume: 1, seek: 0, loop: true, autoplay: true }
    });

    this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.backgroundFront = this.add.tileSprite(0,0, config.width, config.height, "backgroundFront");
    this.backgroundFront.setOrigin(0, 0);
    this.backgroundFront.setAlpha(0, 1, 1, 1);

    const box = this.add.rectangle(config.width / 2, config.height / 2, 800, 600, 0x212529);
    box.setOrigin(0.5, 0.5);
    box.setStrokeStyle(4, 0xffffff);

    const title = this.add.text(config.width / 2, 160, "Tryhardship");
    title.setOrigin(0.5, 0.5);
    title.setFontSize(50);
    title.setFontFamily("PressStart2P");

    this._displayDifficulties();
    this._displayTextHowToPlay();

    this.add.image(600, 700, 'start_button');

    this.intervalBlink = setInterval(this._blinkCursor, 250);
    this.padDirection = { leftStick: 0, cross: 0 };

    this._displayModal();

    this.cursors = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
    };
  }

  update() {
    if (!HAS_USER_INTERACT.value) {
      return;
    }
    this.background.tilePositionX += 0.4;
    this.backgroundFront.tilePositionX += 1.4;

    if (this.input.gamepad.total) {
      this.pad = this.input.gamepad.getPad(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.z)) {
      this._changeDifficultyArrow(-1);
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.cursors.s)) {
      this._changeDifficultyArrow(1);
    }

    if (!this.padDirection.leftStick && this.pad?.leftStick.y < -0.15) {
      this.padDirection.leftStick = -1;
      this._changeDifficultyArrow(-1);
    } else if (!this.padDirection.leftStick && this.pad?.leftStick.y > 0.15) {
      this.padDirection.leftStick = 1;
      this._changeDifficultyArrow(1);
    }


    if (!this.padDirection.cross && this.pad?.up) {
      this.padDirection.cross = -1;
      this._changeDifficultyArrow(-1);
    } else if (!this.padDirection.cross && this.pad?.down) {
      this.padDirection.cross = 1;
      this._changeDifficultyArrow(1);
    }

    if (this.pad?.leftStick.y < 0.15 && this.pad?.leftStick.y > -0.15) {
      this.padDirection.leftStick = 0;
    }
    if (!this.pad?.up && !this.pad?.down) {
      this.padDirection.cross = 0;
    }

    if ((Phaser.Input.Keyboard.JustDown(this.cursors.x) || this.pad?.A) && !this.locked) {
      this.start();
    }
  }

  start() {
    clearInterval(this.intervalBlink);

    this.scene.start("playGame");
    this.scene.stop("home");

    this.audio.getLucky.fadeVolume(this.audio.getLucky.volume, 0, 2000)
      .then(() => this.audio.getLucky.stop());
  }

  _displayDifficulties() {
    const chooseDifficulty = this.add.text(240, 250, "Choisissez une difficulté");
    chooseDifficulty.setFontSize(20);
    chooseDifficulty.setFontFamily("PressStart2P");

    this.modes = MODES.map((mode, index) => {
      const selected = config.mode.key === mode.key;
      const modeText = this.add.text(240, 300 + index * 40, ` ${ selected ? ">" : " " } ${mode.label}`);
      modeText.key = mode.key;
      modeText.label = mode.label;
      modeText.selected = selected;
      modeText.cursorHidden = false;
      modeText.setFontSize(14);
      modeText.setFontFamily("PressStart2P");
      modeText.setInteractive();
      modeText.on('pointerdown', () => this._changeDifficulty(modeText))
      modeText.on('pointerover',function() {
        modeText.setColor("yellow");
      })
      modeText.on('pointerout',function() {
        modeText.setColor("white");
      });

      const scoreMode = SCORES[mode.key];
      const scoreModeText = this.add.text(500, 300 + index * 40, formatTime(scoreMode));
      scoreModeText.setFontSize(14);
      scoreModeText.setFontFamily("PressStart2P");
      !scoreMode && scoreModeText.setColor("gray");

      return modeText;
    });
  }

  _displayTextHowToPlay() {
    const title = this.add.text(config.width / 2, 480, `Comment jouer ?`);
    title.setOrigin(0.5, 0.5);
    title.setFontSize(20);
    title.setFontFamily("PressStart2P");

    // Keyboard
    const zqsd = this.add.image(350, 560, 'zqsd');
    const keyboardBoost = this.add.text(240, 620, `Boost`);
    keyboardBoost.setFontSize(14);
    keyboardBoost.setFontFamily("PressStart2P");
    const keyboardMove = this.add.text(360, 620, `Déplacer`);
    keyboardMove.setFontSize(14);
    keyboardMove.setFontFamily("PressStart2P");

    // Gamepad
    const gamepad = this.add.image(800, 560, 'gamepad');
    gamepad.setScale(0.7);
    const gamepadBoost = this.add.text(670, 620, `Boost`);
    gamepadBoost.setFontSize(14);
    gamepadBoost.setFontFamily("PressStart2P");
    const gamepadMove = this.add.text(780, 620, `Déplacer`);
    gamepadMove.setFontSize(14);
    gamepadMove.setFontFamily("PressStart2P");
  }

  _displayModal() {
    const modalGroup = this.add.group();

    const bg = this.add.rectangle(0, 0, config.width, config.height, 0x000000, 50);
    bg.setOrigin(0, 0);

    const bandeau = this.add.rectangle(config.width / 2, config.height / 2, config.width, 200, 0x000000);

    const title = this.add.text(config.width / 2, config.height / 2, "Appuyez sur une touche du clavier");
    title.setOrigin(0.5, 0.5);
    title.setFontSize(30);
    title.setFontFamily("PressStart2P");

    modalGroup.add(bg);
    modalGroup.add(bandeau);
    modalGroup.add(title);

    modalGroup.setVisible(true);
    if (HAS_USER_INTERACT.value) {
      modalGroup.setVisible(false);
    } else {
      HAS_USER_INTERACT.registerListener(userInteract => {
        if (!userInteract) {
          return;
        }
        // TODO Bug sur Phaser : le group a plusieurs propriétés à undefined lors qu'on perd une partie et qu'on revient sur l'écran d'accueil.
        modalGroup.setVisible(false);
      })
    }
  }

  _changeDifficulty(newMode) {
    changeMode(newMode);
    this.modes.forEach(modeText => {
      modeText.selected = modeText.key === newMode.key;
      modeText.setText(` ${ modeText.selected ? ">" : " " } ${modeText.label}`);
    })
  }
  _changeDifficultyArrow(direction) {
    const selectedIndex = this.modes.findIndex(m => m.selected);
    const newIndex = selectedIndex + direction;

    if (newIndex < 0 || newIndex >= this.modes.length) {
      return;
    }

    this._changeDifficulty(this.modes[newIndex]);
  }

  _blinkCursor = () => {
    const selectedIndex = this.modes.findIndex(m => m.selected);
    const selectedMode = this.modes[selectedIndex];
    selectedMode.cursorHidden = !selectedMode.cursorHidden;
    selectedMode.setText(` ${ !selectedMode.cursorHidden ? ">" : " " } ${selectedMode.label}`);
  }
}