class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  
  preload() {
      // This method is called once at the beginning
      // It will load all the assets, like sprites and sounds 
      this.load.image('background', 'assets/background.png');
      this.load.image('food', 'assets/str.png');
      this.load.spritesheet('player', 'assets/dog.png',{
        frameWidth: 190.5,
        frameHeight: 200
      });
    }
	
	//Switch to Scene2
	create() {
		this.scene.start("playGame");
	}
  
}