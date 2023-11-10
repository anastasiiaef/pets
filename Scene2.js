class Scene2 extends Phaser.Scene {
  constructor() {
      super("playGame");
  }

  create() {
      //Initializes our scene, like the positions of the sprites
      this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background");
      this.background.setOrigin(0, 0);

      this.player = this.physics.add.sprite(500, 450, 'player');
      this.createAnimations();

      this.food = this.physics.add.sprite(300, 300, 'food');
      this.food.setScale(0.01);

      this.arrow = this.input.keyboard.createCursorKeys();
  }

  update() {
  //Called every frame and allows for continuous updates
      this.updateMovement(this.arrow);
  }

  updateMovement(cursors) {

      //Stop animations by default
      this.player.anims.stop();

      //Move left
      if (cursors.left.isDown) {
          this.player.x -= 3;
          this.player.anims.play("left", true);
      }

      //Move right
      else if (cursors.right.isDown) {
          this.player.x += 3;
          this.player.anims.play("right", true);
      } 

}

  createAnimations() {
  
  //Left animation
      this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
          frameRate: 10,
          repeat: -1,
      });
  
  //Right animation
      this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
          frameRate: 10,
          repeat: -1,
      });
  }
}