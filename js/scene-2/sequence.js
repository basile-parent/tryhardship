class Sequence {
  SECURE_TIME = 1500;

  constructor(scene, config, { onStart, onStop, onWin = () => {} }) {
    this.scene = scene;
    this.config = config;
    this.active = false;
    this.startTimer = 0;
    this.timers = [];

    this.onStart = onStart;
    this.onStop = onStop;
    this.onWin = onWin;
  }

  start() {
    this.active = true;

    this._schedulePattern(SEQUENCES[this.config.mode.key], 0);
    this._playAudio({ timer: this.startTimer});

    if (this.startTimer > 2000) {
      this.scene.enemies.showEnemies([ "daft", "punk", "laser"]);
    }

    this.onStart && this.onStart(this.startTimer);
  }

  stop() {
    this.active = false;
    this.timers.forEach(t => t.remove());

    this.scene.audio.harder.fadeVolume(this.scene.audio.harder.volume, 0, 1000);

    this.scene.audio.explosion.play();
    this.scene.audio.explosion.onEnded(() => {
      this.scene.audio.oneMoreTime.play();
      this.scene.audio.oneMoreTime.fadeVolume(0, 0.3, 4000);
    });

    this.onStop && this.onStop();
  }

  _playAudio({ timer = 0 }) {
    this.scene.audio.harder.play();
    this.scene.audio.harder.seek(timer);
  }

  _scheduleTimers() {
    // To override
  }

  _scheduleEvent(time, callback) {
    if (time > 0 && time < this.startTimer + this.SECURE_TIME) {
      return;
    }
    this.timers.push(
      this.scene.time.addEvent({ delay: time - this.startTimer, callback, callbackScope: this })
    );
  }

  _schedulePattern(pattern, timerStart) {
    let timer = timerStart;
    for (let i = 0; i < pattern.length; i++) {
      const item = pattern[i];
      if (item.timer) {
        timer = item.timer;
      } else {
        timer += item.timerDelta;
      }

      const { type, indexes, options } = item;
      if (type === "daft") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(indexes, options));
      } else if (type === "allDaft") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts(options));
      } else if (type === "punk") {
        this._scheduleEvent(timer, () => this.scene.enemies.firePunk(indexes, options));
      }  else if (type === "allPunk") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireAllPunks(options));
      } else if (type === "lightning") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning(options));
      } else if (type === "bulle") {
        this._scheduleEvent(timer, () => new Bulle(this.scene, this.config, { ...options }).launching());
      }  else if (type === "bulleArriving") {
        this._scheduleEvent(timer, () => this.scene.enemies.initialBulle.arriving());
      } else if (type === "eggmanInterval") {
        this._scheduleEvent(timer, () =>
          this.scene.enemies.create(this.scene.enemies.TYPES.EGGMAN_INTERVAL, {
            x: this.config.width, y: options.y,
            velocity: options.velocity, explodeTimeout: options.explodeTimeout,
            intervalJumpTime: options.intervalJumpTime
          }));
      } else if (type === "eggmanHoming") {

      } else if (type === "showLasers") {
        this._scheduleEvent(timer, () => this.scene.enemies.showLasers());
      } else if (type === "collapseLasers") {
        this._scheduleEvent(timer, () => this.scene.enemies.collapseLasers());
      } else if (type === "expandLasers") {
        this._scheduleEvent(timer, () => this.scene.enemies.expandLasers());
      } else if (type === "stopLasers") {
        this._scheduleEvent(timer, () => this.scene.enemies.stopLasers());
      } else if (type === "fireLasers") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireAllLasers());
      } else if (type === "showDaft") {
        this._scheduleEvent(timer, () => this.scene.enemies.showDaft(indexes[0]));
      } else if (type === "showPunk") {
        this._scheduleEvent(timer, () => this.scene.enemies.showPunk(indexes[0]));
      } else if (type === "showSonicPlateform") {
        this._scheduleEvent(timer, () => this.scene.enemies.showSonicPlateform());
      } else if (type === "hideSonicPlateform") {
        this._scheduleEvent(timer, () => this.scene.enemies.hideSonicPlateform());
      } else if (type === "win") {
        this._scheduleEvent(timer,() => this.scene.enemies.stopLasers());
        this._scheduleEvent(timer,() => this.scene.enemies.fadeOut());
        for (let i = 0; i < 45; i++) {
          this._scheduleEvent(timer + i * 100,
            () => this._createExplosion((Math.random() * 60) + config.width - 60, Math.random() * config.height));
        }
        this._scheduleEvent(timer, () => {
          this.onWin(this.scene.audio.harder.duration);
          this.scene.audio.aroundTheWorld.play();
        });
      }
    }
  }

  _createExplosion(x, y) {
    const explosion = this.scene.add.sprite(x, y, 'explosion').setScale(2);
    explosion.anims.load('kaboom');
    explosion.anims.play('kaboom');
  }
}


// Génération bulles
// let pattern16 = [];
// const yArray = [75, 150, 225, 300, 375, 450, 525, 600, 675, 725];
// let lastIndexes = [];
// let newIndex = -1;
// for (let i = 0; i < 53; i++) {
//   while (lastIndexes.includes(newIndex) || newIndex === -1) {
//     newIndex = Math.round(Math.random() * (yArray.length - 0.5));
//   }
//   pattern16.push({ timerDelta: 100, type: "bulle", options: { y: yArray[newIndex] }});
//   lastIndexes.push(newIndex);
//   if (lastIndexes.length === (yArray.length - 1)) {
//     lastIndexes = [];
//   }
// }

