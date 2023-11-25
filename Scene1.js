class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  
  preload() {
      // This method is called once at the beginning
      // It will load all the assets, like sprites and sounds 
      this.load.image('background', 'assets/forest.png');
      this.load.image('food', 'assets/egg.png');
      this.load.spritesheet('player', 'assets/last.png',{
        frameWidth: 160,
        frameHeight: 230
      });

  
    }
	
	//Switch to Scene2
	create() {
		this.scene.start("playGame");
	}
  
}