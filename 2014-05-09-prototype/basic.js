var mapWidth = 7;
var mapHeight = 7;
var tileWidth = 32;
var tileHeight = 32;

var game = new Phaser.Game(
	mapWidth * tileWidth, mapHeight * tileHeight,
	Phaser.CANVAS, 'phaser-canvas',
	{
		preload: preload,
		create: create
	}
);

var map;
var layer;

function preload() {
	game.scale.maxWidth = 960;
	game.scale.maxHeight = 640;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize();

	game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
}

function create() {
	map = game.add.tilemap();
	map.addTilesetImage('ground_1x1');

	layer = map.create('level1', mapWidth, mapHeight, tileWidth, tileHeight);
	layer.resizeWorld();

	game.input.setMoveCallback(mouseMove, this);
}

function mouseMove() {
	var x = layer.getTileX(game.input.activePointer.worldX) * tileWidth;
	var y = layer.getTileY(game.input.activePointer.worldY) * tileHeight;

	if (game.input.mousePointer.isDown) {
		if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
			map.putTile(null, layer.getTileX(x), layer.getTileY(y), layer);
		} else {
			map.putTile(0, layer.getTileX(x), layer.getTileY(y), layer);
		}
	}
}
