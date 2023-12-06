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

      this.eggplant = this.physics.add.sprite(150, 40, 'eggplant');
      this.eggplant.setScale(0.13);
      this.cherry = this.physics.add.sprite(500, 300, 'cherry');
      this.cherry.setScale(0.09);
      this.strawberry = this.physics.add.sprite(800, 0, 'strawberry');
      this.strawberry.setScale(0.02);
      this.icecream = this.physics.add.sprite(1000, 130, 'icecream');
      this.icecream.setScale(0.13);

      this.food = this.physics.add.group();
      this.food.add(this.eggplant);
      this.food.add(this.strawberry);
      this.food.add(this.cherry);
      this.deathCount = 0;

      this.score = 0;
      let style = { font: '30px Arial', fill: '#fff' };
      this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style);

      this.levelText = this.add.text(1150, 20, 'Level: I', style);
      this.arrow = this.input.keyboard.createCursorKeys();

      this.player.setCollideWorldBounds(true);
      // Set initial velocity to simulate upward jump
      this.jumpVelocity = 0;

      // Check if the player is in the air
     this.isJumping = false;

     this.physics.add.overlap(this.player, this.food, this.pickFoodUp, null, this);
     this.physics.add.overlap(this.player, this.icecream, this.hurtPlayer, null, this);

     //adding sound when food ate
     this.backgroundMusic = this.sound.add("audio_background");
     this.pickupSound = this.sound.add("audio_pickup");

     var musicConfig={
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    this.backgroundMusic.play(musicConfig);
   }

    update() {
    //Called every frame and allows for continuous updates
        this.updateMovement(this.arrow);
        this.background.tilePositionX += 0.5;

        this.moveFood(this.eggplant, 2);
        this.moveFood(this.cherry, 2);
        this.moveFood(this.strawberry, 2);
        this.moveFood(this.icecream, 2);

    //Add levels
        if(this.score >= 300)
        {
            this.moveFood(this.eggplant, 3.5);
            this.moveFood(this.cherry, 3.5);
            this.moveFood(this.strawberry, 3.5);
            this.moveFood(this.icecream, 4.5);
            this.levelText.setText( 'Level: II');
        }

        if(this.score >= 600)
        {
            this.moveFood(this.eggplant, 5);
            this.moveFood(this.cherry, 5);
            this.moveFood(this.strawberry, 5);
            this.moveFood(this.icecream, 5);
            this.levelText.setText( 'Level: III');
        }

        if(this.score >= 1000)
        {
            this.gameOver();
        }
        
    }

    deadBody(player) {
        this.player.anims.play("dead", true);
        const x = config.width / 2;
        const y = config.height / 2;
        this.gameText = this.add.text(x, y, 'GAME OVER!', {
         font: '60px Arial',
         fill: 'yellow',
         align: 'center'
     });
     this.gameText.setOrigin(0.5); 
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

    pickFoodUp(player, food) {
        // If the player is disabled (dead), do nothing
        if (this.deathCount > 2) {
            return;
        }
        // Reset the position of the food
        this.resetFoodPos(food);
    
        // Update the score and display
        this.score += 30;
        this.scoreText.setText('Score: ' + this.score);
    
        // Play the pickup sound
        this.pickupSound.play();
    }

    hurtPlayer(player, food){
        if (this.deathCount > 3) {
            return;
        }
            this.resetFoodPos(food);
            if(this.player.alpha < 1){
                return;
            }else{
                this.score -= 50;
                this.deathCount += 1;
                this.scoreText.setText('score: ' + this.score);
                player.disableBody(true, true);
                this.time.addEvent({
                    delay: 1000,
                    callback: this.resetPlayer,
                    callbackScope: this,
                    loop: false
                });
        }
        if(this.deathCount > 2 ) {
            this.deadBody(this.player);
            player.disableBody(true, true);
        }
    }

    resetPlayer() {
        var x = config.width/2-8;
        var y = config.height+64;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.player,
            y: config.height-64,
            ease: 'Power1',
            duration: 1500,
            repeat:0,
            onComplete: function(){
                this.player.alpha=1;
            },
            callbackScope: this
        });
    }

  updateMovement(cursors) {

    if (this.deathCount > 2) {
        return;
    }
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

    //Dying
      this.anims.create({
        key: "dead",
        frames: this.anims.generateFrameNumbers("dead", { start: 0, end: 2 }),
        frameRate: 5,
        repeat: 0,
        onComplete: function (animation, frame) {
            // Code to run after the animation completes
            console.log('Dead animation completed');
        },
        });
    }
     //ending game after score reaches 1000. 
     gameOver()  
     {
         console.log('Game Over');
         this.scene.pause("playGame"); 
         const x = config.width / 2;
         const y = config.height / 2;
     
         this.gameText = this.add.text(x, y, 'Congratulations! You Won!', {
             font: '60px Arial',
             fill: 'yellow',
             align: 'center'
         });
         this.gameText.setOrigin(0.5); 
     }

     playerslife()
     {
        
     }
}