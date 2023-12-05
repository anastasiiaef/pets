class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  
  preload() {
      // This method is called once at the beginning
      // It will load all the assets, like sprites and sounds 
      this.load.image('background', 'assets/forest.png');
      this.load.image('eggplant', 'assets/eggplant.png');
      this.load.image('cherry', 'assets/cherry.png');
      this.load.image('icecream', 'assets/icecream.png');
      this.load.image('strawberry', 'assets/strawberry.png');
      
      this.load.spritesheet('player', 'assets/dog.png',{
        frameWidth: 160,
        frameHeight: 230
      });
      this.load.spritesheet('dead', 'assets/dead.png',{
        frameWidth: 230,
        frameHeight: 230
      });

      this.load.audio("audio_background", "assets/sounds/background.mp3");
      this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg",  "assets/sounds/pickup.mp3"]);

    }
	
	//Switch to Scene2
	create() {

    //Creating a instruction page then when clicked on Start game,
    // the scene will go to Scene 2

     this.add.text(100, 100, 'Instructions:', { font: '32px Arial', fill: '#fff' });
     this.add.text(100, 150, 'Use arrow keys to move around and collect the food.', { font: '24px Arial', fill: '#fff' });
     this.add.text(100, 200, 'Avoid obstacles and reach a score of 1000 to win.', { font: '24px Arial', fill: '#fff' });


     // finds the center of page 
     const cordCenter = config.width / 2;

     // Add a button to start the game
     const startButton = this.add.text(cordCenter, config.height - 50, 'Start Game', { font: '32px Arial', fill: 'yellow' })
     .setOrigin(0.5, 1); 

     // Make start button interactive
    startButton.setInteractive();

     // Define the behavior when the button is clicked
     startButton.on('pointerdown', () => {
		this.scene.start("playGame");
	});

}
}
  
