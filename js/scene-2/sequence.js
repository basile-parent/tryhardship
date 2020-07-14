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
    this._scheduleTimers();
    this._playAudio({ timer: this.startTimer});
    this.active = true;
    this.onStart && this.onStart(this.startTimer);

    if (this.startTimer > 2000) {
      this.scene.enemies.showEnemies([ "daft", "punk", "laser"]);
    }
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
    let timer;

    this._scheduleEvent(3800, () => this.scene.enemies.showDaft(0));
    this._scheduleEvent(4800, () => this.scene.enemies.showDaft(1));
    this._scheduleEvent(5800, () => this.scene.enemies.showDaft(2));
    this._scheduleEvent(6800, () => this.scene.enemies.showDaft(3));

    timer = 8200;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts());
      timer += 500;
    }

    this._scheduleEvent(11800, () => this.scene.enemies.showPunk(0));
    this._scheduleEvent(12800, () => this.scene.enemies.showPunk(1));
    this._scheduleEvent(13800, () => this.scene.enemies.showPunk(2));
    this._scheduleEvent(14800, () => this.scene.enemies.showPunk(3));

    timer = 16000;
    for(let i = 0; i < 6; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([ i ]));
      timer += 500;
    }

    timer = 19900;
    this._scheduleEvent(timer, () => this.scene.enemies.fireDaft([0, 1], { times: 2, timeout: 300 }));
    timer += 1000;
    this._scheduleEvent(timer, () => this.scene.enemies.fireDaft([1, 2], { times: 2, timeout: 300 }));
    timer += 1000;
    this._scheduleEvent(timer, () => this.scene.enemies.fireDaft([2, 3], { times: 2, timeout: 300 }));
    timer += 1000;
    this._scheduleEvent(timer, () => this.scene.enemies.fireDaft([1, 3], { times: 2, timeout: 300 }));

    timer = 23800;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([ Math.round(Math.random() * 4) ]));
      timer += 500;
    }

    const pattern = {
      daft: [[0, 1], [1, 2], [2, 3], [0, 1, 2, 3]],
      punk: [[2, 3], [0, 3], [1, 2], [0, 3]]
    };
    timer = 27675;
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern.daft[i], { times: 2, timeout: 300 }));
      timer += 1000;
    }

    timer = 31680;
    for (let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk(pattern.punk[i % 4]));
      timer += 500;
    }

    timer = 35400;
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern.daft[i], { times: 2, timeout: 300, scale: 2 }));
      timer += 1000;
    }

    timer = 39300;
    for (let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk(pattern.punk[i % 4], { times: 2, scale: 2, timeout: 400 }));
      timer += 500;
    }

    timer = 43300;
    const pattern2 = {
      daft: [[0], [1], [2], [3]],
      punk: [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2], [1, 3], [0, 2]]
    };
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern2.daft[i], { times: 2, timeout: 300, scale: 1.5 }));
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk(pattern2.punk[i % 4], { times: 2, scale: 1.5 }));
      timer += 1000;
    }

    timer = 47100;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1.5 }));
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([0, 3], { scale: 1.5 }));
      timer += 500;
    }

    // Début des paroles (Work it, make it...)
    timer = 51100;
    const pattern3 = [640, 280, 450, 60];
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern3[i], configName: "small" }));
      timer += 950;
    }

    timer = 54905;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 2 }));
      timer += 500;
    }

    timer = 59405;
    const pattern4 = [90, 220, 450, 630];
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern4[i], configName: "small" }));
      timer += 950;
    }

    timer = 62600;
    for(let i = 0; i < 8; i++) {
      // this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 2}));
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft([0, 1], { scale: 2 }));
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([2, 3], { scale: 1.5 }));
      timer += 500;
    }

    timer = 66610;
    const pattern5 = {
      lightning: [640, 280, 450, 90],
      daft: [[0, 1], [2, 3], [0, 3], [2, 3]]
    };
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern5.lightning[i], configName: "medium" }));
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern5.daft[i], { times: 2, timeout: 300, scale: 2 }));
      timer += 950;
    }

    timer = 70600;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1.2}));
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([0, 3], { scale: 1.5 }));
      timer += 500;
    }

    timer = 74800;
    const pattern6 = {
      lightning: [480, 320, 150, 630],
      daft: [[0, 1], [0, 3], [2, 3], [0, 1]]
    };
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern6.lightning[i], configName: "medium" }));
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern6.daft[i], { times: 2, timeout: 300, scale: 2 }));
      timer += 950;
    }

    timer = 78300;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1.5}));
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([0, 3], { scale: 1.5 }));
      timer += 500;
    }

    timer = 82200;
    const pattern7 = {
      lightning: [640, 280, 450, 60],
      daft: [[0, 1], [2, 3], [0, 1], [2, 3]]
    };
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern7.lightning[i], configName: "medium" }));
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern7.daft[i], { times: 2, timeout: 300, scale: 2 }));
      timer += 950;
    }

    timer = 86050;
    for(let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1.8}));
      this._scheduleEvent(timer, () => this.scene.enemies.firePunk([0, 3], { scale: 1.5 }));
      timer += 500;
    }

    timer = 90200;
    const pattern8 = {
      daft: [[2, 3], [0, 3], [0, 1], [0, 3]],
      lightning: [
        { y: 90, configName: "medium" },
        { y: 420, configName: "medium" },
        { y: 650, configName: "medium" },
        { y: 400, configName: "big", speed: 300, lifespan: 4500 }
      ]};
    this._scheduleLightning(pattern8.lightning, timer, 950);
    for (let i = 0; i < 4; i++) {
      // this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ ...pattern8.lightning[i] }));
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ times: 2, timeout: 300, scale: 1.5 }));
      timer += 950;
    }

    timer = 93800;
    this._scheduleEvent(timer, () => this.scene.enemies.showLasers());

    timer = 96200;
    this._scheduleEvent(timer, () => this.scene.enemies.fireAllLasers());

    timer = 97100;
    const pattern9 = {
      lightning: [580, 280, 450, 60, 650, 380, 140, 550]
    };
    this._scheduleLightning(pattern9.lightning, timer, 500, "small");

    timer = 101500;
    for (let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1 }));
      timer += 500;
    }

    timer = 104800;
    const pattern10 = {
      lightning: [620, 380, 250, 60, 450, 120, 350, 650]
    };
    this._scheduleLightning(pattern10.lightning, timer, 480, "small");

    timer = 109200;
    for (let i = 0; i < 8; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1 }));
      timer += 500;
    }

    timer = 112900;
    const pattern11 = {
      lightning: [580, 280, 450, 60, 650, 280, 140, 550,
        650, 550, 500, 100, 220, 600, 500, 600]
    };
    this._scheduleLightning(pattern11.lightning, timer, 480, "medium");

    timer = 116000;
    this._scheduleEvent(timer, () => this.scene.enemies.collapseLasers());

    timer = 121000;
    const pattern12 = {
      lightning: [600, 550, 250, 550, 600, 550, 200, 550,
        500, 450, 250, 450, 600, 450, 500, 550]
    };
    this._scheduleLightning(pattern12.lightning, timer, 480, "small");

    timer = 128000;
    this._scheduleEvent(timer, () => this.scene.enemies.expandLasers());

    timer = 128800;
    const pattern13 = {
      lightning: [650, 550, 250, 550, 650, 550, 250, 550,
        [100, 500], [200, 600], [300, 700], [250, 650], [0, 400, 700], [100, 500, 800], [0, 400, 700], [100, 500, 800]
        ]
    };
    this._scheduleLightning(pattern13.lightning, timer, 480, "small");

    const pattern14 = {
      daft: [[0, 1], [0, 1], [2, 3], [2, 3]]
    };
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern14.daft[i], { scale: 1.5 }));
      timer += 480;
    }

    timer = 136500;
    const pattern15 = {
      lightning: [
        [100, 650], [-100, 450], [100, 650], [0, 550], [100, 650], [0, 550], [100, 650], [0, 550],
        [0, 550], [50, 600], [100, 700], [50, 650], [-50, 500, 900], [50, 600]
      ]
    };
    this._scheduleLightning(pattern15.lightning, timer, 480, "medium");
    for (let i = 0; i < 4; i++) {
      this._scheduleEvent(timer, () => this.scene.enemies.fireAllDafts({ scale: 1.3 }));
      timer += 480;
    }

    // Jam session
    timer = 144300;
    this._scheduleEvent(timer, () => this.scene.enemies.stopLasers());
    const patternJam = [
      { timerDelta: 0, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 280, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 280, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},

      { timerDelta: 280, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},

      { timerDelta: 700, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}}, // 360
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 600
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}}, // 720
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}}, // 960
      { timerDelta: 250, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 1210
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}}, // 1450
      { timerDelta: 250, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 1700
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 1820
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}}, // 2060
      { timerDelta: 250, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 2310
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}}, // 2550
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 2790
      { timerDelta: 220, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}}, // 2910
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}}, // 3150
      { timerDelta: 250, type: "punk", parameters: { indexes : [ 0,3 ], options: { scale: 1.5 }}}, // 3400
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 0,3 ], options: { scale: 1.5 }}}, // 3640
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2,3 ], options: { scale: 1.5 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2,3 ], options: { scale: 1.5 }}},
    ];
    this._scheduleSoloJam(patternJam, timer);

    timer = 152000;
    this._scheduleEvent(timer, () => this.scene.enemies.fireDaft([0, 2], { scale: 2 }));
    this._scheduleEvent(timer + 500, () => this.scene.enemies.fireDaft([1, 3], { scale: 2 }));
    this._scheduleEvent(timer + 1000, () => this.scene.enemies.fireDaft([0, 2], { scale: 2 }));
    this._scheduleEvent(timer + 1500, () => this.scene.enemies.fireDaft([1, 3], { scale: 2 }));

    const patternJam2 = [
      { timerDelta: 0, type: "punk", parameters: { indexes : [ 0, 2 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 2, 3 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.5 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 0, 1 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 2, 3 ], options: { scale: 1.5 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.5 }}},
    ];
    this._scheduleSoloJam(patternJam2, timer);

    timer = 159000;
    this._scheduleEvent(timer, () => this.scene.enemies.showSonicPlateform());
    timer = 159700;
    for (let i = 0; i < 9; i++) {
      this._scheduleEvent(timer, () =>
        this.scene.enemies.create(this.scene.enemies.TYPES.EGGMAN_INTERVAL,
          { x: this.config.width, y: Math.round(Math.random() * 100 + 400), velocity: Math.round(Math.random() * 100 + 400), explodeTimeout: 4000, intervalJumpTime: 1200 }));
      timer += 1900;
    }
    this._scheduleEvent(timer, () =>
      this.scene.enemies.create(this.scene.enemies.TYPES.EGGMAN_INTERVAL,
        { x: this.config.width, y: Math.round(Math.random() * 100 + 400), velocity: Math.round(Math.random() * 100 + 400), explodeTimeout: 4000, intervalJumpTime: 1200 }));
    timer += 1900;
    this._scheduleEvent(timer, () =>
      this.scene.enemies.create(this.scene.enemies.TYPES.EGGMAN_INTERVAL,
        { x: this.config.width, y: Math.round(Math.random() * 100 + 400), velocity: Math.round(Math.random() * 100 + 400), explodeTimeout: 2000, intervalJumpTime: 1200 }));

    timer = 167300;
    const patternJam3 = [
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 140, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1 }}},
      { timerDelta: 140, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},

      { timerDelta: 360, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},

      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.3 }}},
      { timerDelta: 140, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.3 }}},
      { timerDelta: 140, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.3 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.3 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.3 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 1.3 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1.3 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1.3 }}},

      { timerDelta: 240, type: "punk", parameters: { indexes : [ 0, 1 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1, 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2, 3 ], options: { scale: 1 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 80, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 0, 1 ], options: { scale: 1 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 1, 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1, 2 ], options: { scale: 1 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 2, 3 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 500, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 1 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 1 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},
      { timerDelta: 450, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 1 }}},

      { timerDelta: 240, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 2 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 0 ], options: { scale: 2 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 2 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 1 ], options: { scale: 2 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 2 }}},
      { timerDelta: 120, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 2 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 2 ], options: { scale: 2 }}},
      { timerDelta: 240, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 2 }}},
      { timerDelta: 360, type: "punk", parameters: { indexes : [ 3 ], options: { scale: 2 }}},
    ];
    this._scheduleSoloJam(patternJam3, timer);

    timer = 182000;
    this._scheduleEvent(timer, () => this.scene.enemies.hideSonicPlateform());
    this._scheduleEvent(timer, () => this.scene.enemies.fireAllLasers());
    // this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern6.daft[i], { times: 2, timeout: 300, scale: 2 }));

    // const pattern16 = {
    //   daft: [[0, 2], [1, 3], [2, 3], [0, 1]]
    // };
    // for (let i = 0; i < 4; i++) {
    //   this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern6.lightning[i], configName: "medium" }));
    //   this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(pattern6.daft[i], { times: 2, timeout: 300, scale: 2 }));
    //   timer += 950;
    // }

    timer = 179500;
    this._scheduleEvent(timer, () => this.scene.enemies.initialBulle.arriving());

    const pattern16 = [
      { timer: 183200, type: "daft", indexes: [0, 2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [1, 3], options: { scale: 2 }},
      { timer: 184200, type: "daft", indexes: [3], options: { times: 2, timeout: 480, scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { times: 2, timeout: 480, scale: 2 }},
      { timerDelta: 720, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 200 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { times: 4, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 350 }},
      { timerDelta: 0, type: "punk", indexes: [1], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 780, type: "daft", indexes: [3], options: { times: 2, timeout: 120, scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 500 }},
      { timerDelta: 0, type: "punk", indexes: [0], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 120, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 200 }},
      { timerDelta: 0, type: "punk", indexes: [1], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { times: 3, timeout: 240, scale: 2 }},
      { timerDelta: 480, type: "punk", indexes: [1], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 240 + 120, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [0], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 350 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 120, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 600, configName: "medium" }},
      { timerDelta: 120, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [2, 3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 360, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 200 }},
      { timerDelta: 360, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [0, 3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 600, configName: "medium" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 350 }},
      { timerDelta: 120, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [2, 3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 200 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 600, configName: "medium" }},
      { timerDelta: 480, type: "daft", indexes: [2], options: { scale: 2 }},

      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "medium" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 550 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "medium" }},
      { timerDelta: 120, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 750 }},
      { timerDelta: 120, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 750 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 580 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 675 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 750 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "medium" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},

      { timerDelta: 480, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 600, configName: "medium" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 550 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 750 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "medium" }},
      { timerDelta: 120, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 120, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 550 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 750 }},
      { timerDelta: 240, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 750 }},
      { timerDelta: 240, type: "lightning", indexes: [], options: { y: 200, configName: "medium" }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 550 }},

      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "medium" }},
      { timerDelta: 480, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 120, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 120, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},

      { timerDelta: 480, type: "daft", indexes: [0], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [2, 3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [1], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [0, 3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [2], options: { times: 3, timeout: 160, scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [1, 3], options: { times: 3, timeout: 120, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 0, type: "punk", indexes: [0, 1], options: { times: 2, timeout: 240, scale: 2 }},

      { timerDelta: 480, type: "bulle", indexes: [], options: { y: 75 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 150 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 225 }},
      { timerDelta: 0, type: "bulle", indexes: [], options: { y: 300 }},
      // { timerDelta: 120, type: "bulle", indexes: [], options: { y: 375 }},
      // { timerDelta: 240, type: "bulle", indexes: [], options: { y: 450 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 525 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 600 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 675 }},
      // { timerDelta: 240, type: "bulle", indexes: [], options: { y: 450 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 150 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 600 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 300 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 375 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 225 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 525 }},
      // { timerDelta: 60, type: "bulle", indexes: [], options: { y: 675 }},
    ];
    // Electro solo
    // TODO Adapt number of bulles in difficulty modes
    const yArray = [75, 150, 225, 300, 375, 450, 525, 600, 675, 725];
    let lastIndexes = [];
    let newIndex = -1;
    for (let i = 0; i < 53; i++) {
      while (lastIndexes.includes(newIndex) || newIndex === -1) {
        newIndex = Math.round(Math.random() * (yArray.length - 0.5));
      }
      pattern16.push({ timerDelta: 100, type: "bulle", options: { y: yArray[newIndex] }});
      lastIndexes.push(newIndex);
      if (lastIndexes.length === (yArray.length - 1)) {
        lastIndexes = [];
      }
    }
    timer = 183200;
    this._scheduleEnd(pattern16, timer);

    // Final
    timer = 204400;
    const pattern17 = [
      { timerDelta: 0, type: "daft", indexes: [0, 1, 2, 3], options: { scale: 2 }},
      { timerDelta: 360, type: "daft", indexes: [0, 1, 2, 3], options: { scale: 2 }},
      { timerDelta: 600, type: "punk", indexes: [0], options: { times: 2, timeout: 300, scale: 2 }},
      { timerDelta: 120, type: "punk", indexes: [1], options: { times: 2, timeout: 300, scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [2], options: { times: 2, timeout: 300, scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [3], options: { times: 2, timeout: 300, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "big" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 1160, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 500, configName: "big" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 1160, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 300, configName: "big" }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 1240, type: "daft", indexes: [2, 3], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [1, 2], options: { times: 2, timeout: 240, scale: 2 }},
      { timerDelta: 480, type: "daft", indexes: [0, 1, 2, 3], options: { times: 4, timeout: 240, scale: 2 }},

      { timerDelta: 1160, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "big" }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 600, configName: "big" }},
      { timerDelta: 240, type: "punk", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [3], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 500, configName: "big" }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [3], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "big" }},
      { timerDelta: 240, type: "punk", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [0], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 600, configName: "big" }},
      { timerDelta: 240, type: "punk", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "punk", indexes: [3], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [0], options: { scale: 2 }},
      { timerDelta: 0, type: "lightning", indexes: [], options: { y: 200, configName: "big" }},
      { timerDelta: 240, type: "daft", indexes: [1], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [2], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [3], options: { scale: 2 }},
      { timerDelta: 240, type: "daft", indexes: [0, 3], options: { times: 4, timeout: 240, scale: 2 }},
      { timerDelta: 240 * 4, type: "daft", indexes: [0, 1, 2, 3], options: { times: 4, timeout: 240, scale: 2.6 }},
    ];
    this._scheduleEnd(pattern17, timer);


    timer = 225000;
    this._scheduleWin(timer);
    this._scheduleEvent(timer, () => {
      this.onWin(this.scene.audio.harder.duration);
      this.scene.audio.aroundTheWorld.play();
    });

  }

  _scheduleLightning(pattern, timerStart, timerDelta, size = "small") {
    let timer = timerStart;
    for (let i = 0; i < pattern.length; i++) {
      timer += timerDelta;
      if (pattern[i] instanceof Array) {
        this._scheduleLightning(pattern[i], timer, 0, size);
      } else if (!isNaN(pattern[i])) {
        this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ y: pattern[i], configName: size }));
      } else {
        this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning({ ...pattern[i] }));
      }
    }
  }

  _scheduleSoloJam(pattern, timerStart) {
    let timer = timerStart;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i].type === "punk") {
        const { parameters : { indexes, options }} = pattern[i];
        this._scheduleEvent(timer, () => this.scene.enemies.firePunk(indexes, options));
      }

      timer += pattern[i].timerDelta;
    }
  }

  _scheduleEnd(pattern, timerStart) {
    let timer = timerStart;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i].timer) {
        timer = pattern[i].timer;
      } else {
        timer += pattern[i].timerDelta;
      }

      const { type, indexes, options } = pattern[i];
      if (type === "daft") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireDaft(indexes, options));
      } else if (type === "punk") {
        this._scheduleEvent(timer, () => this.scene.enemies.firePunk(indexes, options));
      } else if (type === "lightning") {
        this._scheduleEvent(timer, () => this.scene.enemies.fireLigthning(options));
      } else if (type === "bulle") {
        this._scheduleEvent(timer, () => new Bulle(this.scene, this.config, { ...options }).launching());
      }
    }
  }

  _scheduleEvent(time, callback) {
    if (time > 0 && time < this.startTimer + this.SECURE_TIME) {
      return;
    }
    this.timers.push(
      this.scene.time.addEvent({ delay: time - this.startTimer, callback, callbackScope: this })
    );
  }

  _scheduleWin(time) {
    this._scheduleEvent(time,() => this.scene.enemies.fadeOut());
    for (let i = 0; i < 45; i++) {
      this._scheduleEvent(time + i * 100,
        () => this._createExplosion((Math.random() * 60) + config.width - 60, Math.random() * config.height));
    }
  }
  _createExplosion(x, y) {
    const explosion = this.scene.add.sprite(x, y, 'explosion').setScale(2);
    explosion.anims.load('kaboom');
    explosion.anims.play('kaboom');
  }
}
