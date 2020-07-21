const MODES = [{
  key: "easy",
  label: "Facile"
}, {
  key: "normal",
  label: "Normal",
}, {
  key: "hard",
  label: "Difficile"
}, {
  key: "tryhard",
  label: "Tryhard"
}];
const damage = {
  easy: {
    daft: 8,
    punk: 8,
    lighting: 10,
    laser: 25,
    eggmanJump: 10,
    eggmanExplode: 15,
    bulle: 10
  },
  normal: {
    daft: 10,
    punk: 10,
    lighting: 15,
    laser: 50,
    eggmanJump: 15,
    eggmanExplode: 25,
    bulle: 15
  },
  hard: {
    daft: 15,
    punk: 15,
    lighting: 20,
    laser: 60,
    eggmanJump: 20,
    eggmanExplode: 30,
    bulle: 20
  },
  tryhard: {
    daft: 100,
    punk: 100,
    lighting: 100,
    laser: 100,
    eggmanJump: 100,
    eggmanExplode: 100,
    bulle: 100
  },
};
