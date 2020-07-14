class Daft extends DaftPunk {
  constructor(game, config, { x, y }) {
    super(game, config,
      { x, y, sprite: 'daft'},
      { bulletSprite: 'slime', bulletSpeed: -600, damage: config.damages.daft });

  }

  fire = (options = { scale : 1 }) => {
    const bullet = this.weapon.fire();
    bullet?.body.setCircle(25);
    bullet?.setScale(options.scale);
  }

}