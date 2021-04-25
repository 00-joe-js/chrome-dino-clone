import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;
    this.gameSpeed = 10;
    this.ground = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1);

    setInterval(() => {
      console.log("update");
      this.gameSpeed = Phaser.Math.RND.integerInRange(10, 1000);
    }, 2000);

    this.dino = 
      this.physics.add.sprite(120, height, 'dino-idle').setOrigin(0, 1);
  }

  update(time, delta) {
    this.ground.tilePositionX = this.ground.tilePositionX + this.gameSpeed;
  }
}

export default PlayScene;
