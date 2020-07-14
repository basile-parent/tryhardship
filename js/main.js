const config = {
  type: Phaser.AUTO,
  parent: 'idGameDiv',
  backgroundColor: 'black',
  width: 1200,
  height: 800,
  input: {
    gamepad: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scene: [Scene1, Scene2],
  mode: MODES[1],
  damages: damage.normal
};

function changeMode(mode) {
  config.mode = mode;
  config.damages = damage[mode.key];
}

/*
// TODO :
- Checkpoints
- Timers / score par difficulté
- Séquences différentes pour les difficultés
- Récupération de vie
- Retirer l'aléatoire
*/


let game = new Phaser.Game(config);