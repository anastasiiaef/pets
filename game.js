
//window.onload = function(){
	
	var config = {
		width: 1300, //Width of the game in pixels
		height: 900, //Height of the game in pixels
		backgroundColor: '#3498dc', //The background color (blue)
		scene: [Scene1, Scene2], // Call to the two js scenes
		pixelArt: true,
		physics: {
			default: "arcade",
			arcade:{
				debug: false
			}
		}
	};
	
	var game = new Phaser.Game(config);
	
//};

var gameSettings = {
		playerSpeed: 200,
	}