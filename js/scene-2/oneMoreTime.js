class OneMoreTime {
  constructor(scene) {
    this.scene = scene;
    this.highScore = null;
  }

  show() {
    const title = this.scene.add.text(config.width / 2, 280, "One more time ?");
    title.setOrigin(0.5, 0.5);
    title.setFontSize(50);
    title.setFontFamily("PressStart2P");

    const restartbutton = this.scene.add.image(400, 450, 'restart_button');
    restartbutton.setInteractive();
    restartbutton.on('pointerdown', () => this.restart());
    const homebutton = this.scene.add.image(800, 450, 'home_button');
    homebutton.setInteractive();
    homebutton.on('pointerdown', () => this.home());

    if (this.highScore) {
      const highScoreTitle = this.scene.add.text(config.width / 2, 580, "Nouveau record ! " + formatTime(this.highScore));
      highScoreTitle.setOrigin(0.5, 0.5);
      highScoreTitle.setFontSize(35);
      highScoreTitle.setFontFamily("PressStart2P");
    }
  }

  newHighScore(timer) {
    this.highScore = timer;
  }

  restart() {
    console.log("restart");
    Object.values(this.scene.audio.items).forEach(a => a.stop());
    this.scene.scene.restart();
  }

  home() {
    console.log("home");
    Object.values(this.scene.audio.items).forEach(a => a.stop());
    this.scene.scene.stop("playGame");
    this.scene.scene.start("home");
  }

}