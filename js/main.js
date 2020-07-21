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
      debug: true
    }
  },
  scene: [Loading, Scene1, Scene2],
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
- Récupération de vie
*/


let game = new Phaser.Game(config);

let SEQUENCES = {};
document.getElementById("version_number").innerHTML = VERSION;
