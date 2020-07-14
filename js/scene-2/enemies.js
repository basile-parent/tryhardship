class EnemiesManager {
  dafts = [];
  punks = [];
  lasers = [];
  lightning = null;
  sonicPlateform = null;
  initialBulle = null;

  TYPES = {
    EGGMAN: 'eggman_interval',
    EGGMAN_INTERVAL: 'eggman_interval',
    EGGMAN_HOMING: 'eggman_HOMING'
  }

  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.sonicPlateform = new SonicPlatform(scene, config);
    this.initialBulle = new Bulle(scene, config, { y: 300 });

    // Create punks
    for (let i = 0; i < 4; i++) {
      this.punks.push(new Punk(scene, config, {x: config.width, y: i * 170 + 180}));
    }

    // Create dafts
    for (let i = 0; i < 4; i++) {
      this.dafts.push(new Daft(scene, config, {x: config.width, y: i * 170 + 110}));
    }

    this.dafts.forEach(d => d.weapon.bullets.children.entries.forEach(b => b.x = -100))
    this.punks.forEach(d => d.weapon.bullets.children.entries.forEach(b => b.x = -100))

    this.lasers.push(new Laser(this.scene, config, {x: config.width - 40, y: 28}));
    this.lasers.push(new Laser(this.scene, config, {x: config.width - 40, y: config.height - 35}));

    this.lightning = new LightningManager(this.scene, config);
  }

  create(type, ...parameters) {
    switch (type) {
      case this.TYPES.EGGMAN_INTERVAL:
        const interval = new EggmanInterval(this.scene, this.config, ...parameters);
        this.sonicPlateform.handleEggmanCollide(interval);
        return interval;
      case this.TYPES.EGGMAN_HOMING:
        const homing = new EggmanHoming(this.scene, this.config, ...parameters);
        this.sonicPlateform.handleEggmanCollide(homing);
        return homing;
    }
  }

  showEnemies = (enemies) => {
    if (enemies.includes("daft")) {
      this.dafts.forEach(daft => daft.sprite.x = this.config.width);
    }
    if (enemies.includes("punk")) {
      this.punks.forEach(punk => punk.sprite.x = this.config.width);
    }
    if (enemies.includes("laser")) {
      this.lasers.forEach(laser => laser.sprite.x = this.config.width);
    }
    if (enemies.includes("fireLaser")) {
      this.fireAllLasers();
    }
    if (enemies.includes("collapseLaser")) {
      this.scene.enemies.collapseLasers();
    }
    if (enemies.includes("sonicPlateform")) {
      this.scene.enemies.showSonicPlateform();
    }
  }

  showDaft(index) {
    this.dafts[index].show();
  }
  showPunk(index) {
    this.punks[index].show();
  }
  fireDaft = (indexes, options) => {
    indexes.forEach(index => this.dafts[index].fireMultiple(options));
  }
  fireAllDafts = (options) => {
    this.dafts.forEach(daft => daft.fireMultiple(options));
  }
  firePunk = (indexes, options) => {
    indexes.forEach(index => this.punks[index % this.punks.length].fireMultiple(options));
  }
  fireAllPunks = (options) => {
    this.punks.forEach(punk => punk.fireMultiple(options));
  }

  fireLigthning = ({ y, configName, speed, lifespan }) => {
    this.lightning.fire({ y, speed, lifespan }, configName);
  }

  fireAllLasers = () => {
    this.lasers.forEach(l => l.fire());
  }

  showLasers = () => {
    this.lasers.forEach(l => l.show());
  }

  showSonicPlateform() {
    this.sonicPlateform.show();
  }

  hideSonicPlateform() {
    this.sonicPlateform.hide();
  }

  collapseLasers(duration) {
    this.lasers[0].moveTo(175, duration);
    this.lasers[1].moveTo(625, duration);
  }

  expandLasers(duration) {
    this.lasers[0].moveTo(28, duration);
    this.lasers[1].moveTo(this.config.height - 35, duration);
  }

  stopLasers() {
    this.lasers[0].stop();
    this.lasers[1].stop();
  }

  fadeOut() {
    this.dafts.forEach(d => d.fadeOut());
    this.punks.forEach(p => p.fadeOut());
    this.lasers.forEach(l => l.fadeOut());
  }

}
