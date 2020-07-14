class AudioManager {
  constructor(scene, items) {
    this.scene = scene;
    Object.entries(items).forEach(([key, value]) => {
      this[key] = new HTMLAudio(scene, value);
    });
  }

  get items() {
    return Object.entries(this).filter(([key]) => key !== "scene").map(([key, value]) => value);
  }

}

class HTMLAudio {
  constructor(scene, { id, loop = false, seek = 0, volume = 1, onEnded = () => {}, autoplay = false}) {
    this.scene = scene;
    this.id = id;
    this.initTime = seek / 1000;
    this.audioTag = document.getElementById(id);
    this.audioTag.loop = loop;
    this.audioTag.currentTime = this.initTime;
    this.audioTag.volume = volume;
    this.audioTag.onended = onEnded;
    this.audioTag.autoplay = autoplay;
    if (autoplay) {
      this.play();
    }
  }

  play(currentTime) {
    if (this.isPlaying()) {
      return;
    }
    if (!HAS_USER_INTERACT.value) {
      HAS_USER_INTERACT.registerListener(userInteract => {
        if (!userInteract) {
          return;
        }
        this.audioTag.play();
        this.audioTag.currentTime = currentTime || this.initTime;
      })
    } else {
      this.audioTag.play();
      this.audioTag.currentTime = currentTime || this.initTime;
    }
  }

  isPlaying() {
    return !this.audioTag.paused;
  }

  stop() {
    this.audioTag.pause();
  }

  seek(time) {
    this.audioTag.currentTime = time / 1000;
  }

  get volume() {
    return this.audioTag.volume;
  }

  set volume(volume) {
    this.audioTag.volume = volume;
  }

  get duration() {
    return this.audioTag.duration;
  }

  onEnded(callback) {
    this.audioTag.onended = callback;
  }

  fadeVolume(from, to, duration = 1500) {
    this.volume = from;
    return new Promise(resolve => {
      const timeout = 100;
      const nbStep = duration / timeout;
      const step = (to -  from) / nbStep;
      let newVolume = this.audioTag.volume;
      const interval = setInterval(() => {
        newVolume += step;
        this.audioTag.volume = between(round(newVolume + step), 0, 1);
      }, timeout);

      setTimeout(() => {
        clearInterval(interval);
        this.audioTag.volume = to;
        resolve();
      }, duration);
    });

  }
}

let HAS_USER_INTERACT = {
  valueInternal: false,
  listeners: [],
  set value(val) {
    this.valueInternal = val;
    this.listeners.forEach(listener => listener(val));
  },
  get value() {
    return this.valueInternal;
  },
  registerListener: function(listener) {
    this.listeners.push(listener);
  }
};
document.addEventListener("click", userInteract);
document.addEventListener("keydown", userInteract);
function userInteract() {
  HAS_USER_INTERACT.value = true;
  document.removeEventListener("click", userInteract);
  document.removeEventListener("keydown", userInteract);
}

window.onload = () => {
  document.getElementById("get-lucky").onplay = userInteract;
};
