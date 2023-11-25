class Scene2 extends Phaser.Scene {
  constructor() {
      super("playGame");
  }

  create() {

      //Initializes our scene, like the positions of the sprites
      this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
      this.background.setOrigin(0, 0);

      this.player = this.physics.add.sprite(500, 750, 'player');
      this.player.setScale(1);
      this.createAnimations();


      this.food = this.physics.add.sprite(300, 300, 'food');
      this.food.setScale(0.25);

      this.arrow = this.input.keyboard.createCursorKeys();
  }

    update() {
    //Called every frame and allows for continuous updates
        this.updateMovement(this.arrow);
        this.moveFood(this.food, 1);egg

        this.background.tilePositionX += 0.3;
    }

    moveFood(food, speed) {
        food.y += speed;
        if(food.y > 600) {
            this.resetFoodPos(food);
        }
    }

    resetFoodPos(food) {
        food.y = 0;
        var randomX = Phaser.Math.Between(0, 1000);
        food.x = randomX;
    }

  updateMovement(cursors) {

      //Stop animations by default
     //this.player.anims.stop();

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

        //Move up
        else if (cursors.up.isDown) {
            this.player.y -= 20;
            this.player.anims.play("jump", true);
        }

        // Neutral (no movement)
        else {
            this.player.anims.stop();
        }
}

  createAnimations() {
  
  //Left animation
      this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("player", { start: 4, end: 5}),
          frameRate: 10,
          repeat: -1
      });
  
  //Right animation
      this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
    }
}