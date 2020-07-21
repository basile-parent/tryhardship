const LOADING_VALUES = {
  SEQUENCE: 30 / MODES.length,
  AUDIO: 0, // Defined in Loading scene constructor
  FONT: 5 // Defined in Loading scene constructor
};

class Loading extends Phaser.Scene {
  constructor() {
    super("loading");

    LOADING_VALUES.AUDIO = 65 / document.getElementsByTagName("audio").length;

    this.loadingPercent = 0;
    this.progressBarHeight = 50;
    this.progress = null;
    this.progressBarWidth = 600;
  }

  create() {
    const title = this.add.text(config.width / 2, 300, "Chargement...");
    title.setOrigin(0.5, 0.5);
    title.setFontSize(50);
    title.setColor("white");
    title.setFontFamily("PressStart2P, Arial");

    const container = this.add.rectangle(config.width / 2, config.height / 2, this.progressBarWidth, this.progressBarHeight, 0x000000, 0);
    container.setOrigin(0.5, 0.5);
    container.setStrokeStyle(4, 0xffffff);

    this.progress = this.add.rectangle(302, (config.height / 2) - (this.progressBarHeight / 2), 0, this.progressBarHeight, 0xffffff);
    this.progress.setOrigin(0, 0);

    this._fecthSequence();
    this._watchAudioTags();
    this._watchFonts();
  }

  _fecthSequence() {
    MODES.forEach(mode => {
      fetch(`/assets/sequence/${mode.key}.json?version=${ Math.round(Math.random() * 1000000000)}`)
        .then(r => r.json())
        .then(seq => {
          SEQUENCES[mode.key] = seq;
          this.loadingPercent += LOADING_VALUES.SEQUENCE;
          console.log("Sequence loaded : " + mode.key, this.loadingPercent);
          this._updateProgress();
        });
    });
  }

  _watchAudioTags() {
    const allAudios = document.getElementsByTagName("audio");
    for (let i = 0; i < allAudios.length; i++) {
      const audio = allAudios[i];
      this._watchAudioTag(audio);
    }
  }
  _watchAudioTag(tag) {
    if (tag.readyState === 4) {
      this.loadingPercent += LOADING_VALUES.AUDIO;
      console.log("Audio loaded : " + tag.id, this.loadingPercent);
      this._updateProgress();
    } else {
      setTimeout(() => this._watchAudioTag(tag), 500);
    }
  }

  _watchFonts() {
    document.fonts.ready.then(() => {
      this.loadingPercent += LOADING_VALUES.FONT;
      console.log("Fonts loaded", this.loadingPercent);
      this._updateProgress();
    });
  }

  _updateProgress() {
    this.progress?.setSize(this.progressBarWidth * (this.loadingPercent / 100), this.progressBarHeight);

    if (this.loadingPercent > 99.9) {
      this._showNextScreen();
    }
  }

  _showNextScreen() {
    this.scene.start("home");
    this.scene.stop("loading");
  }

}