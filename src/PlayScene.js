import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;
    this.gameSpeed = 10;
    this.ground = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1);

    // Dino Game Object (Sprite)
    this.dino = this.physics.add.sprite(120, 0, 'dino-idle').setOrigin(0, 1);
    /*
     .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setOrigin(0, 1);
    */
    this.dino.setCollideWorldBounds(true);
    this.dino.setGravityY(5000);
    // this.dino.body.bounce.y = 0.7;


    this.input.keyboard.on("keydown_SPACE", () => {

      // If our dino is NOT touching the ground, don't jump.
      if (!this.dino.body.onFloor()) return;

      // Set to idle image for dino.
      this.dino.setTexture('dino', 0);

      // Jump!
      this.dino.setVelocityY(-1600);
    });
  }

  update(time, delta) {
    this.ground.tilePositionX = this.ground.tilePositionX + this.gameSpeed;
  }
}

export default PlayScene;
