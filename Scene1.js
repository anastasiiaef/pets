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

  
    }
	
	//Switch to Scene2
	create() {
		this.scene.start("playGame");
	}
  
}