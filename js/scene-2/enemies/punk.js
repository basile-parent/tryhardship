class Punk extends DaftPunk {
  constructor(game, config, { x, y }) {
    super(game, config,
      { x, y, sprite: 'punk' },
      { bulletSprite: 'yellow_ball', bulletSpeed: 800, damage: config.damages.punk });
  }

  fire = (options = { scale : 1 }) => {
    const bullet = this.weapon.fireAtSprite(this.game.player.sprite);
    bullet?.body.setCircle(18);
    bullet?.setScale(options.scale);
  }

}