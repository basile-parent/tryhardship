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
    daft: 5,
    punk: 5,
    lighting: 7,
    laser: 30,
    eggmanJump: 7,
    eggmanExplode: 15,
    bulle: 7
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
    daft: 20,
    punk: 20,
    lighting: 30,
    laser: 70,
    eggmanJump: 30,
    eggmanExplode: 40,
    bulle: 25
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