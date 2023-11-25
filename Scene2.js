class Scene2 extends Phaser.Scene {
  constructor() {
      super("playGame");

      this.currentLevel = 1;
      this.maxFoodPerLevel = 2;
      this.remainingFoodForLevel = this.maxFoodPerLevel;
      this.maxFood = 5;
  }

  create() {

      //Initializes our scene, like the positions of the sprites
      this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
      this.background.setOrigin(0, 0);

      this.player = this.physics.add.sprite(500, 750, 'player');
      this.player.setScale(1);
      this.createAnimations();

      this.eggplant = this.physics.add.sprite(150, 0, 'eggplant');
      this.eggplant.setScale(0.13);
      this.cherry = this.physics.add.sprite(500, 0, 'cherry');
      this.cherry.setScale(0.09);
      this.strawberry = this.physics.add.sprite(800, 0, 'strawberry');
      this.strawberry.setScale(0.02);
      this.icecream = this.physics.add.sprite(1000, 0, 'icecream');
      this.icecream.setScale(0.13);

      this.arrow = this.input.keyboard.createCursorKeys();

      this.player.setCollideWorldBounds(true);
        // Set initial velocity to simulate upward jump
        this.jumpVelocity = 0;

        // Check if the player is in the air
        this.isJumping = false;

  }

    update() {
    //Called every frame and allows for continuous updates
        this.updateMovement(this.arrow);
        this.background.tilePositionX += 0.5;

        this.moveFood(this.eggplant, 1);
        this.moveFood(this.cherry, 2);
        this.moveFood(this.strawberry, 1);
        this.moveFood(this.icecream, 3);
    }

    moveFood(food, speed) {
        food.y += speed;
        if (food.y > config.height) {
            this.resetFoodPos(food);
        }
    }

    resetFoodPos(food){
        food.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        food.x = randomX;
    }

  updateMovement(cursors) {
      //Move left
      if (cursors.left.isDown) {
          this.player.x -= 3;
          this.player.anims.play("left", true);
      }
      //Move right
      else if (cursors.right.isDown) {
          this.player.x += 3;
          this.player.anims.play("right", true);
      } else if (cursors.up.isDown && !this.isJumping) {
        this.jumpVelocity = -25;
        this.isJumping = true;
        this.player.anims.play("jump", true);
        }
        // Update player position based on jump velocity
        this.player.y += this.jumpVelocity;
        // Simulate gravity
        this.jumpVelocity += 1; // Adjust the gravity value as needed
        // Check if the player has landed
        if (this.player.y >= 750) { // Adjust the landing height as needed
            this.player.y = 750; // Set the player to the ground level
            this.jumpVelocity = 0; // Reset jump velocity
            this.isJumping = false; // Player is no longer jumping
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
      //Up animation
      this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
    }
}