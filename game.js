// Create our only scene called mainScene, in the game.js file
class mainScene {
    // The three methods currently empty
  
    preload() {
      // This method is called once at the beginning
      // It will load all the assets, like sprites and sounds 
      this.load.image('player', 'assets/dog1.png');
      this.load.image('food', 'assets/str.png');;
    }
    create() {
      // This method is called once, just after preload()
      // It will initialize our scene, like the positions of the sprites
      this.player = this.physics.add.sprite(500, 450, 'player');
      this.food = this.physics.add.sprite(300, 300, 'food');
      this.food.setScale(0.01); 

      this.arrow = this.input.keyboard.createCursorKeys();

    }
    update() {

            // Handle horizontal movements
            if (this.arrow.right.isDown) {
                // If the right arrow is pressed, move to the right
                this.player.x += 3;
            } else if (this.arrow.left.isDown) {
                // If the left arrow is pressed, move to the left
                this.player.x -= 3;
            } 
     }
  }

  new Phaser.Game({
    width: 1000, // Width of the game in pixels
    height: 600, // Height of the game in pixels
    backgroundColor: '#3498dc', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
  });