import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;
    this.CACTI_RESPAWN_INTERVAL = 1200;
    this.timeSinceLastCactus = Infinity;
    this.currentScore = 0;
    this.gameOver = false;
    this.gameSpeed = 10;
    this.ground = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1);

    const h1 = document.createElement("h1");
    document.body.appendChild(h1);
    h1.style.fontFamily = "Consolas";
    h1.innerText = "0";
    this.scoreText = h1;

    // Dino Game Object (Sprite)
    this.dino = this.physics.add.sprite(120, 0, 'dino-idle').setOrigin(0, 1);
    this.cactiGroup = this.physics.add.group();

    this.physics.add.collider(this.dino, this.cactiGroup, () => {
      this.gameOver = true;
    });
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
      if (!this.dino.body.onFloor() || this.gameOver) return;

      // Set to idle image for dino.
      this.dino.setTexture('dino', 0);

      // Jump!
      this.dino.setVelocityY(-1600);
    });

    this.anims.create({
      key: 'dino-run',
      frames: this.anims.generateFrameNumbers(
        'dino',
        { start: 2, end: 3 }
      ),
      frameRate: 10,
      repeat: -1
    });
  }

  putCactusOnLevel() {
    const { width, height } = this.game.config;
    const randomTo6 = Phaser.Math.RND.integerInRange(1, 6);
    this.cactiGroup.add(
      this.physics.add.sprite(
        Phaser.Math.RND.integerInRange(width + 1, width + 500), height, `obsticle-${randomTo6}`)
        .setOrigin(0, 1)
        .setCollideWorldBounds()
    );
  }

  update(time, delta) {

    if (!this.gameOver) {

      this.currentScore = Math.ceil(this.currentScore + (delta / 16));
      this.scoreText.innerText = this.currentScore;

      if (this.currentScore % 100 === 0) {
        this.gameSpeed = this.gameSpeed + 2;
      }

      this.timeSinceLastCactus = this.timeSinceLastCactus + delta;
      if (this.timeSinceLastCactus > this.CACTI_RESPAWN_INTERVAL) {
        this.putCactusOnLevel();
        this.timeSinceLastCactus = 0;
      }

      this.ground.tilePositionX = this.ground.tilePositionX + this.gameSpeed;

      Phaser.Actions.IncX(this.cactiGroup.getChildren(), -this.gameSpeed);

      this.cactiGroup.getChildren().forEach(cacti => {
        if (cacti.x < -50) {
          cacti.destroy();
        }
      });

      if (this.dino.body.deltaAbsY() > 0) { // Is the dino's Y position changing?
        this.dino.anims.stop();
        this.dino.setTexture('dino', 0);
      } else {
        this.dino.play('dino-run', true);
      }
    } else {
      this.dino.setTexture('dino-hurt', 0);
    }


  }
}

export default PlayScene;
